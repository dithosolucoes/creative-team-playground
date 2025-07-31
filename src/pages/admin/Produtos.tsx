import React, { useState } from "react";
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
  Calendar
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Transformação 24h - Premium",
    description: "Versão premium da experiência mais vendida",
    price: "R$ 97,00",
    stock: "Ilimitado",
    sales: 247,
    revenue: "R$ 23.959",
    conversion: "3.8%",
    status: "Ativo",
    category: "Experiência",
    createdAt: "2024-01-15",
    trend: "up"
  },
  {
    id: 2,
    name: "Foco Total - Standard",
    description: "Experiência de produtividade básica",
    price: "R$ 67,00",
    stock: "Ilimitado",
    sales: 189,
    revenue: "R$ 12.663",
    conversion: "4.2%",
    status: "Ativo",
    category: "Experiência",
    createdAt: "2024-01-10",
    trend: "up"
  },
  {
    id: 3,
    name: "Kit Bem-estar Digital",
    description: "Bundle com 3 experiências de bem-estar",
    price: "R$ 147,00",
    stock: "Ilimitado",
    sales: 89,
    revenue: "R$ 13.083",
    conversion: "2.1%",
    status: "Ativo",
    category: "Bundle",
    createdAt: "2024-01-05",
    trend: "down"
  },
  {
    id: 4,
    name: "Energia Renovada - Beta",
    description: "Nova experiência em fase de teste",
    price: "R$ 47,00",
    stock: "100 unidades",
    sales: 23,
    revenue: "R$ 1.081",
    conversion: "1.8%",
    status: "Teste",
    category: "Experiência",
    createdAt: "2024-01-20",
    trend: "up"
  }
];

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === "Todas" || product.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const handleSelectProduct = (productId: number) => {
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
        <Button className="gap-2 gradient-primary text-white shadow-primary">
          <Plus className="h-4 w-4" />
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
                <p className="text-2xl font-bold text-foreground">12</p>
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
                <p className="text-2xl font-bold text-foreground">R$ 24.847</p>
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
                <p className="text-2xl font-bold text-foreground">548</p>
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
                <p className="text-2xl font-bold text-foreground">3.2%</p>
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

      {/* Products Table */}
      <Card className="shadow-soft border-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Produtos</CardTitle>
          <CardDescription>
            Gerencie e monitore a performance de todos os seus produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedProducts.length === filteredProducts.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Receita</TableHead>
                <TableHead>Conversão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox 
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleSelectProduct(product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">{product.price}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{product.sales}</span>
                      {product.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground">{product.revenue}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{product.conversion}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        parseFloat(product.conversion) > 3 ? 'bg-success' :
                        parseFloat(product.conversion) > 2 ? 'bg-warning' : 'bg-destructive'
                      }`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        product.status === "Ativo" ? "default" :
                        product.status === "Teste" ? "secondary" : "outline"
                      }
                      className={
                        product.status === "Ativo" ? "bg-success text-white" :
                        product.status === "Teste" ? "bg-warning text-white" : ""
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}