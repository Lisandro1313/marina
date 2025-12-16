const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: String, required: true },
    images: [String],
    category: String,
    style: String,
    pattern: String,
    stitching: String,
    sizes: [String],
    colors: [String],
    stock: { type: Number, default: 1 },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const sampleProducts = [
    {
        name: "Bikini Bordado Negro Flores",
        description: "Bikini negro con bordados artesanales de flores doradas. Diseño exclusivo hecho a mano.",
        price: "Consultar",
        images: ["https://res.cloudinary.com/demo/image/upload/sample.jpg"],
        category: "triangulo",
        style: "Artesanal",
        pattern: "Bordado",
        stitching: "A mano",
        sizes: ["S", "M", "L"],
        colors: ["Negro", "Dorado"],
        stock: 1,
        active: true
    },
    {
        name: "Bikini Turquesa Mar",
        description: "Bikini en tonos turquesa vibrante, inspirado en los colores del mar. Pieza única.",
        price: "Consultar",
        images: ["https://res.cloudinary.com/demo/image/upload/sample.jpg"],
        category: "deportivo",
        style: "Tropical",
        pattern: "Liso",
        stitching: "Reforzado",
        sizes: ["S", "M", "L"],
        colors: ["Turquesa", "Aguamarina"],
        stock: 1,
        active: true
    },
    {
        name: "Bikini Atardecer Coral",
        description: "Diseño exclusivo en tonos coral y naranja, como un atardecer playero. Bordados únicos.",
        price: "Consultar",
        images: ["https://res.cloudinary.com/demo/image/upload/sample.jpg"],
        category: "triangulo",
        style: "Romántico",
        pattern: "Degradado",
        stitching: "A mano",
        sizes: ["S", "M"],
        colors: ["Coral", "Naranja", "Dorado"],
        stock: 1,
        active: true
    },
    {
        name: "Bikini Verde Esmeralda",
        description: "Bikini en verde esmeralda con lentejuelas y detalles artesanales. Diseño único e irrepetible.",
        price: "Consultar",
        images: ["https://res.cloudinary.com/demo/image/upload/sample.jpg"],
        category: "bikini",
        style: "Elegante",
        pattern: "Lentejuelas",
        stitching: "Reforzado",
        sizes: ["M", "L"],
        colors: ["Verde", "Esmeralda"],
        stock: 1,
        active: true
    }
];

async function createSampleProducts() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bikimar';

        await mongoose.connect(MONGODB_URI);
        console.log('✓ Conectado a MongoDB');

        // Eliminar productos existentes (opcional)
        await Product.deleteMany({});
        console.log('✓ Productos anteriores eliminados');

        // Crear productos con orden
        for (let i = 0; i < sampleProducts.length; i++) {
            await Product.create({
                ...sampleProducts[i],
                order: i
            });
        }

        console.log(`✓ ${sampleProducts.length} productos de ejemplo creados`);
        console.log('\nProductos creados:');
        sampleProducts.forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.name} - ${p.price}`);
        });

        console.log('\n⚠ IMPORTANTE: Reemplaza las URLs de imágenes con las fotos reales desde Cloudinary\n');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

createSampleProducts();
