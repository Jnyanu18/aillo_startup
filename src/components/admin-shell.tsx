import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const navItem = (to: string, label: string) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
          active ? "bg-surface text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-lg font-bold">
              AILO<span className="text-gradient">.</span>
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Admin
            </span>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {navItem("/admin", "Overview")}
            {navItem("/admin/testimonials", "Testimonials")}
          </nav>
          <Button variant="outline" size="sm" onClick={signOut}>
            Sign out
          </Button>
        </Container>
      </header>
      <main className="py-10">{children}</main>
    </div>
  );
}
