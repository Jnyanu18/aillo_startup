import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  listAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/testimonials.functions";
import { Loader2, Plus, Trash2, Save, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — AILO Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: TestimonialsPage,
});

type Row = {
  id: string;
  stat: string;
  description: string;
  quote: string;
  attribution: string;
  display_order: number;
  published: boolean;
};

function TestimonialsPage() {
  const fetcher = useServerFn(listAllTestimonials);
  const createFn = useServerFn(createTestimonial);
  const updateFn = useServerFn(updateTestimonial);
  const deleteFn = useServerFn(deleteTestimonial);
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "testimonials"] });
    qc.invalidateQueries({ queryKey: ["testimonials", "published"] });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: () => fetcher() as Promise<Row[]>,
  });

  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <AdminShell>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Testimonials</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Shown in section 08 on the homepage. Unpublished rows are hidden.
            </p>
          </div>
          <Button variant="primary" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" /> New
          </Button>
        </div>

        <div className="mt-8 space-y-3">
          {creating && (
            <TestimonialForm
              onCancel={() => setCreating(false)}
              onSubmit={async (v) => {
                await createFn({ data: v });
                setCreating(false);
                invalidate();
              }}
            />
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (data || []).length === 0 && !creating ? (
            <div className="rounded-xl border border-border bg-surface/60 py-12 text-center text-sm text-muted-foreground">
              No testimonials yet — add one above.
            </div>
          ) : (
            (data || []).map((row) =>
              editingId === row.id ? (
                <TestimonialForm
                  key={row.id}
                  initial={row}
                  onCancel={() => setEditingId(null)}
                  onSubmit={async (v) => {
                    await updateFn({ data: { id: row.id, ...v } });
                    setEditingId(null);
                    invalidate();
                  }}
                />
              ) : (
                <div
                  key={row.id}
                  className="rounded-xl border border-border bg-surface/60 p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-gradient font-display text-2xl font-bold">
                          {row.stat}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                            row.published
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {row.published ? "Published" : "Hidden"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          order {row.display_order}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{row.description}</p>
                      <p className="mt-3 text-sm">"{row.quote}"</p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                        — {row.attribution}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(row.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          if (!confirm("Delete this testimonial?")) return;
                          await deleteFn({ data: { id: row.id } });
                          invalidate();
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ),
            )
          )}
        </div>
      </Container>
    </AdminShell>
  );
}

interface FormValues {
  stat: string;
  description: string;
  quote: string;
  attribution: string;
  display_order: number;
  published: boolean;
}

function TestimonialForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<FormValues>;
  onSubmit: (v: FormValues) => Promise<void>;
  onCancel: () => void;
}) {
  const [v, setV] = useState<FormValues>({
    stat: initial?.stat ?? "",
    description: initial?.description ?? "",
    quote: initial?.quote ?? "",
    attribution: initial?.attribution ?? "",
    display_order: initial?.display_order ?? 0,
    published: initial?.published ?? true,
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await onSubmit(v);
    } catch (e: any) {
      setErr(e?.message || "Failed to save");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handle}
      className="rounded-xl border border-border bg-surface/80 p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Labeled label="Stat (e.g. 68%, 3.2×)">
          <Input value={v.stat} onChange={(e) => setV({ ...v, stat: e.target.value })} />
        </Labeled>
        <Labeled label="Attribution">
          <Input
            value={v.attribution}
            onChange={(e) => setV({ ...v, attribution: e.target.value })}
          />
        </Labeled>
        <Labeled label="Description" className="md:col-span-2">
          <Textarea
            rows={2}
            value={v.description}
            onChange={(e) => setV({ ...v, description: e.target.value })}
          />
        </Labeled>
        <Labeled label="Quote" className="md:col-span-2">
          <Textarea
            rows={2}
            value={v.quote}
            onChange={(e) => setV({ ...v, quote: e.target.value })}
          />
        </Labeled>
        <Labeled label="Display order">
          <Input
            type="number"
            value={v.display_order}
            onChange={(e) => setV({ ...v, display_order: parseInt(e.target.value) || 0 })}
          />
        </Labeled>
        <div className="flex items-end gap-3">
          <Switch
            checked={v.published}
            onCheckedChange={(c) => setV({ ...v, published: Boolean(c) })}
          />
          <Label className="text-sm">Published on homepage</Label>
        </div>
      </div>

      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}
      <div className="mt-6 flex gap-2">
        <Button type="submit" variant="primary" disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{" "}
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4" /> Cancel
        </Button>
      </div>
    </form>
  );
}

function Labeled({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className || ""}`}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
