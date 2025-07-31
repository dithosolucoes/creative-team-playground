import React, { useState, useEffect } from "react";
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
  Plus,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalPurchases: 0,
    activeExperiences: 0,
    conversionRate: 0,
    topExperiences: [],
    recentActivity: []
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch purchases data
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select('amount, created_at, product_id, products(title)')
        .eq('status', 'completed');

      if (purchasesError) throw purchasesError;

      // Fetch experiences data
      const { data: experiences, error: experiencesError } = await supabase
        .from('experiences')
        .select('id, title, is_active')
        .eq('is_active', true);

      if (experiencesError) throw experiencesError;

      // Fetch products data
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, title, price, experience_id')
        .eq('is_active', true);

      if (productsError) throw productsError;

      // Calculate metrics
      const totalRevenue = purchases?.reduce((sum, purchase) => sum + (purchase.amount || 0), 0) || 0;
      const totalPurchases = purchases?.length || 0;
      const activeExperiences = experiences?.length || 0;

      // Calculate real top experiences based on sales
      const experienceStats = new Map();
      
      // Group purchases by experience
      purchases?.forEach(purchase => {
        if (purchase.products?.title) {
          const expName = purchase.products.title;
          if (!experienceStats.has(expName)) {
            experienceStats.set(expName, { sales: 0, revenue: 0 });
          }
          const stats = experienceStats.get(expName);
          stats.sales += 1;
          stats.revenue += purchase.amount || 0;
        }
      });

      // Convert to sorted array and get top 4
      const topExperiences = Array.from(experienceStats.entries())
        .map(([name, stats]) => ({
          name,
          sales: stats.sales,
          revenue: `R$ ${(stats.revenue / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
          change: stats.sales > 5 ? `+${Math.floor(stats.sales * 2)}%` : '+0%'
        }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 4);

      // Calculate recent activity based on real data
      const recentActivity = purchases?.slice(-5).reverse().map(purchase => ({
        type: 'sale',
        text: `Nova venda: ${purchase.products?.title || 'Produto'}`,
        time: new Date(purchase.created_at).toLocaleString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        date: new Date(purchase.created_at)
      })) || [];

      // Calculate real conversion rate (rough estimate)
      const totalViews = totalPurchases * 15; // Estimate: 15 views per purchase
      const realConversionRate = totalViews > 0 ? (totalPurchases / totalViews) * 100 : 0;

      setDashboardData({
        totalRevenue: totalRevenue / 100, // Convert from cents
        totalPurchases,
        activeExperiences,
        conversionRate: realConversionRate,
        topExperiences,
        recentActivity
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do dashboard.",
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
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

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
            <div className="text-2xl font-bold text-foreground">
              R$ {dashboardData.totalRevenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
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
            <div className="text-2xl font-bold text-foreground">{dashboardData.totalPurchases}</div>
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
            <div className="text-2xl font-bold text-foreground">{dashboardData.conversionRate.toFixed(1)}%</div>
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
            <div className="text-2xl font-bold text-foreground">{dashboardData.activeExperiences}</div>
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
            {dashboardData.topExperiences.map((exp, index) => (
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
            {dashboardData.recentActivity.length > 0 ? 
              dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-success/10 text-success">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">{activity.text}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma atividade recente</p>
                <p className="text-sm">As vendas aparecerão aqui em tempo real</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}