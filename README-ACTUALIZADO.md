# 🏖️ Marina Bikinis - E-Commerce Platform

E-commerce platform para bikinis de autor con panel de administración completo y sistema de analíticas avanzado.

## ✨ Nuevas Funcionalidades Implementadas

### 🎨 Sistema de Configuración Dinámico
- **Editar desde el admin** todos los textos de la página principal
- **Personalizar el Hero**: título, subtítulo, descripción e imágenes del carrusel
- **Personalizar el Footer**: cambiar el GIF de fondo y todos los textos
- **Banner personalizable**: editar el texto de la marquesina animada

### 📄 Páginas Individuales de Productos
- Cada producto tiene su propia página dedicada
- Galería de imágenes con miniaturas
- Tracking automático de vistas
- Información completa y detallada

### 📊 Sistema de Analíticas Avanzado
- **Productos Más Vistos**: ve cuántas personas visitaron cada producto
- **Productos Más Clickeados**: identifica qué productos generan más interés
- Dashboard completo con estadísticas en tiempo real
- Datos por período (7, 30 o 90 días)

### 🎯 Mejoras en la Interfaz
- Iconos de productos más compactos
- Click en el producto lleva a su página individual
- Diseño responsive mejorado
- Experiencia de usuario optimizada

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- MongoDB
- Cuenta de Cloudinary (para imágenes)

### Pasos

1. **Clonar el repositorio** (ya hecho)
```bash
cd c:\Users\Usuario\OneDrive\Escritorio\marina
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear un archivo `.env.local` en la raíz del proyecto:
```env
# MongoDB
MONGODB_URI=tu_url_de_mongodb

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_aqui

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Email (opcional)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_app
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 📱 Uso

### Acceso al Panel de Administración
1. Ir a: `http://localhost:3000/admin/login`
2. Ingresar credenciales de admin
3. Acceder al dashboard

### Configurar el Contenido del Sitio
1. En el admin, ir a **Configuración** (icono de engranaje)
2. Editar las secciones:
   - **📱 Información de Contacto**: WhatsApp, Instagram, nombre de la tienda
   - **📢 Banner**: texto de la marquesina animada
   - **🎨 Hero**: título principal, subtítulo, descripción e imágenes del carrusel
   - **🌊 Footer**: GIF de fondo, título, subtítulo y descripción
3. Hacer clic en **Guardar Configuración**
4. Los cambios se reflejan inmediatamente en el sitio

### Ver Analíticas de Productos
1. En el admin, ir a **Analytics**
2. Seleccionar el período deseado (7, 30 o 90 días)
3. Ver las estadísticas:
   - **Productos Más Vistos**: ranking de productos por vistas
   - **Productos Más Clickeados**: ranking de productos por clicks a WhatsApp
   - Visitas totales, visitantes únicos, países, etc.

### Gestionar Productos
1. En el admin, ir a **Productos**
2. Crear, editar o eliminar productos
3. Los productos aparecerán automáticamente en el sitio
4. Cada producto tendrá su propia página con URL única

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **MongoDB** - Base de datos
- **NextAuth** - Autenticación
- **Tailwind CSS** - Estilos
- **Cloudinary** - Gestión de imágenes
- **React Icons** - Iconos

## 📂 Estructura del Proyecto

```
marina/
├── app/
│   ├── admin/              # Panel de administración
│   │   ├── analytics/      # 📊 Dashboard de analíticas (NUEVO)
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── settings/       # 🎛️ Configuración mejorada (ACTUALIZADO)
│   │   └── products/       # Gestión de productos
│   ├── api/
│   │   ├── analytics/      # Endpoints de analíticas
│   │   │   ├── click/      # Registrar clicks
│   │   │   ├── view/       # 👁️ Registrar vistas (NUEVO)
│   │   │   └── stats/      # Estadísticas mejoradas (ACTUALIZADO)
│   │   ├── products/
│   │   │   └── [id]/       # 📄 Endpoint de producto individual (NUEVO)
│   │   └── settings/       # Configuración del sitio
│   ├── productos/
│   │   └── [id]/           # 📄 Página individual de producto (NUEVO)
│   └── page.tsx            # Página principal (ACTUALIZADO)
├── components/
│   └── WaterFooter.tsx     # 🌊 Footer dinámico (ACTUALIZADO)
├── models/
│   ├── Settings.ts         # 🎨 Modelo ampliado (ACTUALIZADO)
│   └── Analytics.ts        # 📊 Modelo mejorado (ACTUALIZADO)
└── NUEVAS-FUNCIONALIDADES.md  # 📋 Documentación detallada
```

## 🎯 Funcionalidades Principales

### Para Administradores
- ✅ Gestión completa de productos
- ✅ Edición de todo el contenido del sitio sin código
- ✅ Subida de imágenes drag & drop
- ✅ Analíticas en tiempo real
- ✅ Identificar productos más populares
- ✅ Tomar decisiones basadas en datos

### Para Visitantes
- ✅ Navegación intuitiva
- ✅ Ver detalles de cada producto
- ✅ Galerías de imágenes
- ✅ Contacto directo por WhatsApp
- ✅ Experiencia responsive en todos los dispositivos

## 📊 Analíticas Disponibles

El sistema rastrea automáticamente:
- ✅ Visitas totales al sitio
- ✅ Vistas de cada producto individual
- ✅ Clicks en botón de WhatsApp por producto
- ✅ Visitantes únicos
- ✅ Ubicación geográfica
- ✅ Productos más populares

## 🔐 Seguridad

- Autenticación con NextAuth
- Rutas protegidas para el admin
- Variables de entorno para datos sensibles
- Validación de sesiones

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start

# Crear usuario admin
npm run create-admin

# Linting
npm run lint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit los cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.

## 📞 Soporte

Para dudas o problemas, contactar al equipo de desarrollo.

---

**Última actualización**: Enero 2026  
**Versión**: 2.0 con Analíticas Avanzadas y Configuración Dinámica
