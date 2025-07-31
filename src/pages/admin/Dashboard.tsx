import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package, 
  Eye, 
  ShoppingCart, 
  Star,
  Calendar,
  ArrowUp,
  ArrowDown,
  Plus
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das suas métricas e performance
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Últimos 30 dias
          </Button>
          <Button className="gap-2 gradient-primary text-white">
            <Plus className="h-4 w-4" />
            Nova Experiência
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <Card className="shadow-soft border-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 24.847</div>
            <div className="flex items-center text-sm">
              <ArrowUp className="h-3 w-3 text-success mr-1" />
              <span className="text-success">+12.5%</span>
              <span className="text-muted-foreground ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        {/* Users */}
        <Card className="shadow-soft border-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.247</div>
            <div className="flex items-center text-sm">
              <ArrowUp className="h-3 w-3 text-success mr-1" />
              <span className="text-success">+8.2%</span>
              <span className="text-muted-foreground ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        {/* Conversions */}
        <Card className="shadow-soft border-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Conversão
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3.8%</div>
            <div className="flex items-center text-sm">
              <ArrowDown className="h-3 w-3 text-destructive mr-1" />
              <span className="text-destructive">-2.1%</span>
              <span className="text-muted-foreground ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <Card className="shadow-soft border-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Experiências Ativas
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="flex items-center text-sm">
              <ArrowUp className="h-3 w-3 text-success mr-1" />
              <span className="text-success">+2</span>
              <span className="text-muted-foreground ml-1">este mês</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="shadow-soft border-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Receita por Dia</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p>Gráfico de receita seria renderizado aqui</p>
                <p className="text-sm">Integração com biblioteca de gráficos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Experiences */}
        <Card className="shadow-soft border-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Top Experiências</CardTitle>
            <CardDescription>Mais vendidas este mês</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Transformação 24h", sales: 247, revenue: "R$ 12.350", change: "+15%" },
              { name: "Foco Total", sales: 189, revenue: "R$ 9.450", change: "+8%" },
              { name: "Energia Renovada", sales: 156, revenue: "R$ 7.800", change: "+12%" },
              { name: "Mindset Vencedor", sales: 134, revenue: "R$ 6.700", change: "+5%" },
            ].map((exp, index) => (
              <div key={exp.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{exp.name}</p>
                    <p className="text-sm text-muted-foreground">{exp.sales} vendas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{exp.revenue}</p>
                  <Badge variant="secondary" className="text-success">
                    {exp.change}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="shadow-soft border-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Atividades Recentes</CardTitle>
          <CardDescription>Últimas ações na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { icon: ShoppingCart, text: "Nova venda: Transformação 24h", time: "2 min atrás", type: "sale" },
              { icon: Users, text: "Novo usuário cadastrado", time: "15 min atrás", type: "user" },
              { icon: Package, text: "Experiência 'Foco Total' atualizada", time: "1 hora atrás", type: "update" },
              { icon: Star, text: "Nova avaliação 5 estrelas recebida", time: "2 horas atrás", type: "review" },
              { icon: Eye, text: "Pico de visualizações na landing", time: "3 horas atrás", type: "view" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'sale' ? 'bg-success/10 text-success' :
                  activity.type === 'user' ? 'bg-primary/10 text-primary' :
                  activity.type === 'update' ? 'bg-warning/10 text-warning' :
                  activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-muted text-muted-foreground'
                }`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">{activity.text}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}