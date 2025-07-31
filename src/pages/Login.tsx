import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Propósito24h",
      });
    }, 1200);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conta criada com sucesso!",
        description: "Agora você pode fazer login",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-4">
          <div className="relative mx-auto w-12 h-12 mb-3">
            <div className="absolute inset-0 gradient-primary rounded-xl shadow-md"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">24h</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Propósito24h</h1>
          <p className="text-muted-foreground text-xs max-w-xs mx-auto">
            Transforme sua vida em 24 horas
          </p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-card border-2 border-black bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-xl font-bold text-center text-card-foreground">
              Bem-vindo
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground text-sm">
              Entre na sua conta ou crie uma nova
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50 p-1 h-9">
                <TabsTrigger 
                  value="login" 
                  className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-button"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-button"
                >
                  Criar Conta
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-xs font-semibold text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="pl-9 h-9 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-xs font-semibold text-foreground">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="pl-9 pr-9 h-9 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary w-3 h-3" />
                      <span className="text-muted-foreground">Lembrar</span>
                    </label>
                    <button type="button" className="text-primary hover:text-primary/80 transition-colors font-medium">
                      Esqueci a senha
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-9 gradient-primary hover:opacity-90 text-white font-semibold transition-all duration-200 shadow-button hover:shadow-lg text-xs"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-xs font-semibold text-foreground">
                      Nome
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Seu nome"
                        required
                        className="pl-9 h-9 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-xs font-semibold text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="pl-9 h-9 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-xs font-semibold text-foreground">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="pl-9 pr-9 h-9 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm" className="text-xs font-semibold text-foreground">
                      Confirmar
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
                      <Input
                        id="register-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="pl-9 pr-9 h-9 bg-input border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 text-xs">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary w-3 h-3 mt-1" required />
                    <div className="text-muted-foreground leading-4">
                      <span>Aceito os </span>
                      <button type="button" className="text-primary hover:text-primary/80 transition-colors font-medium">
                        termos
                      </button>
                      <span> e </span>
                      <button type="button" className="text-primary hover:text-primary/80 transition-colors font-medium">
                        privacidade
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-9 gradient-primary hover:opacity-90 text-white font-semibold transition-all duration-200 shadow-button hover:shadow-lg text-xs"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground mt-3">
          <p>© 2024 Propósito24h. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;