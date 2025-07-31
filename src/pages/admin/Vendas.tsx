import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  TrendingUp, 
  Target, 
  Gift, 
  Zap, 
  Users,
  BarChart3,
  ArrowUpRight,
  Percent,
  Clock,
  ChevronRight
} from "lucide-react";

const funnels = [
  {
    id: 1,
    name: "Funil Principal - Transformação",
    products: ["Transformação 24h", "Upsell Premium", "Downsell Light"],
    conversion: 4.2,
    revenue: "R$ 34.567",
    visitors: 2847,
    purchases: 119,
    status: "Ativo"
  },
  {
    id: 2,
    name: "Funil Black Friday",
    products: ["Bundle Completo", "Addon Exclusivo"],
    conversion: 6.8,
    revenue: "R$ 28.940",
    visitors: 1924,
    purchases: 131,
    status: "Pausado"
  }
];

const coupons = [
  {
    id: 1,
    code: "TRANSFORM50",
    discount: "50%",
    type: "percentage",
    uses: 247,
    maxUses: 500,
    revenue: "R$ 12.350",
    expiresAt: "2024-02-15",
    status: "Ativo"
  },
  {
    id: 2,
    code: "WELCOME20",
    discount: "R$ 20",
    type: "fixed",
    uses: 89,
    maxUses: 200,
    revenue: "R$ 4.567",
    expiresAt: "2024-01-31",
    status: "Ativo"
  }
];

const upsells = [
  {
    id: 1,
    name: "Premium Upgrade",
    conversionRate: 23.4,
    revenue: "R$ 8.940",
    shows: 567,
    conversions: 133,
    avgOrderValue: "R$ 67"
  },
  {
    id: 2,
    name: "Consultoria 1:1",
    conversionRate: 8.7,
    revenue: "R$ 15.678",
    shows: 892,
    conversions: 78,
    avgOrderValue: "R$ 201"
  }
];

export default function Vendas() {
  const [activeTab, setActiveTab] = useState("funnels");

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Central de Vendas</h1>
          <p className="text-muted-foreground">
            Sistema avançado de vendas, funis e otimização de conversão
          </p>
        </div>
        <Button className="gap-2 gradient-primary text-white shadow-primary">
          <Plus className="h-4 w-4" />
          Criar Funil
        </Button>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Taxa Conversão Geral</p>
                <p className="text-2xl font-bold text-foreground">4.8%</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.8% vs mês anterior
                </p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Receita Funis</p>
                <p className="text-2xl font-bold text-foreground">R$ 63.507</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +15.2% vs mês anterior
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Cupons Ativos</p>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">336 usos este mês</p>
              </div>
              <Gift className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Upsells</p>
                <p className="text-2xl font-bold text-foreground">16.1%</p>
                <p className="text-sm text-muted-foreground">Taxa conversão média</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="funnels">Funis de Venda</TabsTrigger>
          <TabsTrigger value="coupons">Cupons</TabsTrigger>
          <TabsTrigger value="upsells">Upsells</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Funnels Tab */}
        <TabsContent value="funnels" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Funis de Vendas</h2>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Funil
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {funnels.map((funnel) => (
              <Card key={funnel.id} className="shadow-soft border-soft hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-foreground">{funnel.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {funnel.products.join(" → ")}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={funnel.status === "Ativo" ? "default" : "secondary"}
                      className={funnel.status === "Ativo" ? "bg-success text-white" : ""}
                    >
                      {funnel.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Visitantes</p>
                      <p className="text-xl font-bold text-foreground">{funnel.visitors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conversões</p>
                      <p className="text-xl font-bold text-foreground">{funnel.purchases}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Taxa Conversão</p>
                      <p className="text-xl font-bold text-primary">{funnel.conversion}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Receita</p>
                      <p className="text-xl font-bold text-success">{funnel.revenue}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Ver Analytics</Button>
                    <Button variant="outline" size="sm" className="flex-1">Editar</Button>
                    <Button variant="outline" size="sm" className="flex-1">Duplicar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Coupons Tab */}
        <TabsContent value="coupons" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Cupons de Desconto</h2>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Cupom
            </Button>
          </div>

          <div className="grid gap-6">
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="shadow-soft border-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Gift className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{coupon.code}</h3>
                        <p className="text-muted-foreground">Desconto de {coupon.discount}</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-success text-white">
                      {coupon.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Usos</p>
                      <p className="text-xl font-bold text-foreground">{coupon.uses}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Limite</p>
                      <p className="text-xl font-bold text-foreground">{coupon.maxUses}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Receita</p>
                      <p className="text-xl font-bold text-foreground">{coupon.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expira em</p>
                      <p className="text-xl font-bold text-foreground">
                        {new Date(coupon.expiresAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso de uso</span>
                      <span className="text-foreground">{coupon.uses}/{coupon.maxUses}</span>
                    </div>
                    <Progress value={(coupon.uses / coupon.maxUses) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Upsells Tab */}
        <TabsContent value="upsells" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Upsells & Order Bumps</h2>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Upsell
            </Button>
          </div>

          <div className="grid gap-6">
            {upsells.map((upsell) => (
              <Card key={upsell.id} className="shadow-soft border-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{upsell.name}</h3>
                        <p className="text-muted-foreground">Oferta adicional pós-compra</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{upsell.conversionRate}%</p>
                      <p className="text-sm text-muted-foreground">Taxa de conversão</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Exibições</p>
                      <p className="text-xl font-bold text-foreground">{upsell.shows}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conversões</p>
                      <p className="text-xl font-bold text-foreground">{upsell.conversions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Receita</p>
                      <p className="text-xl font-bold text-foreground">{upsell.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Médio</p>
                      <p className="text-xl font-bold text-foreground">{upsell.avgOrderValue}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" size="sm">Editar Oferta</Button>
                    <Button variant="outline" size="sm">Ver Performance</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Analytics de Vendas</h2>
          <Card className="shadow-soft border-soft">
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Analytics Avançado
              </h3>
              <p className="text-muted-foreground mb-6">
                Gráficos detalhados de performance de vendas seriam renderizados aqui
              </p>
              <Button className="gap-2 gradient-primary text-white">
                <BarChart3 className="h-4 w-4" />
                Ver Relatório Completo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}