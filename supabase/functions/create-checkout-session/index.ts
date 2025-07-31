import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Create Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { productSlug, userData } = await req.json();
    logStep("Request data received", { productSlug, userData: { email: userData?.email } });

    if (!productSlug) throw new Error("Product slug is required");
    if (!userData?.email) throw new Error("User data with email is required");

    // Fetch product from database
    const { data: product, error: productError } = await supabaseClient
      .from("products")
      .select("*")
      .eq("slug", productSlug)
      .eq("is_active", true)
      .single();

    if (productError || !product) {
      logStep("Product not found", { productSlug, error: productError });
      throw new Error("Product not found");
    }

    logStep("Product found", { productId: product.id, title: product.title, price: product.price });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: userData.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      logStep("No existing customer found");
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    // Create checkout session with PIX + Card support
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : userData.email,
      line_items: [
        {
          price_data: {
            currency: "brl", // Required for PIX
            product_data: { 
              name: product.title,
              description: product.description || undefined,
            },
            unit_amount: product.price, // Already in centavos
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card"], // Temporarily only card - reactivate PIX after enabling in Stripe Dashboard
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&product=${productSlug}`,
      cancel_url: `${origin}/checkout/${productSlug}`,
      metadata: {
        product_id: product.id,
        product_slug: productSlug,
        user_email: userData.email,
        user_name: userData.name || "",
        user_cpf: userData.cpf || "",
        user_phone: userData.phone || "",
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout-session", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});