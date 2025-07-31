import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Palette, 
  Bell, 
  Shield, 
  CreditCard, 
  Mail, 
  Smartphone,
  Settings,
  Save,
  Eye,
  Code,
  Database
} from "lucide-react";

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sales: true,
    marketing: false
  });

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua conta e sistema
          </p>
        </div>
        <Button className="gap-2 gradient-primary text-white">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="domain">Domínio</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="integrations">APIs</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Informações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nome do Negócio</Label>
                  <Input 
                    id="business-name" 
                    defaultValue="Propósito 24h" 
                    className="border-soft focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">E-mail do Administrador</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    defaultValue="admin@proposito24h.com"
                    className="border-soft focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-description">Descrição do Negócio</Label>
                <Textarea 
                  id="business-description" 
                  placeholder="Descreva seu negócio e propósito..."
                  className="border-soft focus:border-primary"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select defaultValue="america-sao_paulo">
                    <SelectTrigger className="border-soft focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-sao_paulo">America/São_Paulo (GMT-3)</SelectItem>
                      <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Select defaultValue="brl">
                    <SelectTrigger className="border-soft focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                      <SelectItem value="usd">Dólar Americano ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Domain Tab */}
        <TabsContent value="domain" className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configuração de Domínio
              </CardTitle>
              <CardDescription>
                Configure seu domínio personalizado para as experiências
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <h3 className="font-medium text-foreground mb-2">Domínio Atual</h3>
                  <p className="text-muted-foreground">proposito24h.lovable.app</p>
                  <Badge className="mt-2 bg-success text-white">Ativo</Badge>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Domínio Personalizado</h3>
                  <div className="space-y-2">
                    <Label htmlFor="custom-domain">Seu Domínio</Label>
                    <Input 
                      id="custom-domain" 
                      placeholder="proposito24h.com.br"
                      className="border-soft focus:border-primary"
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-medium text-foreground mb-2">Instruções de DNS</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>1. Adicione um registro CNAME no seu provedor DNS:</p>
                      <p>Nome: @ ou www</p>
                      <p>Valor: proxy.lovable.app</p>
                      <p>2. Aguarde a propagação (até 24 horas)</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Verificar Configuração
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Templates de Experiência
              </CardTitle>
              <CardDescription>
                Gerencie os 3 templates base para criação de experiências
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Template 1 - Mindfulness */}
                <Card className="border-soft">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-primary font-medium">Mindfulness</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Template Mindfulness</h3>
                        <p className="text-sm text-muted-foreground">Para experiências de bem-estar e meditação</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Template 2 - Produtividade */}
                <Card className="border-soft">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center">
                        <span className="text-success font-medium">Produtividade</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Template Produtividade</h3>
                        <p className="text-sm text-muted-foreground">Para experiências de foco e eficiência</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Template 3 - Bem-estar */}
                <Card className="border-soft">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="aspect-video bg-gradient-to-br from-orange-50 to-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-warning font-medium">Bem-estar</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Template Bem-estar</h3>
                        <p className="text-sm text-muted-foreground">Para experiências de saúde e vitalidade</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid gap-6">
            {/* Stripe */}
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Stripe - Pagamentos
                </CardTitle>
                <CardDescription>
                  Configure sua conta Stripe para processar pagamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripe-public">Chave Pública</Label>
                    <Input 
                      id="stripe-public" 
                      placeholder="pk_test_..."
                      className="border-soft focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret">Chave Secreta</Label>
                    <Input 
                      id="stripe-secret" 
                      type="password"
                      placeholder="sk_test_..."
                      className="border-soft focus:border-primary"
                    />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Testar Conexão
                </Button>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  E-mail Marketing
                </CardTitle>
                <CardDescription>
                  Configure o provedor de e-mail para automações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-provider">Provedor</Label>
                  <Select defaultValue="mailchimp">
                    <SelectTrigger className="border-soft focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-api">API Key</Label>
                  <Input 
                    id="email-api" 
                    type="password"
                    placeholder="Sua chave de API..."
                    className="border-soft focus:border-primary"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Push Notifications
                </CardTitle>
                <CardDescription>
                  Configure notificações push para usuários mobile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firebase-key">Firebase Server Key</Label>
                  <Input 
                    id="firebase-key" 
                    type="password"
                    placeholder="Chave do servidor Firebase..."
                    className="border-soft focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vapid-key">VAPID Key</Label>
                  <Input 
                    id="vapid-key" 
                    placeholder="Chave VAPID..."
                    className="border-soft focus:border-primary"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure quando e como receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notificações por E-mail</p>
                    <p className="text-sm text-muted-foreground">Receber notificações importantes por e-mail</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Notificações no navegador e mobile</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Alertas de Vendas</p>
                    <p className="text-sm text-muted-foreground">Notificar sobre novas vendas e transações</p>
                  </div>
                  <Switch 
                    checked={notifications.sales}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sales: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Marketing</p>
                    <p className="text-sm text-muted-foreground">Dicas, atualizações e novidades da plataforma</p>
                  </div>
                  <Switch 
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança da Conta
              </CardTitle>
              <CardDescription>
                Gerencie a segurança e acesso da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Alterar Senha</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input 
                        id="current-password" 
                        type="password"
                        className="border-soft focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input 
                        id="new-password" 
                        type="password"
                        className="border-soft focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                      <Input 
                        id="confirm-password" 
                        type="password"
                        className="border-soft focus:border-primary"
                      />
                    </div>
                    <Button variant="outline" className="w-fit">
                      Alterar Senha
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-foreground mb-2">Sessões Ativas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">Desktop - Chrome</p>
                        <p className="text-sm text-muted-foreground">São Paulo, Brasil • Ativo agora</p>
                      </div>
                      <Badge variant="outline">Atual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">Mobile - Safari</p>
                        <p className="text-sm text-muted-foreground">São Paulo, Brasil • 2 horas atrás</p>
                      </div>
                      <Button variant="outline" size="sm">Revogar</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-foreground mb-2">Backup de Dados</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Faça backup dos seus dados regularmente
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                      <Database className="h-4 w-4" />
                      Baixar Backup
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Configurar Backup Automático
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}