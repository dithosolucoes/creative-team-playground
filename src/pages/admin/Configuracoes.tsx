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
import { useSettings } from "@/hooks/useSettings";
import { 
  Globe, 
  Bell, 
  Shield, 
  CreditCard, 
  Mail, 
  Smartphone,
  Settings,
  Save,
  Database,
  Loader2
} from "lucide-react";

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("general");
  const { settings, loading, saveSettings, updateSetting } = useSettings();

  const handleSave = () => {
    saveSettings(settings);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
        <Button onClick={handleSave} className="gap-2 gradient-primary text-white">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="domain">Domínio</TabsTrigger>
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
                    value={settings.general.businessName}
                    onChange={(e) => updateSetting('general', 'businessName', e.target.value)}
                    className="border-soft focus:border-primary"
                    placeholder="Nome do seu negócio"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">E-mail do Administrador</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    value={settings.general.adminEmail}
                    onChange={(e) => updateSetting('general', 'adminEmail', e.target.value)}
                    className="border-soft focus:border-primary"
                    placeholder="admin@exemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-description">Descrição do Negócio</Label>
                <Textarea 
                  id="business-description" 
                  value={settings.general.description}
                  onChange={(e) => updateSetting('general', 'description', e.target.value)}
                  placeholder="Descreva seu negócio e propósito..."
                  className="border-soft focus:border-primary"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select 
                    value={settings.general.timezone}
                    onValueChange={(value) => updateSetting('general', 'timezone', value)}
                  >
                    <SelectTrigger className="border-soft focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">America/São_Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Select 
                    value={settings.general.currency}
                    onValueChange={(value) => updateSetting('general', 'currency', value)}
                  >
                    <SelectTrigger className="border-soft focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                      <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
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
                      value={settings.domain.customDomain}
                      onChange={(e) => updateSetting('domain', 'customDomain', e.target.value)}
                      placeholder="proposito24h.com.br"
                      className="border-soft focus:border-primary"
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-medium text-foreground mb-2">Instruções de DNS</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>1. Adicione um registro A no seu provedor DNS:</p>
                      <p>Nome: @ (para domínio raiz)</p>
                      <p>Valor: 185.158.133.1</p>
                      <p>2. Para www, adicione outro registro A:</p>
                      <p>Nome: www</p>
                      <p>Valor: 185.158.133.1</p>
                      <p>3. Aguarde a propagação (até 48 horas)</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Globe className="h-4 w-4" />
                      Verificar DNS
                    </Button>
                    {settings.domain.isVerified && (
                      <Badge className="bg-success text-white">Verificado</Badge>
                    )}
                  </div>
                </div>
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
                      value={settings.integrations.stripePublishableKey}
                      onChange={(e) => updateSetting('integrations', 'stripePublishableKey', e.target.value)}
                      placeholder="pk_test_..."
                      className="border-soft focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret">Chave Secreta</Label>
                    <Input 
                      id="stripe-secret" 
                      type="password"
                      value={settings.integrations.stripeSecretKey}
                      onChange={(e) => updateSetting('integrations', 'stripeSecretKey', e.target.value)}
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
                  <Select 
                    value={settings.integrations.emailProvider}
                    onValueChange={(value) => updateSetting('integrations', 'emailProvider', value)}
                  >
                    <SelectTrigger className="border-soft focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-api">API Key</Label>
                  <Input 
                    id="email-api" 
                    type="password"
                    value={settings.integrations.emailApiKey}
                    onChange={(e) => updateSetting('integrations', 'emailApiKey', e.target.value)}
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
                  <Label htmlFor="push-provider">Provedor</Label>
                  <Select 
                    value={settings.integrations.pushProvider}
                    onValueChange={(value) => updateSetting('integrations', 'pushProvider', value)}
                  >
                    <SelectTrigger className="border-soft focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onesignal">OneSignal</SelectItem>
                      <SelectItem value="firebase">Firebase</SelectItem>
                      <SelectItem value="pusher">Pusher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="push-api">API Key</Label>
                  <Input 
                    id="push-api" 
                    type="password"
                    value={settings.integrations.pushApiKey}
                    onChange={(e) => updateSetting('integrations', 'pushApiKey', e.target.value)}
                    placeholder="Chave de API do provedor..."
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
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notificações Push</p>
                    <p className="text-sm text-muted-foreground">Receber notificações push no mobile</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notificações de Vendas</p>
                    <p className="text-sm text-muted-foreground">Alertas sobre novas vendas e transações</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.salesNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'salesNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notificações de Marketing</p>
                    <p className="text-sm text-muted-foreground">Dicas e atualizações da plataforma</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.marketingNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'marketingNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6">
            {/* Password Change */}
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Alterar Senha
                </CardTitle>
                <CardDescription>
                  Mantenha sua conta segura com uma senha forte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <Button className="gap-2">
                  <Shield className="h-4 w-4" />
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>

            {/* Session Management */}
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Sessões Ativas</CardTitle>
                <CardDescription>
                  Gerencie onde você está logado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">Chrome - Windows</p>
                      <p className="text-sm text-muted-foreground">São Paulo, Brasil - Agora</p>
                    </div>
                    <Badge variant="outline">Atual</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Encerrar Todas as Outras Sessões
                </Button>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Dados da Conta
                </CardTitle>
                <CardDescription>
                  Backup e exportação dos seus dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Faça backup dos seus dados ou exporte informações da conta
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Database className="h-4 w-4" />
                    Fazer Backup
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Exportar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}