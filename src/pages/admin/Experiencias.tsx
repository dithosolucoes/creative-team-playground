import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal, 
  Users, 
  Star, 
  Calendar,
  Sparkles,
  TrendingUp,
  Copy
} from "lucide-react";

const experiences = [
  {
    id: 1,
    title: "Transformação 24h",
    description: "Uma jornada completa de autodescoberta e transformação pessoal",
    status: "Ativa",
    participants: 247,
    rating: 4.8,
    revenue: "R$ 12.350",
    template: "Mindfulness",
    createdAt: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Foco Total",
    description: "Desenvolva concentração máxima e produtividade em 24 horas",
    status: "Ativa",
    participants: 189,
    rating: 4.9,
    revenue: "R$ 9.450",
    template: "Produtividade",
    createdAt: "2024-01-10",
    thumbnail: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Energia Renovada",
    description: "Recupere sua vitalidade e energia através de práticas holísticas",
    status: "Rascunho",
    participants: 0,
    rating: 0,
    revenue: "R$ 0",
    template: "Bem-estar",
    createdAt: "2024-01-20",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop"
  }
];

export default function Experiencias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todas");

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "Todas" || exp.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experiências</h1>
          <p className="text-muted-foreground">
            Crie e gerencie experiências transformadoras de 24 horas
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 gradient-primary text-white shadow-primary">
              <Plus className="h-4 w-4" />
              Criar Experiência
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Experiência</DialogTitle>
              <DialogDescription>
                Escolha como deseja criar sua nova experiência
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Button className="w-full justify-start gap-3 h-12" variant="outline">
                <Sparkles className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Criar do Zero</p>
                  <p className="text-sm text-muted-foreground">Comece com uma experiência em branco</p>
                </div>
              </Button>
              <Button className="w-full justify-start gap-3 h-12" variant="outline">
                <Copy className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Usar Template</p>
                  <p className="text-sm text-muted-foreground">Escolha um dos 3 templates disponíveis</p>
                </div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar experiências..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-soft focus:border-primary"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48 border-soft focus:border-primary">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas</SelectItem>
            <SelectItem value="Ativa">Ativas</SelectItem>
            <SelectItem value="Rascunho">Rascunhos</SelectItem>
            <SelectItem value="Pausada">Pausadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total de Experiências</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Participantes Ativos</p>
                <p className="text-2xl font-bold text-foreground">1.247</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avaliação Média</p>
                <p className="text-2xl font-bold text-foreground">4.8</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((experience) => (
          <Card key={experience.id} className="shadow-soft border-soft hover:shadow-medium transition-all duration-200 group">
            <div className="relative">
              <img 
                src={experience.thumbnail} 
                alt={experience.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge 
                  variant={experience.status === "Ativa" ? "default" : "secondary"}
                  className={experience.status === "Ativa" ? "bg-success text-white" : ""}
                >
                  {experience.status}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground line-clamp-1">
                    {experience.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {experience.description}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">{experience.participants}</span>
                  <span className="text-muted-foreground">participantes</span>
                </div>
                {experience.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-foreground font-medium">{experience.rating}</span>
                  </div>
                )}
              </div>

              {/* Revenue */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Receita:</span>
                <span className="font-bold text-foreground">{experience.revenue}</span>
              </div>

              {/* Template */}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {experience.template}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  • {new Date(experience.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Eye className="h-4 w-4" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredExperiences.length === 0 && (
        <Card className="shadow-soft border-soft">
          <CardContent className="p-12 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhuma experiência encontrada
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || filterStatus !== "Todas" 
                ? "Tente ajustar seus filtros de busca" 
                : "Crie sua primeira experiência transformadora"
              }
            </p>
            <Button className="gap-2 gradient-primary text-white">
              <Plus className="h-4 w-4" />
              Criar Primeira Experiência
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}