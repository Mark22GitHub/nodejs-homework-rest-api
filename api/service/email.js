// =====================
// const sgMail = require("@sendgrid/mail");
// const Mailgen = require("mailgen");
// require("dotenv").config();

// class EmailService {
//   //   constructor() {}

//   #sender = sgMail;
//   #GenerateTemplate = Mailgen;

//   #createTemplate(verificationToken) {
//     const mailGenerator = new this.#GenerateTemplate({
//       theme: "default",
//       product: {
//         name: "Contacts Corp.",
//         // link: `http://localhost:${process.env.PORT}/`,
//         link: "http://localhost:3000/",
//       },
//     });

//     const template = {
//       body: {
//         name: "Dear, USER!!!",
//         intro:
//           "Welcome to Contacts Corp.! We're very excited to have you on board.",
//         action: {
//           instructions:
//             "To get started with Contacts Corp. , please click here:",
//           button: {
//             color: "#22BC66", // Optional action button color
//             text: "Verify your account",
//             // link: `http://localhost:${process.env.PORT}/users/verify/${verificationToken}`,
//             link: `http://localhost:3000/users/verify/${verificationToken}`,
//           },
//         },
//         outro:
//           "Need help, or have questions? Just reply to this email, we'd love to help.",
//       },
//     };
//     const emailBody = mailGenerator.generate(template);
//     return emailBody;
//   }

//   async sendEmail(verificationToken, email) {
//     const emailBody = this.#createTemplate(verificationToken);

//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     const msg = {
//       to: email, // Change to your recipient
//       from: "noreply@contacts-corp.com", // Change to your verified sender
//       subject: "Sending with SendGrid",
//       html: emailBody,
//     };

//     await this.#sender.send(msg);
//   }
// }

// module.exports = EmailService;
// // exports.EmailService = new EmailService();
// =====================

const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

const createTemplate = function (verificationToken, email) {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Contacts Corp.",
      link: `http://localhost:${process.env.PORT}/`,
      // link: "http://localhost:3000/",
    },
  });

  const template = {
    body: {
      name: "Dear, Friend!",
      intro:
        "Welcome to Contacts Corp.! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Contacts Corp. , please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your account",
          link: `http://localhost:${process.env.PORT}/users/verify/${verificationToken}`,
          //   link: `http://localhost:3000/users/verify/${verificationToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  const emailBody = mailGenerator.generate(template);
  return emailBody;
};

const sendEmail = async function sendEmail(verificationToken, email) {
  const emailBody = createTemplate(verificationToken, email);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email, // Change to your recipient
    from: "atelezhenko93@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid",
    html: emailBody,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email was sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;

// module.exports = {
//   sendEmail: sendEmail(),
// };
// exports.EmailService = new EmailService();
