import { useState, type ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ConsultationDialog } from "@/components/consultation-dialog";
import { WhatsappButton } from "@/components/whatsapp-button";

export type BookingPrefill = { serviceInterest?: string; message?: string };
export type OpenBooking = (prefill?: BookingPrefill) => void;

export function PageChrome({
  children,
}: {
  children: (openBooking: OpenBooking) => ReactNode;
}) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});
  const openBooking: OpenBooking = (p = {}) => {
    setPrefill(p);
    setBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Site-wide backdrop — placeholder photo (watermarked Unsplash+ preview), swap before deploying.
          Heavily blurred so it reads as soft color/light behind content instead of competing with text. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 scale-110 bg-cover bg-center bg-fixed opacity-70 blur-3xl"
        style={{ backgroundImage: "url(/images/hero-bg-placeholder.jpg)" }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-background/12" />

      <div className="relative z-10">
        <SiteNav onCtaClick={() => openBooking()} />
        <main className="relative">{children(openBooking)}</main>
        <SiteFooter />
      </div>
      <WhatsappButton />
      <ConsultationDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultServiceInterest={prefill.serviceInterest}
        defaultMessage={prefill.message}
      />
    </div>
  );
}
