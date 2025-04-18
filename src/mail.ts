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
