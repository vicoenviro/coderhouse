import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'vicoenviro@gmail.com',
    pass: 'xlanbkyaqixwecgr',
  },
})


export default async function sendMail(subject, body, target, attachment) {
  const opts ={
    from: 'Servidor Node',
    to: target,
    subject,
    html: body,
  }

  if (attachment) {
    opts.attachments = [
      {
        path: attachment,
      },
    ]
  }
  
  try {
    const result = await transporter.sendMail(opts)
    console.log('result', result)
  } catch (error) {
    console.error('error', error)
  }
}
