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
        <div style="background-color: #F2F0E9; padding: 40px 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0F2822; margin: 0; min-height: 100%;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #FAFAF9; border-radius: 16px; border: 1px solid rgba(15, 40, 34, 0.08); overflow: hidden; box-shadow: 0 4px 20px rgba(15, 40, 34, 0.05);">
            
            <!-- Header Card -->
            <div style="background-color: #0F2822; padding: 36px 32px; text-align: left; border-bottom: 4px solid #D97706;">
              <div style="display: inline-block; font-family: 'Playfair Display', 'Georgia', serif; font-style: italic; font-size: 18px; color: #FAFAF9; font-weight: 500; letter-spacing: -0.01em; border-bottom: 1px solid rgba(250, 250, 249, 0.2); padding-bottom: 6px; margin-bottom: 16px;">
                Nathan Remacle
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #FAFAF9; letter-spacing: -0.02em; font-family: 'Inter', sans-serif;">
                Nouveau message de contact
              </h1>
              <div style="margin-top: 10px; font-size: 10px; color: #8DC7BA; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase;">
                PORTFOLIO CONTACT FORM // SEC_A-A
              </div>
            </div>

            <!-- Content Area -->
            <div style="padding: 32px;">
              
              <!-- Info Header with Avatar -->
              <div style="margin-bottom: 28px; background-color: #FDFDFB; padding: 20px; border-radius: 12px; border: 1px solid rgba(15, 40, 34, 0.06);">
                <table style="width: 100%; border-collapse: collapse; margin: 0; padding: 0;">
                  <tr>
                    <td style="width: 56px; vertical-align: top; padding: 0;">
                      <div style="width: 48px; height: 48px; border-radius: 24px; background-color: #D97706; color: #FAFAF9; text-align: center; line-height: 48px; font-size: 20px; font-weight: 700; font-family: 'Inter', sans-serif; box-shadow: 0 2px 8px rgba(217, 119, 6, 0.15);">
                        ${initial}
                      </div>
                    </td>
                    <td style="vertical-align: middle; padding: 0 0 0 12px;">
                      <h2 style="margin: 0; font-size: 16px; font-weight: 700; color: #0F2822; font-family: 'Inter', sans-serif;">
                        ${name}
                      </h2>
                      <p style="margin: 2px 0 0 0; font-size: 13px; color: #2D8B75; font-family: 'Inter', sans-serif;">
                        <a href="mailto:${email}" style="color: #2D8B75; text-decoration: none; font-weight: 500;">
                          ${email}
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message Block -->
              <div style="margin-bottom: 32px; background-color: #F5F3EC; border-left: 4px solid #D97706; padding: 24px; border-radius: 0 16px 16px 0; position: relative;">
                <div style="font-size: 48px; font-family: 'Playfair Display', 'Georgia', serif; font-style: italic; color: rgba(217, 119, 6, 0.15); line-height: 0; height: 0; margin-top: 10px; margin-left: -8px;">“</div>
                <div style="font-size: 15px; line-height: 1.7; color: #1E3E37; white-space: pre-wrap; font-family: 'Inter', sans-serif; position: relative; z-index: 2;">${message}</div>
                <div style="text-align: right; font-size: 48px; font-family: 'Playfair Display', 'Georgia', serif; font-style: italic; color: rgba(217, 119, 6, 0.15); line-height: 0; height: 0; margin-top: -15px; margin-right: -8px;">”</div>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin: 36px 0 20px 0;">
                <a href="mailto:${email}?subject=Re: Votre message sur mon portfolio" style="display: inline-block; background-color: #0F2822; color: #FAFAF9; padding: 16px 32px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; border: 1px solid #0F2822; letter-spacing: -0.01em; box-shadow: 0 4px 12px rgba(15, 40, 34, 0.15); transition: background-color 0.2s ease;">
                  Répondre directement par e-mail
                </a>
              </div>
            </div>

            <!-- Footer Section -->
            <div style="background-color: #0A1A16; padding: 24px 32px; text-align: center; border-top: 1px solid rgba(15, 40, 34, 0.05);">
              <p style="margin: 0; font-size: 11px; color: #75C3B1; font-family: monospace;">
                Ce mail a été envoyé automatiquement depuis la page d'accueil de nathanremacle.be.
              </p>
              <p style="margin: 4px 0 0 0; font-size: 10px; color: #47AF97; font-family: monospace;">
                SCALE: 1:1 // ALL RIGHTS RESERVED © ${new Date().getFullYear()}
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







