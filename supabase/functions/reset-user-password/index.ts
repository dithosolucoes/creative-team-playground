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

    const { email, newPassword } = await req.json();
    
    if (!email || !newPassword) {
      throw new Error("Email and newPassword are required");
    }

    console.log(`[RESET-PASSWORD] Resetting password for: ${email}`);

    // Find user by email
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      throw new Error("User not found");
    }

    // Reset password
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      {
        password: newPassword,
        email_confirm: true
      }
    );

    if (error) {
      console.error(`[RESET-PASSWORD] Error resetting password:`, error);
      throw error;
    }

    console.log(`[RESET-PASSWORD] Password reset successfully for: ${email}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[RESET-PASSWORD] Error:`, errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});