import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
import { leadInputSchema, SERVICE_INTERESTS, type LeadInput } from "@/lib/leads.schema";

const COUNTRY_CODES = [
  { code: "+91", label: "IN +91" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+971", label: "UAE +971" },
  { code: "+65", label: "SG +65" },
  { code: "+61", label: "AU +61" },
  { code: "+49", label: "DE +49" },
  { code: "+81", label: "JP +81" },
] as const;

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  /** Pre-select a service domain when opening the dialog. */
  defaultServiceInterest?: string;
  /** Pre-fill the message field (e.g. "I'd like a custom AI build…"). */
  defaultMessage?: string;
}

export function ConsultationDialog({
  open,
  onOpenChange,
  defaultServiceInterest,
  defaultMessage,
}: ConsultationDialogProps) {
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>(COUNTRY_CODES[0].code);
  const submit = useServerFn(submitLead);

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadInputSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      socialLink: "",
      message: "",
      serviceInterest: "",
      website: "",
    },
  });

  // Sync pre-fill values whenever the dialog re-opens.
  useEffect(() => {
    if (!open) return;
    if (defaultServiceInterest) {
      form.setValue("serviceInterest", defaultServiceInterest, { shouldValidate: false });
    }
    if (defaultMessage) {
      form.setValue("message", defaultMessage, { shouldValidate: false });
    }
  }, [open, defaultServiceInterest, defaultMessage, form]);


  const onSubmit = async (data: LeadInput) => {
    setErrorMsg(null);
    try {
      const phone = data.phone?.trim() ? `${countryCode} ${data.phone.trim()}` : data.phone;
      await submit({ data: { ...data, phone } });
      setSent(true);
    } catch (e: any) {
      setErrorMsg(e?.message || "Something went wrong. Please try again.");
    }
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      setTimeout(() => {
        setSent(false);
        setErrorMsg(null);
        form.reset();
      }, 200);
    }
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-border bg-background sm:max-w-lg">
        {sent ? (
          <div className="py-8 text-center">
            <div className="bg-gradient-ailo mx-auto flex h-14 w-14 items-center justify-center rounded-full">
              <Check className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-display mt-6 text-2xl font-semibold">Thanks — we'll be in touch.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We typically reply within one business day. Meanwhile, you can reach us at{" "}
              <a href="mailto:info@accelerationlogics.com" className="text-gradient">
                info@accelerationlogics.com
              </a>
              .
            </p>
            <Button variant="outline" className="mt-8" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Book a free consultation</DialogTitle>
              <DialogDescription>
                Tell us a bit about what you're building. We'll respond within one business day.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-4">
              {/* honeypot */}
              <input
                type="text"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                {...form.register("website")}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" error={form.formState.errors.name?.message}>
                  <Input {...form.register("name")} placeholder="Enter your name" />
                </Field>
                <Field label="Email" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} placeholder="Enter your email id" />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone (optional)">
                  <div className="flex gap-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-23 shrink-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input {...form.register("phone")} placeholder="98765 43210" className="flex-1" />
                  </div>
                </Field>
                <Field label="Company">
                  <Input {...form.register("company")} placeholder="Acme Inc." />
                </Field>
              </div>

              <Field label="LinkedIn / social profile (optional)">
                <Input {...form.register("socialLink")} placeholder="linkedin.com/in/janedoe" />
              </Field>

              <Field label="Service interest">
                <Select
                  value={form.watch("serviceInterest") || undefined}
                  onValueChange={(v) => form.setValue("serviceInterest", v, { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a service domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_INTERESTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>


              <Field label="What can we help with?" error={form.formState.errors.message?.message}>
                <Textarea
                  rows={4}
                  {...form.register("message")}
                  placeholder="Tell us about your project, goals, timeline…"
                />
              </Field>

              {errorMsg && (
                <p className="text-sm text-destructive">{errorMsg}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
