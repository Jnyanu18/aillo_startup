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
      await submit({ data });
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
      <DialogContent className="max-h-[92vh] overflow-y-auto border-border bg-surface sm:max-w-lg">
        {sent ? (
          <div className="py-8 text-center">
            <div className="bg-gradient-ailo mx-auto flex h-14 w-14 items-center justify-center rounded-full">
              <Check className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-display mt-6 text-2xl font-semibold">Thanks — we'll be in touch.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We typically reply within one business day. Meanwhile, you can reach us at{" "}
              <a href="mailto:hello@ailo.ai" className="text-gradient">
                hello@ailo.ai
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
                  <Input {...form.register("name")} placeholder="Jane Doe" />
                </Field>
                <Field label="Email" error={form.formState.errors.email?.message}>
                  <Input type="email" {...form.register("email")} placeholder="jane@company.com" />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone (optional)">
                  <Input {...form.register("phone")} placeholder="+00 0000 000 000" />
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
