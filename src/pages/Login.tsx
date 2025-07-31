import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulated login - replace with real auth later
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Propósito24h",
      });
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulated registration - replace with real auth later
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conta criada com sucesso!",
        description: "Agora você pode fazer login",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/10 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">24h</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Propósito24h</h1>
          <p className="text-muted-foreground text-sm">
            Transforme sua vida em 24 horas com experiências únicas
          </p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold text-center text-card-foreground">
              Bem-vindo
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Entre na sua conta ou crie uma nova
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="login" className="text-sm font-medium">
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="register" className="text-sm font-medium">
                  Criar Conta
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="h-11 bg-input/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">
                      Senha
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="h-11 bg-input/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-muted-foreground">Lembrar de mim</span>
                    </label>
                    <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                      Esqueci a senha
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-sm font-medium">
                      Nome Completo
                    </Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Seu nome completo"
                      required
                      className="h-11 bg-input/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="h-11 bg-input/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">
                      Senha
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="h-11 bg-input/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm" className="text-sm font-medium">
                      Confirmar Senha
                    </Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="h-11 bg-input/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <input type="checkbox" className="rounded mt-1" required />
                    <span className="text-muted-foreground leading-5">
                      Aceito os{" "}
                      <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                        termos de uso
                      </button>{" "}
                      e{" "}
                      <button type="button" className="text-primary hover:text-primary/80 transition-colors">
                        política de privacidade
                      </button>
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 Propósito24h. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;