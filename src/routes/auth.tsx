import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin sign-in — AILO" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="flex min-h-screen flex-col justify-center py-16">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="font-display text-xl font-bold tracking-tight">
            AILO<span className="text-gradient">.</span>
          </Link>
          <h1 className="font-display mt-8 text-3xl font-bold">Admin sign-in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            For internal use only. Public sign-up is disabled.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-8 text-xs text-muted-foreground">
            Need access? Contact your AILO admin to be invited.
          </p>
        </div>
      </Container>
    </div>
  );
}
