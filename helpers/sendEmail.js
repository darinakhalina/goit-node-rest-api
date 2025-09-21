import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendVerificationMail = async (email, verificationToken) => {
    const emailOptions = {
        from: UKR_NET_EMAIL,
        to: email,
        subject: "Email verification",
        html: `
            <div style="
                max-width: 640px;
                margin: 40px auto;
                background-color: #ffffff;
                border: 1px solid #e5e5e5;
                border-radius: 10px;
                padding: 32px;
                font-family: 'Segoe UI', Arial, sans-serif;
                line-height: 1.6;
                color: #2c2c2c;">
                
                <h1 style="color: #111; font-size: 22px; text-align: center; margin-bottom: 24px;">
                    Підтвердження електронної адреси.
                </h1>
                
                <p style="margin-bottom: 18px; font-size: 16px;">
                    Ви успішно зареєструвалися у нашому сервісі. 
                    Щоб активувати акаунт і отримати повний доступ, підтвердіть свою пошту.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="http://localhost:3000/api/auth/verify/${verificationToken}"
                        style="
                            display: inline-block;
                            padding: 14px 28px;
                            background-color: #0066cc;
                            color: #ffffff;
                            font-size: 16px;
                            font-weight: 600;
                            text-decoration: none;
                            border-radius: 6px;">
                        Підтвердити акаунт.
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #555;">
                    Якщо кнопка не працює, скористайтесь цим посиланням:
                </p>
                <p style="font-size: 14px; color: #0066cc; word-break: break-word;">
                    http://localhost:3000/api/auth/verify/${verificationToken}
                </p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
                
                <p style="font-size: 13px; color: #777; text-align: center;">
                    Якщо ви не реєструвалися у нашому сервісі, просто проігноруйте цей лист.
                </p>
            </div>
        `
    };

    transport
        .sendMail(emailOptions)
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
};