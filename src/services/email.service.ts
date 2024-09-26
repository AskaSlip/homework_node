import nodemailer, { Transporter } from "nodemailer";
import HbsTransporter from "nodemailer-express-handlebars";
import path from "path";

import { configs } from "../config/configs";
import { emailConstants } from "../constants/email.constants";
import { EmailTypeEnum } from "../emuns/email-type.enum";
import { EmailTypeToPayload } from "../types/email.type-to-payload.type";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      from: "No reply",
      auth: {
        user: configs.SMTP_EMAIL,
        pass: configs.SMTP_PASSWORD,
      },
    });

    this.transporter.use(
      "compile",
      HbsTransporter({
        viewEngine: {
          extname: ".hbs",
          defaultLayout: "main",
          layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
          partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
        },
        viewPath: path.join(process.cwd(), "src", "templates", "views"),
        extName: ".hbs",
      }),
    );
  }

  public async sendMail<T extends EmailTypeEnum>(
    to: string,
    type: EmailTypeEnum,
    context: EmailTypeToPayload[T],
  ): Promise<void> {
    const { subject, template } = emailConstants[type];

    context["frontUrl"] = configs.APP_FRONT_URL;
    const options = { to, subject, template, context };
    await this.transporter.sendMail(options);
  }
}

export const emailService = new EmailService();
