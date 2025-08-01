import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { email } = await req.json();
    
    if (!email) {
      throw new Error("Email is required");
    }

    console.log(`[CONFIRM-EMAIL] Confirming email for: ${email}`);

    // Manually confirm the user's email
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      // First, we need to find the user by email
      (await supabaseAdmin.auth.admin.listUsers()).data.users.find(u => u.email === email)?.id || "",
      {
        email_confirm: true
      }
    );

    if (error) {
      console.error(`[CONFIRM-EMAIL] Error confirming email:`, error);
      throw error;
    }

    console.log(`[CONFIRM-EMAIL] Email confirmed successfully for: ${email}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[CONFIRM-EMAIL] Error:`, errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});