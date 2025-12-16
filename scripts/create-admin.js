const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String,
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bikimar';

        await mongoose.connect(MONGODB_URI);
        console.log('✓ Conectado a MongoDB');

        // Verificar si ya existe un admin
        const existingAdmin = await User.findOne({ email: 'admin@marinabikinis.com' });

        if (existingAdmin) {
            console.log('⚠ Ya existe un usuario admin con ese email');
            process.exit(0);
        }

        // Crear nuevo usuario admin
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = await User.create({
            email: 'admin@marinabikinis.com',
            password: hashedPassword,
            name: 'Administrador',
            role: 'admin',
        });

        console.log('✓ Usuario admin creado exitosamente:');
        console.log('  Email: admin@marinabikinis.com');
        console.log('  Password: admin123');
        console.log('\n⚠ IMPORTANTE: Cambia la contraseña después del primer login\n');

        process.exit(0);
    } catch (error) {
        console.error('Error al crear admin:', error);
        process.exit(1);
    }
}

createAdmin();
