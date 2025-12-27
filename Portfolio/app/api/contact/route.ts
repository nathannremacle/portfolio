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

    const transporter = createTransporter()

    await transporter.sendMail({
      from: process.env.CONTACT_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Nouveau message de ${name} via le portfolio`,
      text: message,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
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







