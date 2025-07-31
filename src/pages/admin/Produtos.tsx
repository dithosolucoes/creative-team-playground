import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Package
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const produtos = [
  {
    id: 1,
    nome: "Foco & Produtividade 24h",
    descricao: "Experiência completa para aumentar foco e produtividade",
    preco: 197,
    vendas: 145,
    receita: 28565,
    conversao: 3.2,
    status: "ativo",
    criadoEm: "15/12/2024"
  },
  {
    id: 2,
    nome: "Mindfulness & Bem-estar",
    descricao: "Jornada de autoconhecimento e bem-estar mental",
    preco: 149,
    vendas: 89,
    receita: 13261,
    conversao: 2.8,
    status: "ativo",
    criadoEm: "10/12/2024"
  },
  {
    id: 3,
    nome: "Confiança Total",
    descricao: "Desenvolva autoconfiança em 24 horas",
    preco: 127,
    vendas: 67,
    receita: 8509,
    conversao: 2.1,
    status: "rascunho",
    criadoEm: "05/12/2024"
  },
];

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seus produtos e acompanhe performance
          </p>
        </div>
        <Button className="gap-2 gradient-primary text-white">
          <Plus className="h-4 w-4" />
          Criar Produto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Produtos
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">2 ativos, 1 rascunho</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 50.335</div>
            <p className="text-xs text-green-600">+12.5% vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Vendas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">301</div>
            <p className="text-xs text-green-600">+8.2% vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa Conversão Média
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2.7%</div>
            <p className="text-xs text-green-600">+0.3% vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card border-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Lista de Produtos</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProdutos.map((produto) => (
              <Card key={produto.id} className="border-border hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{produto.nome}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{produto.descricao}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant={produto.status === 'ativo' ? 'default' : 'secondary'}>
                              {produto.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {produto.criadoEm}
                            </span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">R$ {produto.preco}</p>
                        <p className="text-xs text-muted-foreground">Preço</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{produto.vendas}</p>
                        <p className="text-xs text-muted-foreground">Vendas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">R$ {produto.receita.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Receita</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{produto.conversao}%</p>
                        <p className="text-xs text-muted-foreground">Conversão</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}