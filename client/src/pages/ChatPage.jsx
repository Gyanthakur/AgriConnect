import { useLayoutEffect } from "react";
import FarmerChatbot from "../components/ChatBot";
import { getToken } from "../utils/token.utils";

export default function ChatPage() {
  useLayoutEffect(() => {
    if (!getToken()) {
      window.location.href = "/login?redirect=/chatbot";
    }
  }, []);
  if (!getToken()) return null;
  return <FarmerChatbot />;
}
