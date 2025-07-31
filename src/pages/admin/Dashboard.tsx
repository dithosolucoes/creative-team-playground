import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package,
  Lightbulb,
  ShoppingCart,
  ArrowUpRight,
  Plus
} from "lucide-react";

const stats = [
  {
    title: "Receita Total",
    value: "R$ 12.450",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Vendas",
    value: "89",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Usuários Ativos",
    value: "1.234",
    change: "+23.1%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Taxa Conversão",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentActivities = [
  { type: "sale", message: "Nova venda: Experiência Mindfulness", time: "2 min atrás" },
  { type: "user", message: "Usuário completou Dia 7", time: "5 min atrás" },
  { type: "product", message: "Produto 'Foco Total' atingiu 100 vendas", time: "1h atrás" },
  { type: "experience", message: "Nova experiência criada", time: "2h atrás" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo da sua plataforma.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Experiência
          </Button>
          <Button className="gap-2 gradient-primary text-white">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card border-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stat.change} vs. mês anterior
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="shadow-card border-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Package className="h-4 w-4 mr-2" />
              Ver Produtos
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Lightbulb className="h-4 w-4 mr-2" />
              Ver Experiências
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Relatório Financeiro
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Análise de Usuários
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-card border-card">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas atualizações da sua plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="shadow-card border-card">
        <CardHeader>
          <CardTitle>Visão Geral de Performance</CardTitle>
          <CardDescription>
            Métricas principais dos últimos 30 dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm">Gráficos serão implementados em breve</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}