import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Download, Calendar } from "lucide-react";

export default function Financeiro() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground">
            Receitas, comissões e relatórios financeiros
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              Receita Mensal
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 12.450</div>
            <p className="text-xs text-green-600">+8.2% vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Comissões Pagas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 2.517</div>
            <p className="text-xs text-muted-foreground">5% do total</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Product */}
      <Card className="shadow-card border-card">
        <CardHeader>
          <CardTitle>Receita por Produto</CardTitle>
          <CardDescription>
            Performance financeira de cada produto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-semibold text-foreground">Foco & Produtividade 24h</h4>
                <p className="text-sm text-muted-foreground">145 vendas</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">R$ 28.565</p>
                <p className="text-sm text-green-600">+15.3%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-semibold text-foreground">Mindfulness & Bem-estar</h4>
                <p className="text-sm text-muted-foreground">89 vendas</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">R$ 13.261</p>
                <p className="text-sm text-green-600">+8.7%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-semibold text-foreground">Confiança Total</h4>
                <p className="text-sm text-muted-foreground">67 vendas</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">R$ 8.509</p>
                <p className="text-sm text-green-600">+12.1%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Reports */}
      <Card className="shadow-card border-card">
        <CardHeader>
          <CardTitle>Relatórios Financeiros</CardTitle>
          <CardDescription>
            Gere relatórios detalhados para análise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              Relatório de Receitas
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              Análise de Vendas
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              Relatório Mensal
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Download className="h-6 w-6" />
              Exportar Dados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}