import Email from 'email-templates';

import eventEmitter from '../../utils/eventEmitter.js';
import UserAccountEvent from '../UserAccount/event.js';
import config from '../../config/index.js';

class MailService {
  mailer;
  email;

  constructor(mailer) {
    this.mailer = mailer;

    this.email = new Email({
      views: {
        options: {
          extension: 'ejs',
        },
      },
    });
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.onUserAccountCreated();
    this.onUserAccountForgotPasswordSend();
  }

  onUserAccountCreated() {
    eventEmitter.once(
      UserAccountEvent.USERACCOUNT_CREATED,
      async ({ to, verificationToken }) => {
        console.log(
          `event fired: ${UserAccountEvent.USERACCOUNT_CREATED} at onUserAccountCreated()`
        );

        try {
          const mailer = await this.mailer.send({
            from: config.mail.address.noreply,
            to,
            subject: 'Confirm Your Email Address',
            html: await this.email.render(
              '../src/app/Mail/templates/verify-email/html',
              {
                verificationToken,
              }
            ),
          });

          console.log(mailer);

          return mailer;
        } catch (ex) {
          console.error(ex);

          throw ex;
        }
      }
    );
  }

  onUserAccountForgotPasswordSend() {
    eventEmitter.once(
      UserAccountEvent.USERACCOUNT_FORGOTPASSWORD,
      async ({ to, resetPasswordToken }) => {
        console.log(
          `event fired: ${UserAccountEvent.USERACCOUNT_FORGOTPASSWORD} at onUserAccountForgotPasswordSend()`
        );

        try {
          const mailer = await this.mailer.send({
            from: config.mail.address.noreply,
            to,
            subject: 'Reset Your Password',
            html: await this.email.render(
              '../src/app/Mail/templates/reset-password/html',
              {
                resetPasswordToken,
              }
            ),
          });

          console.log(mailer);

          return mailer;
        } catch (ex) {
          console.error(ex);

          throw ex;
        }
      }
    );
  }
}

export default MailService;
