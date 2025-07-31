import React, { useState } from "react";
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
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductCheckout() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);

  const product = {
    title: "Transformação em 21 Dias",
    price: 97,
    originalPrice: 197,
    description: "Experiência devocional completa"
  };

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
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Pagamento aprovado!",
        description: "Bem-vindo à sua jornada de transformação",
      });
      
      // Store user data in localStorage (mock authentication)
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        product: product.title,
        purchaseDate: new Date().toISOString()
      }));
      
      // Redirect to app
      navigate('/app');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      {/* Header */}
      <div className="container mx-auto max-w-4xl mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
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

                  {/* Payment Method */}
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Forma de Pagamento
                    </h3>
                    
                    <div className="grid gap-3">
                      <Card className="border-primary bg-primary/5 cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">Cartão de Crédito</p>
                            <p className="text-sm text-muted-foreground">Aprovação imediata</p>
                          </div>
                          <Badge variant="secondary">Recomendado</Badge>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-muted cursor-pointer opacity-75">
                        <CardContent className="p-4 flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium text-muted-foreground">PIX</p>
                            <p className="text-sm text-muted-foreground">Aprovação em até 2h</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full text-lg py-6"
                    disabled={loading}
                  >
                    {loading ? "Processando..." : `Finalizar Compra - R$ ${product.price}`}
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

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valor original:</span>
                    <span className="line-through text-muted-foreground">R$ {product.originalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Desconto:</span>
                    <span className="text-success">-R$ {product.originalPrice - product.price}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">R$ {product.price}</span>
                  </div>
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