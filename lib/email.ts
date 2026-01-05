import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
}

export async function sendOrderNotification(orderData: OrderEmailData) {
  // Si no hay API key de Resend configurada, skip silently
  if (!resend) {
    console.log('Resend API key not configured, skipping email notification');
    return { success: true, skipped: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Marina Bikinis <pedidos@marinabikinis.com>',
      to: [process.env.ADMIN_EMAIL || 'admin@marinabikinis.com'],
      subject: `🎉 Nuevo Pedido #${orderData.orderNumber}`,
      html: generateOrderEmailHTML(orderData),
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in sendOrderNotification:', error);
    return { success: false, error };
  }
}

function generateOrderEmailHTML(orderData: OrderEmailData): string {
  const itemsHTML = orderData.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
            <strong>${item.name}</strong><br>
            <span style="color: #6b7280; font-size: 14px;">Talla: ${item.size}</span>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
            $${item.price}
          </td>
        </tr>
      `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Pedido</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px;">
              MARINA BIKINIS
            </h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
              Nuevo Pedido Recibido
            </p>
          </div>

          <!-- Order Number -->
          <div style="background-color: #fdf2f8; padding: 20px; text-align: center; border-bottom: 2px solid #ec4899;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Número de Pedido</p>
            <h2 style="margin: 5px 0 0 0; color: #ec4899; font-size: 32px; letter-spacing: 1px;">
              ${orderData.orderNumber}
            </h2>
          </div>

          <!-- Customer Info -->
          <div style="padding: 30px 20px; border-bottom: 1px solid #e5e7eb;">
            <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 18px;">
              Datos del Cliente
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 120px;">Nombre:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">${orderData.customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0; color: #111827;">${orderData.customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Teléfono:</td>
                <td style="padding: 8px 0; color: #111827;">${orderData.customerPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Dirección:</td>
                <td style="padding: 8px 0; color: #111827;">${orderData.customerAddress}</td>
              </tr>
            </table>
          </div>

          <!-- Order Items -->
          <div style="padding: 30px 20px;">
            <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 18px;">
              Productos
            </h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 12px; text-align: left; color: #6b7280; font-weight: 600; border-bottom: 2px solid #e5e7eb;">
                    Producto
                  </th>
                  <th style="padding: 12px; text-align: center; color: #6b7280; font-weight: 600; border-bottom: 2px solid #e5e7eb;">
                    Cantidad
                  </th>
                  <th style="padding: 12px; text-align: right; color: #6b7280; font-weight: 600; border-bottom: 2px solid #e5e7eb;">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>
          </div>

          <!-- Total -->
          <div style="padding: 20px; background-color: #fdf2f8;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="margin: 0; color: #6b7280; font-size: 18px;">Total:</p>
              <p style="margin: 0; color: #ec4899; font-size: 32px; font-weight: bold;">
                $${orderData.total}
              </p>
            </div>
          </div>

          <!-- Action Button -->
          <div style="padding: 30px 20px; text-align: center;">
            <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola!%20Consulto%20por%20el%20pedido%20${orderData.orderNumber}" 
               style="display: inline-block; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              💬 Contactar Cliente por WhatsApp
            </a>
          </div>

          <!-- Footer -->
          <div style="background-color: #111827; padding: 30px 20px; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 14px;">
              © ${new Date().getFullYear()} Marina Bikinis Autora
            </p>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px;">
              Diseños artesanales únicos • Bordados a mano con dedicación
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
