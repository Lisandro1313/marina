# Bikimar E-Commerce

E-commerce para tienda de bikinis y trajes de baño con panel de administrador y integración de WhatsApp.

## 🚀 Características

- ✅ Panel de administración completo
- ✅ Gestión de productos (CRUD)
- ✅ Subida de imágenes con Cloudinary
- ✅ Reordenamiento de productos (drag & drop)
- ✅ Filtros por categoría
- ✅ Integración directa con WhatsApp (sin carrito)
- ✅ Responsive design
- ✅ Autenticación con NextAuth

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Base de datos:** MongoDB
- **Autenticación:** NextAuth.js
- **Estilos:** Tailwind CSS
- **Imágenes:** Cloudinary
- **Iconos:** React Icons
- **Drag & Drop:** @dnd-kit

## 🛠️ Instalación

1. **Clonar el repositorio**

```bash
git clone <tu-repo>
cd bikimar
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Edita el archivo `.env.local` con tus credenciales:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/bikimar
# O usa MongoDB Atlas

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-un-secreto-seguro-aqui

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=5491123456789
```

4. **Configurar Cloudinary**

- Crea una cuenta en [Cloudinary](https://cloudinary.com/)
- Crea un upload preset llamado "bikimar" (Settings > Upload > Upload presets)
- Configura el preset como "unsigned"

5. **Configurar MongoDB**

Opción A - MongoDB Local:

```bash
# Instala MongoDB en tu sistema
# Inicia el servicio de MongoDB
```

Opción B - MongoDB Atlas (recomendado):

- Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crea un cluster
- Obtén la connection string y agrégala a `.env.local`

6. **Crear usuario administrador**

```bash
node scripts/create-admin.js
```

Credenciales por defecto:

- Email: `admin@bikimar.com`
- Password: `admin123`

⚠️ **IMPORTANTE:** Cambia la contraseña después del primer login

7. **Ejecutar el proyecto**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📝 Uso

### Panel de Administrador

1. Accede a `/admin/login`
2. Inicia sesión con las credenciales de admin
3. En el dashboard puedes:
   - Ver todos los productos
   - Crear nuevos productos
   - Editar productos existentes
   - Eliminar productos
   - Reordenar productos arrastrándolos

### Tienda Pública

- La página principal muestra todos los productos activos
- Los usuarios pueden filtrar por categoría
- Al hacer clic en "Comprar", se abre WhatsApp con un mensaje pre-llenado
- Botón de contacto directo en el header

## 🗂️ Estructura del Proyecto

```
bikimar/
├── app/
│   ├── admin/
│   │   ├── dashboard/      # Panel principal de admin
│   │   ├── login/          # Login de admin
│   │   └── products/
│   │       └── new/        # Crear producto
│   ├── api/
│   │   ├── auth/           # NextAuth routes
│   │   ├── products/       # CRUD de productos
│   │   └── upload/         # Subida de imágenes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Tienda pública
├── lib/
│   ├── auth.ts             # Configuración de NextAuth
│   └── mongodb.ts          # Conexión a MongoDB
├── models/
│   ├── Product.ts          # Modelo de producto
│   └── User.ts             # Modelo de usuario
├── scripts/
│   └── create-admin.js     # Script para crear admin
└── .env.local              # Variables de entorno
```

## 🎨 Categorías de Productos

- Bikini
- Enteriza
- Tankini
- Pareo
- Accesorio

## 📱 Integración de WhatsApp

Cada producto tiene un botón "Comprar" que:

1. Genera un mensaje con el nombre y precio del producto
2. Abre WhatsApp (web o app) con el mensaje pre-llenado
3. El cliente puede enviar el mensaje directamente al vendedor

## 🔐 Seguridad

- Las rutas de admin están protegidas con NextAuth
- Solo usuarios con rol "admin" pueden acceder al panel
- Las contraseñas se hashean con bcrypt
- Tokens JWT para sesiones

## 🚀 Deploy

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Conecta tu repo en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Deploy!

### Otras plataformas

Asegúrate de:

- Configurar todas las variables de entorno
- Tener una base de datos MongoDB accesible
- Ejecutar el script de crear admin después del deploy

## 📄 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir los cambios.

---

Hecho con ❤️ para Bikimar
