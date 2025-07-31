import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Download,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  PieChart,
  BarChart3,
  FileText,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const transactions = [
  {
    id: 1,
    type: "Venda",
    description: "Transformação 24h - Premium",
    amount: "R$ 97,00",
    fee: "R$ 4,85",
    net: "R$ 92,15",
    status: "Aprovada",
    date: "2024-01-25 14:30",
    customer: "João Silva",
    method: "Cartão de Crédito"
  },
  {
    id: 2,
    type: "Venda",
    description: "Foco Total - Standard",
    amount: "R$ 67,00",
    fee: "R$ 3,35",
    net: "R$ 63,65",
    status: "Aprovada",
    date: "2024-01-25 12:15",
    customer: "Maria Santos",
    method: "PIX"
  },
  {
    id: 3,
    type: "Estorno",
    description: "Kit Bem-estar Digital",
    amount: "-R$ 147,00",
    fee: "R$ 0,00",
    net: "-R$ 147,00",
    status: "Processado",
    date: "2024-01-24 16:45",
    customer: "Carlos Oliveira",
    method: "Cartão de Crédito"
  }
];

const monthlyData = [
  { month: "Dez 2023", revenue: "R$ 18.450", transactions: 287, avgTicket: "R$ 64,29" },
  { month: "Jan 2024", revenue: "R$ 24.847", transactions: 389, avgTicket: "R$ 63,87" },
];

export default function Financeiro() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [financialData, setFinancialData] = useState({
    grossRevenue: 0,
    netRevenue: 0,
    transactions: 0,
    avgTicket: 0,
    recentTransactions: []
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFinancialData();
  }, [selectedPeriod]);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);

      // Calculate date range based on selected period
      const now = new Date();
      let startDate = new Date();
      
      switch (selectedPeriod) {
        case "7d":
          startDate.setDate(now.getDate() - 7);
          break;
        case "30d":
          startDate.setDate(now.getDate() - 30);
          break;
        case "90d":
          startDate.setDate(now.getDate() - 90);
          break;
        case "1y":
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      // Fetch purchases data
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select(`
          *,
          products(title)
        `)
        .eq('status', 'completed')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (purchasesError) throw purchasesError;

      // Calculate metrics
      const grossRevenue = purchases?.reduce((sum, purchase) => sum + (purchase.amount || 0), 0) || 0;
      const netRevenue = grossRevenue * 0.95; // Assuming 5% fees
      const transactions = purchases?.length || 0;
      const avgTicket = transactions > 0 ? grossRevenue / transactions : 0;

      // Format recent transactions
      const recentTransactions = purchases?.slice(0, 10).map(purchase => ({
        id: purchase.id,
        type: "Venda",
        description: purchase.products?.title || "Produto",
        amount: `R$ ${((purchase.amount || 0) / 100).toFixed(2).replace('.', ',')}`,
        fee: `R$ ${(((purchase.amount || 0) * 0.05) / 100).toFixed(2).replace('.', ',')}`,
        net: `R$ ${(((purchase.amount || 0) * 0.95) / 100).toFixed(2).replace('.', ',')}`,
        status: "Aprovada",
        date: purchase.created_at,
        customer: "Cliente",
        method: "Cartão de Crédito"
      })) || [];

      setFinancialData({
        grossRevenue: grossRevenue / 100, // Convert from cents
        netRevenue: netRevenue / 100,
        transactions,
        avgTicket: avgTicket / 100,
        recentTransactions
      });

    } catch (error) {
      console.error('Error fetching financial data:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados financeiros.",
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
          <p className="text-muted-foreground">Carregando dados financeiros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Centro Financeiro</h1>
          <p className="text-muted-foreground">
            Controle financeiro completo e relatórios de receita
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Receita Bruta</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {financialData.grossRevenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
                <div className="flex items-center text-sm mt-1">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success">+34.7%</span>
                  <span className="text-muted-foreground ml-1">vs mês anterior</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Receita Líquida</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {financialData.netRevenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
                <div className="flex items-center text-sm mt-1">
                  <span className="text-muted-foreground">Taxa: 5%</span>
                </div>
              </div>
              <Wallet className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Transações</p>
                <p className="text-2xl font-bold text-foreground">{financialData.transactions}</p>
                <div className="flex items-center text-sm mt-1">
                  <TrendingUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success">+102</span>
                  <span className="text-muted-foreground ml-1">vs mês anterior</span>
                </div>
              </div>
              <Receipt className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Ticket Médio</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {financialData.avgTicket.toFixed(2).replace('.', ',')}
                </p>
                <div className="flex items-center text-sm mt-1">
                  <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                  <span className="text-destructive">-R$ 0,42</span>
                  <span className="text-muted-foreground ml-1">vs mês anterior</span>
                </div>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Evolução da Receita</CardTitle>
                <CardDescription>Últimos 12 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p>Gráfico de receita seria renderizado aqui</p>
                    <p className="text-sm">Integração com biblioteca de gráficos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="shadow-soft border-soft">
              <CardHeader>
                <CardTitle className="text-foreground">Métodos de Pagamento</CardTitle>
                <CardDescription>Distribuição por tipo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">Cartão de Crédito</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">R$ 18.650</p>
                      <p className="text-sm text-muted-foreground">75.1%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                        <Wallet className="h-4 w-4 text-success" />
                      </div>
                      <span className="font-medium text-foreground">PIX</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">R$ 5.245</p>
                      <p className="text-sm text-muted-foreground">21.1%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Receipt className="h-4 w-4 text-warning" />
                      </div>
                      <span className="font-medium text-foreground">Boleto</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">R$ 952</p>
                      <p className="text-sm text-muted-foreground">3.8%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Comparison */}
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Comparativo Mensal</CardTitle>
              <CardDescription>Performance dos últimos meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {monthlyData.map((month, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-3">{month.month}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Receita:</span>
                        <span className="font-medium text-foreground">{month.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transações:</span>
                        <span className="font-medium text-foreground">{month.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ticket Médio:</span>
                        <span className="font-medium text-foreground">{month.avgTicket}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Últimas Transações</CardTitle>
              <CardDescription>
                Histórico detalhado de todas as transações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Valor Bruto</TableHead>
                    <TableHead>Taxa</TableHead>
                    <TableHead>Valor Líquido</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.recentTransactions.length > 0 ? financialData.recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/50">
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(transaction.date).toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.type === "Venda" ? "default" : "secondary"}
                          className={transaction.type === "Venda" ? "bg-success text-white" : "bg-destructive text-white"}
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {transaction.description}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {transaction.customer}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {transaction.method}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {transaction.amount}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {transaction.fee}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {transaction.net}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="default"
                          className={
                            transaction.status === "Aprovada" ? "bg-success text-white" :
                            transaction.status === "Processado" ? "bg-warning text-white" :
                            "bg-destructive text-white"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <Receipt className="h-8 w-8 text-muted-foreground" />
                          <p className="text-muted-foreground">Nenhuma transação encontrada para o período selecionado</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-soft border-soft">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Relatório Mensal</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Receita, transações e análises detalhadas
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Baixar PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-soft">
              <CardContent className="p-6 text-center">
                <PieChart className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Análise de Produtos</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Performance por produto e categoria
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Baixar Excel
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-soft">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Relatório Fiscal</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Dados para declaração de imposto de renda
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Baixar CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projections Tab */}
        <TabsContent value="projections" className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Projeções Financeiras</CardTitle>
              <CardDescription>
                Estimativas baseadas no desempenho atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Próximo Mês</h3>
                  <p className="text-2xl font-bold text-success">R$ 28.500</p>
                  <p className="text-sm text-muted-foreground">+14.7% estimado</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Próximo Trimestre</h3>
                  <p className="text-2xl font-bold text-primary">R$ 89.200</p>
                  <p className="text-sm text-muted-foreground">+22.3% estimado</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Meta Anual</h3>
                  <p className="text-2xl font-bold text-warning">R$ 350.000</p>
                  <p className="text-sm text-muted-foreground">21.4% do objetivo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}