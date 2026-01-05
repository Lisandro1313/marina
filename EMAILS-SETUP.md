# Sistema de Notificaciones por Email - Marina Bikinis

## Configuración de Resend

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita (incluye 3,000 emails/mes)
3. Verifica tu email

### 2. Obtener API Key

1. En el dashboard de Resend, ve a **API Keys**
2. Crea una nueva API key
3. Cópiala y guárdala en `.env.local`:
   ```
   RESEND_API_KEY=re_tu_api_key_aqui
   ```

### 3. Configurar dominio (Opcional pero recomendado)

1. En Resend, ve a **Domains**
2. Agrega tu dominio (ej: marinabikinis.com)
3. Configura los registros DNS según las instrucciones
4. Una vez verificado, actualiza en `lib/email.ts`:
   ```typescript
   from: "Marina Bikinis <pedidos@tudominio.com>";
   ```

### 4. Configurar email del admin

En `.env.local`, agrega tu email para recibir notificaciones:

```
ADMIN_EMAIL=tu-email@ejemplo.com
```

## Funcionamiento

Cuando un cliente completa una compra:

1. Se crea el pedido en MongoDB
2. Se genera automáticamente un número de orden (ej: BK000001)
3. Se envía un email profesional al admin con:
   - Número de orden destacado
   - Datos completos del cliente
   - Lista de productos con tallas y cantidades
   - Total del pedido
   - Botón directo para contactar por WhatsApp

## Email Template

El email incluye:

- ✅ Header con branding de Marina Bikinis
- ✅ Número de orden destacado
- ✅ Información completa del cliente
- ✅ Tabla de productos con detalles
- ✅ Total del pedido resaltado
- ✅ Botón CTA para WhatsApp
- ✅ Footer con info de la marca
- ✅ Diseño responsive y profesional

## Testing

Para probar sin dominio verificado:

1. Resend permite enviar a tu email verificado
2. En desarrollo, los emails se envían pero pueden ir a spam
3. Una vez en producción con dominio verificado, funcionará perfectamente

## Producción

Para usar en producción:

1. Verifica tu dominio en Resend
2. Actualiza las variables de entorno en tu hosting
3. Los emails llegarán correctamente a la bandeja de entrada

## Nota Importante

Si el envío de email falla, **el pedido se crea igual**. El error solo se registra en consola para no afectar la experiencia del cliente.
