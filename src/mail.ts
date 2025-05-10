import { Resend } from "resend";
const emailAPI = process.env.RESEND_API_KEY;
const resend = new Resend(emailAPI);

export const sendVerificationToken = async (email: string, token: string) => {
  const link = `${process.env.BASE_URL}/verify?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify Your Email",
    html: `<div>
    <a href="${link}"> Click Here To Verify Your Email</a>
      </div>`,
  });
};
export const sendForgotPassworToken = async (email: string, token: string) => {
  const link = `${process.env.BASE_URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset Your Password",
    html: `<div>
    <a href="${link}"> Click Here To reset Your password</a>
      </div>`,
  });
};
export const sendTwoStepToken = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Step Code",
    html: `<div>
 <h1> Code :${token}</h1>
    </div>`,
  });
};
