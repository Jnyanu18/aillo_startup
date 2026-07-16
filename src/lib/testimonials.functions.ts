import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

const testimonialSchema = z.object({
  stat: z.string().trim().min(1).max(40),
  description: z.string().trim().min(1).max(500),
  quote: z.string().trim().min(1).max(500),
  attribution: z.string().trim().min(1).max(200),
  display_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const listPublishedTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    },
  );
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, stat, description, quote, attribution, display_order")
    .eq("published", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data;
});

export const listAllTestimonials = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  });

export const createTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => testimonialSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("testimonials").insert(data);
    if (error) throw error;
    return { ok: true as const };
  });

export const updateTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid() }).merge(testimonialSchema.partial()).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { id, ...rest } = data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("testimonials").update(rest).eq("id", id);
    if (error) throw error;
    return { ok: true as const };
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });
