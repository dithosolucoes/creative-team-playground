import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Plus, 
  Search, 
  Heart, 
  Calendar,
  Users,
  Eye,
  Edit,
  Trash2,
  Loader2
} from "lucide-react";

interface Experience {
  id: string;
  title: string;
  description: string | null;
  template_id: number;
  content: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function Experiencias() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching experiences:', error);
        toast({
          title: "Erro ao carregar",
          description: "Não foi possível carregar as experiências.",
          variant: "destructive"
        });
        return;
      }

      setExperiences(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro de conexão",
        description: "Verifique sua conexão com a internet.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExperienceStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('experiences')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating experience:', error);
        toast({
          title: "Erro ao atualizar",
          description: "Não foi possível alterar o status da experiência.",
          variant: "destructive"
        });
        return;
      }

      setExperiences(prev => 
        prev.map(exp => 
          exp.id === id ? { ...exp, is_active: !currentStatus } : exp
        )
      );

      toast({
        title: "Status atualizado!",
        description: `Experiência ${!currentStatus ? 'ativada' : 'desativada'} com sucesso.`
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao atualizar o status.",
        variant: "destructive"
      });
    }
  };

  const deleteExperience = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja excluir a experiência "${title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting experience:', error);
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir a experiência.",
          variant: "destructive"
        });
        return;
      }

      setExperiences(prev => prev.filter(exp => exp.id !== id));
      
      toast({
        title: "Experiência excluída!",
        description: `"${title}" foi removida com sucesso.`
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao excluir a experiência.",
        variant: "destructive"
      });
    }
  };

  const getDaysCount = (content: any): number => {
    if (!content) return 0;
    if (content.daily_content && Array.isArray(content.daily_content)) {
      return content.daily_content.length;
    }
    return Array.isArray(content) ? content.length : 0;
  };

  const getTemplateLabel = (templateId: number): string => {
    const templates = {
      1: "Clássico",
      2: "Moderno", 
      3: "Sereno"
    };
    return templates[templateId as keyof typeof templates] || `Template ${templateId}`;
  };

  const filteredExperiences = experiences.filter(exp =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (exp.description && exp.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-lg text-muted-foreground">Carregando experiências...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experiências</h1>
          <p className="text-muted-foreground">
            Gerencie suas experiências devocionais e conteúdos
          </p>
        </div>
        <Button 
          onClick={() => navigate("/admin/experiencias/criar")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Nova Experiência
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-primary/10 mr-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{experiences.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-green-100 mr-4">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ativas</p>
              <p className="text-2xl font-bold">{experiences.filter(e => e.is_active).length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 rounded-lg bg-blue-100 mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Dias de Conteúdo</p>
              <p className="text-2xl font-bold">
                {experiences.reduce((total, exp) => total + getDaysCount(exp.content), 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar experiências..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Experiences List */}
      <div className="space-y-6">
        {filteredExperiences.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm ? "Nenhuma experiência encontrada" : "Nenhuma experiência criada"}
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                {searchTerm 
                  ? "Tente ajustar os termos de busca ou criar uma nova experiência."
                  : "Comece criando sua primeira experiência devocional."
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => navigate("/admin/experiencias/criar")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeira Experiência
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredExperiences.map((experience) => (
              <Card key={experience.id} className="shadow-soft border-soft">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {experience.title}
                        </h3>
                        <Badge variant={experience.is_active ? "default" : "secondary"}>
                          {experience.is_active ? "Ativa" : "Inativa"}
                        </Badge>
                        <Badge variant="outline">
                          {getTemplateLabel(experience.template_id)}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {experience.description || "Sem descrição"}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{getDaysCount(experience.content)} dias</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Criado em {new Date(experience.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/experiencias/${experience.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/experiencias/${experience.id}/editar`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExperienceStatus(experience.id, experience.is_active)}
                      >
                        {experience.is_active ? "Desativar" : "Ativar"}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteExperience(experience.id, experience.title)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}