import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO'] as const

function validateEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key])
  if (missing.length) {
    throw new Error(`Variables d'environnement manquantes: ${missing.join(', ')}`)
  }
}

function createTransporter() {
  validateEnv()
  const port = Number(process.env.SMTP_PORT) || 587
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Veuillez renseigner tous les champs.' },
        { status: 400 },
      )
    }

    const initial = name && name.trim() ? name.trim().charAt(0).toUpperCase() : '?'
    const transporter = createTransporter()
    const fromAddress = process.env.CONTACT_FROM || process.env.SMTP_USER

    await transporter.sendMail({
      from: `"${name} (via Portfolio)" <${fromAddress}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Nouveau message de ${name} via le portfolio`,
      text: `Nouveau message de ${name} (${email}) :\n\n${message}`,
      html: `
        <div style="background-color: #FAF8F5; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2D2D2D; margin: 0; min-height: 100%;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; border: 1px solid rgba(217, 119, 6, 0.12); overflow: hidden; box-shadow: 0 8px 30px rgba(217, 119, 6, 0.05);">
            
            <!-- Header Card -->
            <div style="background-color: #FAF8F5; padding: 36px 32px; text-align: left; border-bottom: 3px solid #D97706;">
              <div style="display: inline-block; font-family: 'Playfair Display', 'Georgia', serif; font-style: italic; font-size: 20px; color: #D97706; font-weight: 600; letter-spacing: -0.01em; padding-bottom: 6px; margin-bottom: 8px;">
                Nathan Remacle
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #2D2D2D; letter-spacing: -0.02em; font-family: 'Inter', sans-serif;">
                Nouveau message de contact
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #6B7280; font-family: 'Inter', sans-serif;">
                Reçu via le formulaire de votre portfolio
              </p>
            </div>

            <!-- Content Area -->
            <div style="padding: 32px;">
              
              <!-- Info Header with Avatar -->
              <div style="margin-bottom: 28px; background-color: #FCFAF7; padding: 20px; border-radius: 12px; border: 1px solid rgba(217, 119, 6, 0.06);">
                <table style="width: 100%; border-collapse: collapse; margin: 0; padding: 0;">
                  <tr>
                    <td style="width: 56px; vertical-align: top; padding: 0;">
                      <div style="width: 48px; height: 48px; border-radius: 24px; background-color: #D97706; color: #FAFAF9; text-align: center; line-height: 48px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif; box-shadow: 0 2px 8px rgba(217, 119, 6, 0.15);">
                        ${initial}
                      </div>
                    </td>
                    <td style="vertical-align: middle; padding: 0 0 0 12px;">
                      <h2 style="margin: 0; font-size: 16px; font-weight: 700; color: #2D2D2D; font-family: 'Inter', sans-serif;">
                        ${name}
                      </h2>
                      <p style="margin: 2px 0 0 0; font-size: 13px; color: #059669; font-family: 'Inter', sans-serif;">
                        <a href="mailto:${email}" style="color: #059669; text-decoration: none; font-weight: 500;">
                          ${email}
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message Block -->
              <div style="margin-bottom: 32px; background-color: #FCFAF7; border-left: 4px solid #D97706; padding: 24px; border-radius: 0 16px 16px 0; position: relative;">
                <div style="font-size: 48px; font-family: 'Playfair Display', 'Georgia', serif; font-style: italic; color: rgba(217, 119, 6, 0.15); line-height: 0; height: 0; margin-top: 10px; margin-left: -8px;">“</div>
                <div style="font-size: 15px; line-height: 1.7; color: #4B5563; white-space: pre-wrap; font-family: 'Inter', sans-serif; position: relative; z-index: 2;">${message}</div>
                <div style="text-align: right; font-size: 48px; font-family: 'Playfair Display', 'Georgia', serif; font-style: italic; color: rgba(217, 119, 6, 0.15); line-height: 0; height: 0; margin-top: -15px; margin-right: -8px;">”</div>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin: 36px 0 20px 0;">
                <a href="mailto:${email}?subject=Re: Votre message sur mon portfolio" style="display: inline-block; background-color: #D97706; color: #FFFFFF; padding: 16px 32px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; border: 1px solid #D97706; letter-spacing: -0.01em; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.2); transition: background-color 0.2s ease;">
                  Répondre directement par e-mail
                </a>
              </div>
            </div>

            <!-- Footer Section -->
            <div style="background-color: #FAF8F5; padding: 24px 32px; text-align: center; border-top: 1px solid rgba(217, 119, 6, 0.08);">
              <p style="margin: 0; font-size: 12px; color: #6B7280; font-family: 'Inter', sans-serif;">
                Ce mail a été envoyé automatiquement depuis votre portfolio <a href="https://nathanremacle.vercel.app" style="color: #D97706; text-decoration: none; font-weight: 500;">nathanremacle.vercel.app</a>.
              </p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #9CA3AF; font-family: 'Inter', sans-serif;">
                © ${new Date().getFullYear()} Nathan Remacle. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi email contact:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible d'envoyer le message pour le moment.",
      },
      { status: 500 },
    )
  }
}







