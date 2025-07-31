import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const sessionId = searchParams.get("session_id");
  const productSlug = searchParams.get("product");

  useEffect(() => {
    const processPayment = async () => {
      if (!sessionId || !productSlug) {
        toast({
          title: "Erro",
          description: "Dados de pagamento inválidos.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      try {
        // Get current user session
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.log("No authenticated user found, that's normal for new purchases");
        }

        // Fetch product details
        const { data: product, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("slug", productSlug)
          .eq("is_active", true)
          .single();

        if (productError || !product) {
          throw new Error("Produto não encontrado");
        }

        // Register purchase (only if user is authenticated)
        if (user) {
          const { error: purchaseError } = await supabase
            .from("purchases")
            .insert({
              user_id: user.id,
              product_id: product.id,
              stripe_payment_id: sessionId,
              amount: product.price,
              status: "completed",
            });

          if (purchaseError) {
            console.error("Purchase registration error:", purchaseError);
            // Don't throw error here, payment was successful
          }
        }

        setIsSuccess(true);
        
        toast({
          title: "Pagamento confirmado! 🎉",
          description: "Bem-vindo(a) à sua jornada de transformação!",
        });

        // Auto redirect after 3 seconds
        setTimeout(() => {
          if (user) {
            navigate("/app");
          } else {
            // If no user session, redirect to login with success message
            navigate("/login", { 
              state: { 
                message: "Pagamento confirmado! Faça login para acessar seu conteúdo.",
                email: searchParams.get("email") 
              }
            });
          }
        }, 3000);

      } catch (error: any) {
        console.error("Payment processing error:", error);
        toast({
          title: "Erro ao processar pagamento",
          description: error.message || "Entre em contato com o suporte.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [sessionId, productSlug, navigate, toast, searchParams]);

  const handleContinue = () => {
    navigate("/app");
  };

  const handleLogin = () => {
    navigate("/login", { 
      state: { 
        message: "Faça login para acessar seu conteúdo adquirido.",
        email: searchParams.get("email") 
      }
    });
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
              <h1 className="text-xl font-semibold">Processando pagamento...</h1>
              <p className="text-muted-foreground">
                Aguarde enquanto confirmamos sua compra.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">❌</span>
              </div>
              <h1 className="text-xl font-semibold">Erro no pagamento</h1>
              <p className="text-muted-foreground">
                Houve um problema ao processar seu pagamento.
              </p>
              <Button onClick={() => navigate("/")} variant="outline">
                Voltar ao início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700">
            Pagamento Confirmado! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <Badge variant="secondary" className="text-green-700 bg-green-100">
              Compra realizada com sucesso
            </Badge>
            <p className="text-muted-foreground">
              Sua jornada de transformação espiritual começa agora!
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-blue-900">🚀 Próximos passos:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ Acesse seu app exclusivo</li>
              <li>✅ Comece sua jornada de 21 dias</li>
              <li>✅ Acompanhe seu progresso diário</li>
              <li>✅ Transforme sua vida espiritual</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Acessar Meu App
            </Button>
            
            <Button 
              onClick={handleLogin}
              variant="outline"
              className="w-full"
            >
              Fazer Login
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Redirecionamento automático em 3 segundos...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;