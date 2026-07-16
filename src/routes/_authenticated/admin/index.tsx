import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/ui/container";
import { AdminShell } from "@/components/admin-shell";
import { ArrowRight, Quote } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Admin — AILO" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminHome,
});

function AdminHome() {
  return (
    <AdminShell>
      <Container>
        <h1 className="font-display text-3xl font-bold">Welcome back.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pick a workspace to manage.</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link
            to="/admin/testimonials"
            className="group rounded-xl border border-border bg-surface/60 p-8 transition-colors hover:bg-surface"
          >
            <Quote className="h-6 w-6 text-foreground/80" />
            <h2 className="font-display mt-4 text-xl font-semibold">Testimonials</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage the success stories shown on the homepage.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-gradient">
              Open <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </Container>
    </AdminShell>
  );
}
