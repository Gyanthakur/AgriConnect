import twilio from 'twilio';
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromPhone = process.env.TWILIO_PHONE_NUMBER
const client = twilio(accountSid, authToken);

export const sendOTP = async (phone, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: fromPhone,
      to: "+91" + phone,
    });
    return true;
  } catch (error) {
    console.error(`Failed to send OTP to ${phone}:`, error.message);
    return false;
  }
};
