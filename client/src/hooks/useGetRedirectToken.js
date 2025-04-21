import { useLocation } from "react-router-dom";

export default function useGetRedirectToken() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") ?? "/";
  return redirect;
}
