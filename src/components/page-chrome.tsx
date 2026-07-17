import { useState, type ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ConsultationDialog } from "@/components/consultation-dialog";

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
      <div className="relative z-10">
        <SiteNav onCtaClick={() => openBooking()} />
        <main className="relative">{children(openBooking)}</main>
        <SiteFooter />
      </div>
      <ConsultationDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        defaultServiceInterest={prefill.serviceInterest}
        defaultMessage={prefill.message}
      />
    </div>
  );
}
