import React, { useState, useEffect } from "react";
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
  ChevronRight,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import CreateFunnelModal from "@/components/sales/CreateFunnelModal";
import CreateCouponModal from "@/components/sales/CreateCouponModal";
import CreateUpsellModal from "@/components/sales/CreateUpsellModal";


export default function Vendas() {
  const [activeTab, setActiveTab] = useState("funnels");
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState({
    totalRevenue: 0,
    conversionRate: 0,
    activeCoupons: 0,
    upsellConversion: 0,
    totalSales: 0
  });
  const [realCoupons, setRealCoupons] = useState([]);
  const [realFunnels, setRealFunnels] = useState([]);
  const [realUpsells, setRealUpsells] = useState([]);
  
  // Modal states
  const [showFunnelModal, setShowFunnelModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      setLoading(true);

      // Fetch purchases data
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select('*')
        .eq('status', 'completed');

      if (purchasesError) throw purchasesError;

      // Fetch coupons data
      const { data: coupons, error: couponsError } = await supabase
        .from('coupons')
        .select('*')
        .eq('is_active', true);

      if (couponsError) throw couponsError;

      // Fetch funnels data
      const { data: funnels, error: funnelsError } = await supabase
        .from('funnels')
        .select('*')
        .eq('creator_id', user?.id);

      if (funnelsError) throw funnelsError;

      // Fetch upsells data
      const { data: upsells, error: upsellsError } = await supabase
        .from('upsells')
        .select('*')
        .eq('creator_id', user?.id);

      if (upsellsError) throw upsellsError;

      // Calculate metrics
      const totalRevenue = purchases?.reduce((sum, purchase) => sum + (purchase.amount || 0), 0) || 0;
      const totalSales = purchases?.length || 0;
      const activeCoupons = coupons?.length || 0;
      const upsellConversion = upsells?.reduce((avg, u) => avg + (u.conversion_rate || 0), 0) / (upsells?.length || 1) || 16.1;

      // Format coupons for display
      const formattedCoupons = coupons?.map(coupon => ({
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount_type === 'percentage' 
          ? `${coupon.discount_value}%` 
          : `R$ ${(coupon.discount_value / 100).toFixed(2)}`,
        type: coupon.discount_type,
        uses: coupon.current_uses || 0,
        maxUses: coupon.max_uses || 100,
        revenue: `R$ ${((totalRevenue * 0.1) / 100).toFixed(0)}`, // Mock calculation
        expiresAt: coupon.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: "Ativo"
      })) || [];

      // Format funnels for display
      const formattedFunnels = funnels?.map(funnel => ({
        id: funnel.id,
        name: funnel.name,
        products: Array.isArray(funnel.products) ? funnel.products : [],
        conversion: funnel.conversion_rate || 0,
        revenue: `R$ ${((funnel.total_revenue || 0) / 100).toFixed(0)}`,
        visitors: funnel.total_visitors || 0,
        purchases: funnel.total_purchases || 0,
        status: funnel.status === 'active' ? 'Ativo' : 'Pausado'
      })) || [];

      // Format upsells for display
      const formattedUpsells = upsells?.map(upsell => ({
        id: upsell.id,
        name: upsell.name,
        conversionRate: upsell.conversion_rate || 0,
        revenue: `R$ ${((upsell.total_revenue || 0) / 100).toFixed(0)}`,
        shows: upsell.total_shows || 0,
        conversions: upsell.total_conversions || 0,
        avgOrderValue: `R$ ${((upsell.average_order_value || 0) / 100).toFixed(0)}`
      })) || [];

      setSalesData({
        totalRevenue: totalRevenue / 100, // Convert from cents
        conversionRate: totalSales > 0 ? ((totalSales / (totalSales * 25)) * 100) : 4.8, // Mock conversion rate
        activeCoupons,
        upsellConversion,
        totalSales
      });

      setRealCoupons(formattedCoupons);
      setRealFunnels(formattedFunnels);
      setRealUpsells(formattedUpsells);

    } catch (error) {
      console.error('Error fetching sales data:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de vendas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando dados de vendas...</p>
        </div>
      </div>
    );
  }

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
        <Button 
          className="gap-2 gradient-primary text-white shadow-primary"
          onClick={() => setShowFunnelModal(true)}
        >
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
                <p className="text-2xl font-bold text-foreground">{salesData.conversionRate.toFixed(1)}%</p>
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
                <p className="text-2xl font-bold text-foreground">
                  R$ {salesData.totalRevenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
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
                <p className="text-2xl font-bold text-foreground">{salesData.activeCoupons}</p>
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
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowFunnelModal(true)}
            >
              <Plus className="h-4 w-4" />
              Novo Funil
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {realFunnels.length > 0 ? realFunnels.map((funnel) => (
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
            )) : (
              <Card className="shadow-soft border-soft">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum funil criado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Crie seu primeiro funil de vendas para começar a otimizar suas conversões
                  </p>
                  <Button onClick={() => setShowFunnelModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Funil
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Coupons Tab */}
        <TabsContent value="coupons" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Cupons de Desconto</h2>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowCouponModal(true)}
            >
              <Plus className="h-4 w-4" />
              Criar Cupom
            </Button>
          </div>

          <div className="grid gap-6">
            {realCoupons.length > 0 ? realCoupons.map((coupon) => (
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
            )) : (
              <Card className="shadow-soft border-soft">
                <CardContent className="p-12 text-center">
                  <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum cupom ativo
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Crie seu primeiro cupom de desconto para aumentar as vendas
                  </p>
                  <Button className="gap-2 gradient-primary text-white">
                    <Plus className="h-4 w-4" />
                    Criar Primeiro Cupom
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Upsells Tab */}
        <TabsContent value="upsells" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Upsells & Order Bumps</h2>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowUpsellModal(true)}
            >
              <Plus className="h-4 w-4" />
              Criar Upsell
            </Button>
          </div>

          <div className="grid gap-6">
            {realUpsells.length > 0 ? realUpsells.map((upsell) => (
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
            )) : (
              <Card className="shadow-soft border-soft">
                <CardContent className="p-12 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum upsell criado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Crie seu primeiro upsell para aumentar o valor médio por compra
                  </p>
                  <Button onClick={() => setShowUpsellModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Upsell
                  </Button>
                </CardContent>
              </Card>
            )}
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

      {/* Modals */}
      <CreateFunnelModal
        open={showFunnelModal}
        onOpenChange={setShowFunnelModal}
        onSuccess={fetchSalesData}
      />
      
      <CreateCouponModal
        open={showCouponModal}
        onOpenChange={setShowCouponModal}
        onSuccess={fetchSalesData}
      />
      
      <CreateUpsellModal
        open={showUpsellModal}
        onOpenChange={setShowUpsellModal}
        onSuccess={fetchSalesData}
      />
    </div>
  );
}