import { MessageCircle } from "lucide-react";
import { CONTACT_PHONE_INTL } from "@/lib/site-config";

export function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/${CONTACT_PHONE_INTL}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={0} />
    </a>
  );
}
