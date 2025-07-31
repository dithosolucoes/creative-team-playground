import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, Percent, Zap, TrendingUp } from "lucide-react";

export default function Vendas() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Vendas</h1>
          <p className="text-muted-foreground">
            Gerencie cupons, promoções, funis e estratégias de upsell
          </p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card border-card hover:shadow-lg transition-all cursor-pointer">
          <CardHeader className="text-center pb-3">
            <Percent className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Cupons</CardTitle>
            <CardDescription className="text-sm">
              Criar e gerenciar cupons de desconto
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Novo Cupom
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card hover:shadow-lg transition-all cursor-pointer">
          <CardHeader className="text-center pb-3">
            <Zap className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Promoções</CardTitle>
            <CardDescription className="text-sm">
              Campanhas promocionais temporárias
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Nova Promoção
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card hover:shadow-lg transition-all cursor-pointer">
          <CardHeader className="text-center pb-3">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Funis</CardTitle>
            <CardDescription className="text-sm">
              Criador de funis de vendas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Novo Funil
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card hover:shadow-lg transition-all cursor-pointer">
          <CardHeader className="text-center pb-3">
            <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Upsells</CardTitle>
            <CardDescription className="text-sm">
              Order bumps e ofertas adicionais
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Novo Upsell
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card className="shadow-card border-card">
        <CardHeader>
          <CardTitle>Campanhas Ativas</CardTitle>
          <CardDescription>
            Suas estratégias de vendas em andamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma campanha ativa
            </h3>
            <p className="text-muted-foreground mb-6">
              Comece criando cupons, promoções ou funis de vendas
            </p>
            <Button className="gap-2 gradient-primary text-white">
              <Plus className="h-4 w-4" />
              Criar Primeira Campanha
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}