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
  Lightbulb,
  Users,
  Calendar,
  Clock,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const experiencias = [
  {
    id: 1,
    nome: "Transformação Mental",
    descricao: "Experiência completa de transformação pessoal em 24h",
    template: "Template Mindfulness",
    usuarios: 245,
    completados: 187,
    taxaConclusao: 76.3,
    status: "ativo",
    criadoEm: "12/12/2024"
  },
  {
    id: 2,
    nome: "Foco Extremo",
    descricao: "Desenvolva foco laser e elimine distrações",
    template: "Template Produtividade",
    usuarios: 156,
    completados: 134,
    taxaConclusao: 85.9,
    status: "ativo",
    criadoEm: "08/12/2024"
  },
  {
    id: 3,
    nome: "Autoconfiança Total",
    descricao: "Construa autoconfiança inabalável",
    template: "Template Motivacional",
    usuarios: 89,
    completados: 62,
    taxaConclusao: 69.7,
    status: "rascunho",
    criadoEm: "03/12/2024"
  },
];

export default function Experiencias() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExperiencias = experiencias.filter(exp =>
    exp.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experiências</h1>
          <p className="text-muted-foreground">
            Crie e gerencie experiências transformadoras de 24 horas
          </p>
        </div>
        <Button className="gap-2 gradient-primary text-white">
          <Plus className="h-4 w-4" />
          Criar Experiência
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Experiências
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">2 ativas, 1 rascunho</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">490</div>
            <p className="text-xs text-green-600">+18.3% vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Concluídas
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">383</div>
            <p className="text-xs text-green-600">+25.1% vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa Conclusão Média
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">77.3%</div>
            <p className="text-xs text-green-600">+4.2% vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card border-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Lista de Experiências</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar experiências..."
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
            {filteredExperiencias.map((experiencia) => (
              <Card key={experiencia.id} className="border-border hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{experiencia.nome}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{experiencia.descricao}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant={experiencia.status === 'ativo' ? 'default' : 'secondary'}>
                              {experiencia.status}
                            </Badge>
                            <Badge variant="outline">
                              {experiencia.template}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {experiencia.criadoEm}
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

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{experiencia.usuarios}</p>
                        <p className="text-xs text-muted-foreground">Usuários</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{experiencia.completados}</p>
                        <p className="text-xs text-muted-foreground">Concluídas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{experiencia.taxaConclusao}%</p>
                        <p className="text-xs text-muted-foreground">Taxa Conclusão</p>
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