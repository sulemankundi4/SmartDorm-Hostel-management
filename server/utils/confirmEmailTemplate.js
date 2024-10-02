module.exports.generateEmailTemplate = (verificatonLink, user) => {
  console.log("The verification link is in template: ", verificatonLink);
  return `

  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; margin-top: 1.25rem; font-family: Nunito, sans-serif">
      <section style="max-width: 42rem; background-color: #fff;">
        <main style="margin-top: 2rem; padding-left: 1.25rem; padding-right: 1.25rem;">
          <h4 style="color: #374151;">Hello ${user.Name},</h4>
          <p style="line-height: 1.5; color: #4b5563;">
            Please Click on the below button to verify your Email
          </p>
          <p style="margin-top: 1rem; line-height: 1.75; color: #4b5563;">
            This passcode will only be valid for the next
            <span style="font-weight: bold;"> 24 hours</span>. If the Link
            does not work, you can resend the Email verification link:
          </p>
          <a href="${verificatonLink}" target="_blank"><button style="padding-left: 1.25rem; padding-right: 1.25rem; padding-top: 0.5rem; padding-bottom: 0.5rem; margin-top: 1.5rem; font-size: 14px; font-weight: bold; text-transform: capitalize; background-color: #f97316; color: #fff; transition-property: background-color; transition-duration: 300ms; transform: none; border-radius: 0.375rem; border-width: 1px; border: none; outline: none; cursor: pointer;">
            Verify email
          </button></a>
          <p style="margin-top: 2rem; color: #4b5563; ">
            Thank you, <br />
            SmartDorm Team
          </p>
        </main>
        <p style="color: #7b8794; padding-left: 1.25rem; padding-right: 1.25rem; margin-top: 2rem;">
          This email was sent from
          <a
            href="mailto:sales@infynno.com"
            style="color: #365cce; text-decoration : none;"
            alt="sales@infynno.com"
            target="_blank"
          >
            SmarDom@info.com
          </a>
          . If you&apos;d rather not receive this kind of email, you can
          <a href="#" style="color: #365cce; text-decoration: none;">
            unsubscribe
          </a>
          or
          <a href="#" style="color: #365cce; text-decoration: none;">
            manage your email preferences
          </a>
          .
        </p>
      </section>
    </div>
  `;
};
module.exports.css = `
a {
   color: #365cce;
   text-decoration: none;
 }
   .border {
 border-style: solid;
   border-width: 1px;
   border-color: #365cce;
   border-radius: 0.25rem;
 }
 .otpbox
 {
 display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
   height: 2rem;
    font-size: 12px;
    font-weight: bold;
     color: #365cce
 }
 .footertext
 {
 font-size : 12px;
 }
  @media (min-width: 640px) {
  .footertext
  {
   font-size :16px;
  }
 }
`;
