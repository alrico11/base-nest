import { Injectable, } from '@nestjs/common/decorators';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import { Transporter, createTransport } from "nodemailer";
import path from 'path';
import { PrismaService } from "src/prisma";
import { XConfig } from 'src/xconfig';
import { ISendResetPassword } from "./mail.@types";

interface SendMailParams {
    to: string,
    html: string,
    subject: string
}

@Injectable()
export class MailService {
    private transporter: Transporter;
    private resetPasswordTemplate: HandlebarsTemplateDelegate;
    private invoiceTemplate: HandlebarsTemplateDelegate
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: XConfig
    ) {
        this.transporter = createTransport({
            service: 'Gmail',
            auth: { user: this.config.env.EMAIL_ADDRESS, pass: this.config.env.EMAIL_PASSWORD }
        });

        const resetPasswordTemplatePath = readFileSync(path.resolve(__dirname, '..', '..', 'src', 'mail', 'reset-password.html'), 'utf8');
        this.resetPasswordTemplate = handlebars.compile(resetPasswordTemplatePath);
        const invoiceTemplatePath = readFileSync(path.resolve(__dirname, '..', '..', 'src', 'mail', 'newInvoice.html'), 'utf8');
        this.invoiceTemplate = handlebars.compile(invoiceTemplatePath);
    }

    async sendMail(params: SendMailParams | SendMailParams[]) {
        try {
            if (!(params instanceof Array)) params = [params];
            if (this.config.env.NODE_ENV === 'DEVELOPMENT') {
                for (const { to, subject, html } of params) {
                    const info = await this.transporter.sendMail({
                        from: `Kolabora  <${this.config.env.EMAIL_ADDRESS}>`,
                        to: to,
                        subject: `Kolabora | ${subject}`,
                        html: html,
                    });
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async sendResetPassword({ user, token }: ISendResetPassword) {
        this.sendMail({ to: user.email, html: this.resetPasswordTemplate({ token, name: user.name }), subject: 'Password Reset' })
    }
} 