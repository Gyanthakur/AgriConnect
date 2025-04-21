export default function TermsAndCondition() {
  return (
    <div className="">
      <p className="text-gray-800 dark:text-zinc-300 ">
        By signing in or creating an account, you are agreeing to our
        <a href="/terms-of-service" className="ml-1 text-blue-500 underline">
          Terms & Conditions
        </a>{" "}
        and our
        <a href="/privacy-policy" className="ml-1 text-blue-500 underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
