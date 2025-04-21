import { useLayoutEffect } from "react";
import SignupForm from "../components/auth/Signup";
import { getToken, setToken } from "../utils/token.utils";
import useGetRedirectToken from "../hooks/useGetRedirectToken";

export default function SignupPage() {
  const redirect = useGetRedirectToken();
  useLayoutEffect(() => {
    if (getToken()) {
      window.location.href = redirect;
    }
  }, []);
  return (
    <div className="flex items-center justify-center w-full min-h-[92vh]">
      <SignupForm />
    </div>
  );
}
