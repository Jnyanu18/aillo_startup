import { lazy, Suspense, useState, type ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

// Lazy-loaded: pulls in react-hook-form + zod resolver + dialog/select UI,
// which no visitor needs until they actually click "Book a consultation".
const ConsultationDialog = lazy(() =>
  import("@/components/consultation-dialog").then((m) => ({ default: m.ConsultationDialog })),
);

export type BookingPrefill = { serviceInterest?: string; message?: string };
export type OpenBooking = (prefill?: BookingPrefill) => void;

export function PageChrome({
  children,
}: {
  children: (openBooking: OpenBooking) => ReactNode;
}) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});
  const openBooking: OpenBooking = (p = {}) => {
    setPrefill(p);
    setHasOpened(true);
    setBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10">
        <SiteNav onCtaClick={() => openBooking()} />
        <main className="relative">{children(openBooking)}</main>
        <SiteFooter />
      </div>
      {hasOpened && (
        <Suspense fallback={null}>
          <ConsultationDialog
            open={bookingOpen}
            onOpenChange={setBookingOpen}
            defaultServiceInterest={prefill.serviceInterest}
            defaultMessage={prefill.message}
          />
        </Suspense>
      )}
    </div>
  );
}
