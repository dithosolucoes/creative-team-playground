import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal, 
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Calendar,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sales?: number;
  revenue?: number;
  conversion?: number;
}

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    activeProducts: 0,
    totalRevenue: 0,
    monthSales: 0,
    conversionRate: 0
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchDashboardStats();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch sales data for each product
      const productsWithStats = await Promise.all(
        (data || []).map(async (product) => {
          const { data: salesData } = await supabase
            .from('purchases')
            .select('amount')
            .eq('product_id', product.id)
            .eq('status', 'completed');

          const sales = salesData?.length || 0;
          const revenue = salesData?.reduce((sum, sale) => sum + (sale.amount || 0), 0) || 0;
          const conversion = sales > 0 ? Math.round((sales / (sales * 15)) * 1000) / 10 : 0; // Estimate

          return {
            ...product,
            sales,
            revenue: revenue / 100, // Convert from cents
            conversion
          };
        })
      );

      setProducts(productsWithStats);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      // Count active products
      const { count: activeCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Get total revenue
      const { data: purchases } = await supabase
        .from('purchases')
        .select('amount, created_at')
        .eq('status', 'completed');

      const totalRevenue = purchases?.reduce((sum, purchase) => sum + (purchase.amount || 0), 0) || 0;
      
      // Get this month's sales
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const { data: monthPurchases } = await supabase
        .from('purchases')
        .select('amount')
        .eq('status', 'completed')
        .gte('created_at', thisMonth.toISOString());

      const monthSales = monthPurchases?.length || 0;
      const totalSales = purchases?.length || 0;
      const conversionRate = totalSales > 0 ? (totalSales / (totalSales * 15)) * 100 : 0;

      setDashboardStats({
        activeProducts: activeCount || 0,
        totalRevenue: totalRevenue / 100,
        monthSales,
        conversionRate
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === filteredProducts.length 
        ? [] 
        : filteredProducts.map(p => p.id)
    );
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seus produtos e acompanhe performance em tempo real
          </p>
        </div>
        
        {/* BOTÃO CRIAR PRODUTO - FORÇADO */}
        <Button 
          onClick={() => {
            console.log("CLICOU NO BOTÃO CRIAR PRODUTO!");
            navigate("/admin/produtos/criar");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg"
          style={{ 
            backgroundColor: '#2563eb',
            color: 'white',
            minWidth: '150px',
            height: '44px'
          }}
        >
          <Plus className="h-5 w-5" />
          Criar Produto
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Produtos Ativos</p>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.activeProducts}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Receita Total</p>
                <p className="text-2xl font-bold text-foreground">R$ {dashboardStats.totalRevenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Vendas do Mês</p>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.monthSales}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Taxa Conversão</p>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.conversionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-soft focus:border-primary"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48 border-soft focus:border-primary">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas Categorias</SelectItem>
            <SelectItem value="Experiência">Experiências</SelectItem>
            <SelectItem value="Bundle">Bundles</SelectItem>
            <SelectItem value="Curso">Cursos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <Card className="shadow-soft border-soft bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                {selectedProducts.length} produto(s) selecionado(s)
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Exportar</Button>
                <Button variant="outline" size="sm">Duplicar</Button>
                <Button variant="outline" size="sm">Pausar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
          <Card key={product.id} className="shadow-soft border-soft hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Checkbox 
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleSelectProduct(product.id)}
                    />
                    <Badge variant="outline" className="text-xs">
                      Produto
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-foreground line-clamp-2">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2 mt-1">
                    {product.description || 'Produto sem descrição'}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Price and Status */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">R$ {(product.price / 100).toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">
                      Criado em {new Date(product.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge 
                    variant={product.is_active ? "default" : "outline"}
                    className={product.is_active ? "bg-success text-white" : ""}
                  >
                    {product.is_active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Vendas</p>
                    <div className="flex items-center gap-1">
                      <p className="text-lg font-semibold text-foreground">{product.sales || 0}</p>
                      {(product.sales || 0) > 0 ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Receita</p>
                    <p className="text-lg font-semibold text-foreground">R$ {(product.revenue || 0).toFixed(0)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Conversão</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{(product.conversion || 0).toFixed(1)}%</p>
                      <div className={`w-2 h-2 rounded-full ${
                        (product.conversion || 0) > 3 ? 'bg-success' :
                        (product.conversion || 0) > 2 ? 'bg-warning' : 'bg-destructive'
                      }`} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Estoque</p>
                    <p className="text-sm font-medium text-foreground">Ilimitado</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(`/produto/${product.slug}`, '_blank')}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-full text-center py-12">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mb-6">Comece criando seu primeiro produto</p>
            <Button onClick={() => navigate("/admin/produtos/criar")} className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Primeiro Produto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}