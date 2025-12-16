# 🎉 E-Commerce Bikimar - Listo para usar!

## ✅ Proyecto compilado exitosamente

El e-commerce está **completamente funcional** y ejecutándose en: **http://localhost:3000**

---

## 📋 Pasos para configurar y usar

### 1. Configura las variables de entorno

Edita el archivo `.env.local` con tus credenciales reales:

```env
# MongoDB - Usa MongoDB Atlas o local
MONGODB_URI=mongodb://localhost:27017/bikimar
# MongoDB Atlas ejemplo: mongodb+srv://<usuario>:<password>@cluster.mongodb.net/bikimar

# NextAuth Secret - Genera uno seguro con: openssl rand -base64 32
NEXTAUTH_SECRET=cambia-esto-por-un-secret-seguro-generado

# Cloudinary - Obtén tus credenciales en cloudinary.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name-real
CLOUDINARY_API_KEY=tu-api-key-real
CLOUDINARY_API_SECRET=tu-api-secret-real

# WhatsApp - Tu número con código de país (sin +)
NEXT_PUBLIC_WHATSAPP_NUMBER=5491123456789
```

### 2. Configura Cloudinary (para subir imágenes)

1. Crea una cuenta gratis en [Cloudinary](https://cloudinary.com/)
2. Ve a **Settings** → **Upload** → **Upload presets**
3. Crea un nuevo preset:
   - **Preset name**: `bikimar`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `bikimar` (opcional)
4. Guarda y copia las credenciales al `.env.local`

### 3. Configura MongoDB

**Opción A - MongoDB Atlas (Recomendado - Gratis)**:

1. Crea cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster (Free Tier)
3. Crea un usuario de base de datos
4. Permite acceso desde cualquier IP (0.0.0.0/0) en Network Access
5. Copia la connection string y pégala en `MONGODB_URI`

**Opción B - MongoDB Local**:

1. Instala MongoDB en tu sistema
2. Inicia el servicio: `mongod`
3. Usa: `MONGODB_URI=mongodb://localhost:27017/bikimar`

### 4. Crea el usuario administrador

```bash
node scripts/create-admin.js
```

**Credenciales por defecto**:

- **Email**: `admin@bikimar.com`
- **Password**: `admin123`

⚠️ **IMPORTANTE**: Cambia la contraseña después del primer login

### 5. Reinicia el servidor

Si ya está corriendo, detenlo (Ctrl+C) y vuelve a iniciar:

```bash
npm run dev
```

---

## 🚀 Uso del Sistema

### Panel de Administrador

1. **Login**: http://localhost:3000/admin/login

   - Email: `admin@bikimar.com`
   - Password: `admin123`

2. **Dashboard**: http://localhost:3000/admin/dashboard

   - Ver todos los productos
   - **Arrastrar** productos para reordenarlos
   - **Crear** nuevo producto con el botón verde
   - **Editar** o **Eliminar** productos

3. **Crear Producto**: http://localhost:3000/admin/products/new
   - Completa todos los campos
   - **Sube imágenes** (requiere Cloudinary configurado)
   - Puedes agregar múltiples imágenes
   - Marca como **activo** para que aparezca en la tienda

### Tienda Pública

1. **Página Principal**: http://localhost:3000

   - Muestra todos los productos activos
   - Filtrar por categoría
   - Ver productos con su precio y descripción

2. **Comprar producto**:
   - Click en **botón verde "Comprar"**
   - Se abre WhatsApp con mensaje pre-llenado
   - El cliente puede enviarte el mensaje directamente

---

## 📱 Categorías Disponibles

- **Bikini** - Bikinis de dos piezas
- **Enteriza** - Trajes de baño de una pieza
- **Tankini** - Tankinis
- **Pareo** - Pareos y cobertores
- **Accesorio** - Accesorios de playa

---

## 🎨 Personalización

### Cambiar colores del tema

Edita [app/globals.css](app/globals.css) y modifica las variables de color:

- `pink-500` → Tu color primario
- `blue-500` → Tu color secundario
- `green-500` → Color del botón de WhatsApp

### Cambiar el nombre de la tienda

Busca y reemplaza "Bikimar" en:

- [app/page.tsx](app/page.tsx) - Tienda pública
- [app/admin/dashboard/page.tsx](app/admin/dashboard/page.tsx) - Panel admin
- [app/layout.tsx](app/layout.tsx) - Metadata

---

## 🐛 Solución de Problemas

### "No se pueden subir imágenes"

- Verifica que Cloudinary esté configurado correctamente
- Asegúrate de que el preset "bikimar" esté en modo "unsigned"
- Revisa que las credenciales en `.env.local` sean correctas

### "No se conecta a MongoDB"

- Verifica que MongoDB esté corriendo (local) o que la connection string sea correcta (Atlas)
- En Atlas, verifica que tu IP esté permitida en Network Access
- Verifica que el usuario y contraseña sean correctos

### "Error al iniciar sesión"

- Asegúrate de haber ejecutado `node scripts/create-admin.js`
- Verifica que MONGODB_URI y NEXTAUTH_SECRET estén configurados
- Revisa la consola para errores específicos

### "WhatsApp no se abre"

- Verifica que `NEXT_PUBLIC_WHATSAPP_NUMBER` esté configurado
- El formato debe ser: código de país + número (sin + ni espacios)
- Ejemplo: `5491123456789`

---

## 📦 Deploy a Producción

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Conecta tu repositorio en [Vercel](https://vercel.com)
3. Configura las mismas variables de entorno de `.env.local`
4. ¡Deploy automático!

### Otros servicios

- Asegúrate de configurar todas las variables de entorno
- Ejecuta `npm run build` para verificar que compile
- Asegúrate de que MongoDB sea accesible desde internet
- Ejecuta el script create-admin después del deploy

---

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Autenticación con NextAuth y JWT
- ✅ Rutas de admin protegidas
- ✅ Solo usuarios admin pueden gestionar productos
- ⚠️ **Cambia NEXTAUTH_SECRET en producción**
- ⚠️ **Cambia la contraseña del admin después del primer login**

---

## 📚 Stack Tecnológico

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **NextAuth.js** - Autenticación
- **Tailwind CSS** - Estilos utility-first
- **Cloudinary** - Hosting de imágenes
- **@dnd-kit** - Drag and drop
- **React Icons** - Iconos

---

## 🎯 Funcionalidades Implementadas

- ✅ CRUD completo de productos
- ✅ Autenticación de administrador
- ✅ Subida de múltiples imágenes
- ✅ Reordenamiento drag & drop
- ✅ Filtros por categoría
- ✅ Integración con WhatsApp (sin carrito)
- ✅ Diseño responsive
- ✅ Optimización de imágenes
- ✅ SEO friendly

---

## 📞 Soporte

Si encuentras algún problema:

1. Revisa la sección **Solución de Problemas**
2. Verifica la consola del navegador (F12)
3. Verifica la terminal donde corre el servidor
4. Asegúrate de que todas las variables de entorno estén configuradas

---

**¡Tu e-commerce está listo! 🎉**

Recuerda:

1. Configurar Cloudinary
2. Configurar MongoDB
3. Crear usuario admin
4. ¡Empieza a agregar productos!

**Servidor corriendo en**: http://localhost:3000
