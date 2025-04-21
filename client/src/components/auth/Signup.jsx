import { useEffect, useState } from "react";
import "formwix/dist/formwix.css";
import { Formwix } from "formwix";
import {
  sendRegistrationOTP,
  verifyRegistrationOTP,
} from "../../utils/auth.utils";
import { setToken } from "../../utils/token.utils";
import useGetRedirectToken from "../../hooks/useGetRedirectToken";
import TermsAndCondition from "../../components/shared/TermsAndCondition";
import { ArrowLeft } from "phosphor-react";
import { toast } from "react-toastify";
export default function SignupForm() {
  const redirect = useGetRedirectToken();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResendOTP, setCanResendOTP] = useState(false);
  3;
  const handlePostSignIn = () => {
    window.location.href = `/setup?redirect=${redirect}`;
  };
  const step1Config = {
    fields: [
      {
        type: "text",
        label: "Phone Number",
        name: "phone",
        placeholder: "Enter your phone number",
        theme: {
          text: "border w-full dark:bg-zinc-800 py-2 px-2 rounded-lg outline-none",
        },
        validation: {
          required: { value: true, message: "Phone number is required" },
          minLength: {
            value: 10,
            message: "Phone number must be at least 10 digits",
          },
          maxLength: {
            value: 10,
            message: "Phone number must be at most 10 digits",
          },
        },
      },
    ],
    defaultValues: {
      phone: phoneNumber,
    },
    submitButtonLabel: submitting ? "Sending OTP..." : "Send OTP",
    onSubmit: async (data) => {
      setSubmitting(true);
      setError(null);
      try {
        const phone = data.phone;
        const { ok } = await sendRegistrationOTP({ phone });
        if (!ok) throw new Error("Failed to send OTP");
        setPhoneNumber(phone);
        setStep(2);
        toast.success("OTP sent!");
      } catch (err) {
        toast.error("Failed to send OTP");
        setError(err.message || "Failed to send OTP.");
      } finally {
        setSubmitting(false);
      }
    },
  };

  const step2Config = {
    fields: [
      {
        type: "text",
        label: "OTP",
        name: "otp",
        placeholder: "Enter OTP",
        theme: {
          otp: "border dark:bg-zinc-800 w-full py-2 px-2 rounded-lg outline-none",
        },
        validation: {
          required: { value: true, message: "OTP is required" },
          minLength: {
            value: 6,
            message: "OTP must be at least 6 digits",
          },
          maxLength: {
            value: 6,
            message: "OTP must be at most 6 digits",
          },
        },
      },
    ],
    submitButtonLabel: submitting ? "Verifying..." : "Login",
    validationMode: "onChange",
    onSubmit: async (data, { reset }) => {
      setSubmitting(true);
      setError(null);
      try {
        const { token, ok } = await verifyRegistrationOTP({
          phone: phoneNumber,
          otp: data.otp,
        });
        if (!ok) throw new Error("Invalid OTP");
        if (!token) throw new Error("Invalid OTP");
        setToken(token);
        reset();
        toast.success("Logged in successfully");
        handlePostSignIn();
      } catch (err) {
        setError(err.message || "OTP verification failed.");
      } finally {
        setSubmitting(false);
      }
    },
  };

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResendOTP(true);
    }
  }, [step, timer]);

  return (
    <div className="flex flex-col w-full max-w-md p-6 rounded-2xl gap-y-4">
      {step === 2 && (
        <button
          onClick={() => setStep(1)}
          className="flex items-center gap-2 font-semibold text-blue-500"
        >
          <ArrowLeft size={24} className="text-gray-500" />
          Back
        </button>
      )}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="block text-2xl font-bold text-black dark:text-white">
            {step === 1 ? "Signup" : "Enter OTP"}
          </h1>
        </div>
        {step === 1 && (
          <div className="text-sm text-gray-600 dark:text-zinc-400">
            Already have an account?{" "}
            <a
              href={`/login?redirect=${redirect}`}
              className="font-medium text-blue-500 dark:text-blue-500 decoration-2 hover:underline"
            >
              Sign in here
            </a>
          </div>
        )}
        {step === 2 && (
          <div className="w-full space-y-1 text-sm text-gray-700 border border-gray-200 rounded-lg dark:text-zinc-400 ">
            <p>
              OTP has been sent to{" "}
              <span className="font-semibold text-gray-900 dark:text-zinc-300 ">
                +91-{phoneNumber?.slice(0, 2)}******{phoneNumber?.slice(-2)}
              </span>
            </p>
          </div>
        )}
      </div>
      <Formwix
        config={step === 1 ? step1Config : step2Config}
        theme={{
          submitButton:
            "text-white bg-blue-500  w-full py-2 rounded-lg disabled:opacity-90 disabled:cursor-not-allowed",
        }}
      />
      {step === 2 && (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-center text-gray-600 dark:text-zinc-300">
            OTP expires in{" "}
            <span className="font-medium">{formatTime(timer)}</span>
          </div>
          <button
            disabled={!canResendOTP}
            onClick={() => {
              setStep(1);
              setTimer(120);
              setCanResendOTP(false);
              toast("Try again by entering your phone number");
            }}
            className={`font-medium text-sm ${
              canResendOTP
                ? "text-blue-500 hover:underline"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Resend OTP
          </button>
        </div>
      )}
      {error && (
        <div id="error-display" className="w-full text-center">
          <span className="text-sm font-[500] text-red-500">{error}</span>
        </div>
      )}
      <div className="px-4 py-2 mx-auto text-xs text-center round-border">
        <TermsAndCondition />
      </div>
    </div>
  );
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};
