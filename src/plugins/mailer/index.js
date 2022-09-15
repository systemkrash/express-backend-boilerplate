import aws, { SESClient } from '@aws-sdk/client-ses';
import nodemailer from 'nodemailer';

import config from '../../config/index.js';

async function init() {
  let ses;
  let smtp;
  let transporter;

  if (config.mail.type === 'ses') {
    ses = new SESClient({
      apiVersion: '2010-12-01',
      region: config.aws.ses.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });

    transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });
  }

  if (config.mail.type === 'smtp') {
    smtp = {
      host: config.mail.smtp.host,
      port: config.mail.smtp.port,
      secure: config.mail.smtp.secure,
      auth: {
        user: config.mail.smtp.auth.user,
        pass: config.mail.smtp.auth.pass,
      },
    };

    transporter = nodemailer.createTransport(smtp);
  }

  return { ses, smtp, transporter };
}

async function send({ from, to, subject, text = undefined, html = undefined }) {
  const { transporter } = await init();

  return await transporter.sendMail({ from, to, subject, text, html });
}

export default { init, send };
