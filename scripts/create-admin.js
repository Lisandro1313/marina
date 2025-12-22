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

        // Generar credenciales seguras
        const adminEmail = 'admin@bikimar.com';
        const adminPassword = 'Bikimar2025!Admin';

        // Verificar si ya existe un admin
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('⚠ Actualizando credenciales del usuario admin...');
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            existingAdmin.password = hashedPassword;
            existingAdmin.email = adminEmail;
            await existingAdmin.save();
            console.log('✓ Usuario admin actualizado exitosamente:');
            console.log(`  Email: ${adminEmail}`);
            console.log(`  Password: ${adminPassword}`);
            console.log('\n⚠ GUARDA ESTAS CREDENCIALES EN UN LUGAR SEGURO\n');
            process.exit(0);
        }

        // Crear nuevo usuario admin
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const admin = await User.create({
            email: adminEmail,
            password: hashedPassword,
            name: 'Administrador Bikimar',
            role: 'admin',
        });

        console.log('✓ Usuario admin creado exitosamente:');
        console.log(`  Email: ${adminEmail}`);
        console.log(`  Password: ${adminPassword}`);
        console.log('\n⚠ GUARDA ESTAS CREDENCIALES EN UN LUGAR SEGURO\n');

        process.exit(0);
    } catch (error) {
        console.error('Error al crear admin:', error);
        process.exit(1);
    }
}

createAdmin();
