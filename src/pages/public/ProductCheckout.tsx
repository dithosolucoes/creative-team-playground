import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Shield, 
  CheckCircle,
  Lock,
  ArrowLeft,
  Smartphone,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function ProductCheckout() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [product, setProduct] = useState<any>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .eq("is_active", true)
          .single();

        if (error || !data) {
          toast({
            title: "Produto não encontrado",
            description: "O produto solicitado não existe ou não está disponível.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar produto.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [slug, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Create user account first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: formData.name,
            cpf: formData.cpf,
            phone: formData.phone,
          }
        }
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          // Try to sign in instead
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
          
          if (signInError) {
            throw new Error("Usuário já existe. Verifique sua senha ou use a opção 'Esqueci minha senha'.");
          }
        } else {
          throw authError;
        }
      }

      // Create or update profile
      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            user_id: authData.user.id,
            email: formData.email,
            name: formData.name,
            cpf: formData.cpf,
            phone: formData.phone,
          }, { onConflict: "user_id" });

        if (profileError) {
          console.error("Profile creation error:", profileError);
        }
      }

      // Create checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          productSlug: slug,
          userData: {
            email: formData.email,
            name: formData.name,
            cpf: formData.cpf,
            phone: formData.phone,
          }
        }
      });

      if (checkoutError || !checkoutData?.url) {
        throw new Error(checkoutError?.message || "Erro ao criar sessão de pagamento");
      }

      // Redirect to Stripe checkout
      window.location.href = checkoutData.url;

    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Erro no checkout",
        description: error.message || "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      {/* Header */}
      <div className="container mx-auto max-w-4xl mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/produto/${slug}`)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Finalizar Compra</h1>
          <p className="text-muted-foreground">Complete seus dados para acessar o conteúdo</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleInputChange}
                        required
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  {/* Account Creation */}
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Criar Conta no App
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Esta senha será usada para acessar seu conteúdo no app
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">Senha *</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          placeholder="Mínimo 6 caracteres"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          placeholder="Confirme sua senha"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Info */}
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Formas de Pagamento Disponíveis
                    </h3>
                    
                    <div className="grid gap-3">
                      <Card className="border-primary bg-primary/5">
                        <CardContent className="p-4 flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">Cartão de Crédito</p>
                            <p className="text-sm text-muted-foreground">Aprovação imediata</p>
                          </div>
                          <Badge variant="secondary">Disponível</Badge>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-primary bg-primary/5">
                        <CardContent className="p-4 flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">PIX</p>
                            <p className="text-sm text-muted-foreground">Aprovação em até 2h</p>
                          </div>
                          <Badge variant="secondary">Disponível</Badge>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="text-xs text-center text-muted-foreground space-y-1 bg-blue-50 p-3 rounded-lg">
                      <p>✅ Pagamento com <strong>PIX</strong> ou <strong>Cartão</strong></p>
                      <p>✅ Ambiente 100% seguro (Stripe)</p>
                      <p>✅ Aprovação instantânea</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6"
                    disabled={loading}
                  >
                    {loading ? "Criando conta..." : "Ir para Pagamento"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft border-soft sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Preço:</span>
                  <span className="text-primary">
                    R$ {(product.price / 100).toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">✨ Experiência Transformadora:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <Star className="w-3 h-3 mr-2 text-yellow-500 fill-current" />
                      21 dias de conteúdo exclusivo
                    </li>
                    <li className="flex items-center">
                      <Star className="w-3 h-3 mr-2 text-yellow-500 fill-current" />
                      Acesso vitalício ao app
                    </li>
                    <li className="flex items-center">
                      <Star className="w-3 h-3 mr-2 text-yellow-500 fill-current" />
                      Acompanhamento de progresso
                    </li>
                    <li className="flex items-center">
                      <Star className="w-3 h-3 mr-2 text-yellow-500 fill-current" />
                      Certificado de conclusão
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Guarantees */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">Acesso vitalício</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">Pagamento 100% seguro</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}