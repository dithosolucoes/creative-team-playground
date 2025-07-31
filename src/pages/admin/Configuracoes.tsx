import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Globe, 
  CreditCard, 
  Mail, 
  Bell,
  Palette,
  Shield,
  Save
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Configure domínio, APIs e preferências da plataforma
          </p>
        </div>
      </div>

      <Tabs defaultValue="dominio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="dominio">Domínio</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>

        {/* Domínio Tab */}
        <TabsContent value="dominio">
          <Card className="shadow-card border-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Configuração de Domínio
              </CardTitle>
              <CardDescription>
                Configure seu domínio personalizado para a plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dominio">Domínio Personalizado</Label>
                <Input
                  id="dominio"
                  placeholder="meudominio.com"
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground">
                  Seu domínio atual: proposito24h.lovable.app
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subdominio">Subdomínio</Label>
                <Input
                  id="subdominio"
                  placeholder="app"
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground">
                  Exemplo: app.meudominio.com
                </p>
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* APIs Tab */}
        <TabsContent value="apis">
          <div className="space-y-6">
            <Card className="shadow-card border-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Stripe (Pagamentos)
                </CardTitle>
                <CardDescription>
                  Configure suas chaves do Stripe para processar pagamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-public">Chave Pública</Label>
                  <Input
                    id="stripe-public"
                    placeholder="pk_test_..."
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret">Chave Secreta</Label>
                  <Input
                    id="stripe-secret"
                    placeholder="sk_test_..."
                    type="password"
                  />
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Stripe
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card border-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email (SMTP)
                </CardTitle>
                <CardDescription>
                  Configure seu provedor de email para notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">Host SMTP</Label>
                    <Input
                      id="smtp-host"
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Porta</Label>
                    <Input
                      id="smtp-port"
                      placeholder="587"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">Usuário</Label>
                  <Input
                    id="smtp-user"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Senha</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <Card className="shadow-card border-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Templates de Experiência
              </CardTitle>
              <CardDescription>
                3 templates base para criar experiências
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Palette className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Template Mindfulness</CardTitle>
                    <CardDescription>
                      Para experiências de bem-estar e meditação
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Personalizar
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Template Produtividade</CardTitle>
                    <CardDescription>
                      Para experiências de foco e performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Personalizar
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Template Motivacional</CardTitle>
                    <CardDescription>
                      Para experiências de autoconfiança
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Personalizar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações Tab */}
        <TabsContent value="notificacoes">
          <Card className="shadow-card border-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Configurações de Notificação
              </CardTitle>
              <CardDescription>
                Configure push notifications e emails automáticos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Lembretes para usuários sobre experiências
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Email Marketing</h4>
                    <p className="text-sm text-muted-foreground">
                      Campanhas automáticas de email
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Relatórios por Email</h4>
                    <p className="text-sm text-muted-foreground">
                      Relatórios semanais automatizados
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}