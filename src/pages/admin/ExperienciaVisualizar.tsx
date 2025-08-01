import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { 
  ArrowLeft,
  Calendar,
  Book,
  Heart,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";

interface DailyContent {
  day: number;
  title: string;
  verse: string;
  verse_reference: string;
  devotional: string;
  reflection_questions: string[];
  prayer: string;
}

interface Experience {
  id: string;
  title: string;
  description: string | null;
  template_id: number;
  content: Json;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ExperienciaVisualizar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching experience:', error);
        toast({
          title: "Erro ao carregar",
          description: "Não foi possível carregar a experiência.",
          variant: "destructive"
        });
        navigate('/admin/experiencias');
        return;
      }

      setExperience(data);
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

  const getTemplateLabel = (templateId: number): string => {
    const templates = {
      1: "Clássico",
      2: "Moderno", 
      3: "Sereno"
    };
    return templates[templateId as keyof typeof templates] || `Template ${templateId}`;
  };

  const getCurrentDayContent = (): DailyContent | null => {
    if (!experience?.content || typeof experience.content !== 'object') return null;
    const content = experience.content as any;
    if (!content.daily_content || !Array.isArray(content.daily_content)) return null;
    return content.daily_content.find((day: DailyContent) => day.day === currentDay) || null;
  };

  const getTotalDays = (): number => {
    if (!experience?.content || typeof experience.content !== 'object') return 0;
    const content = experience.content as any;
    return content.daily_content?.length || 0;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-lg text-muted-foreground">Carregando experiência...</span>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Experiência não encontrada
            </h3>
            <p className="text-muted-foreground mb-4">
              A experiência solicitada não existe ou foi removida.
            </p>
            <Button onClick={() => navigate('/admin/experiencias')}>
              Voltar para Experiências
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentDayContent = getCurrentDayContent();
  const totalDays = getTotalDays();

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/admin/experiencias')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{experience.title}</h1>
          <p className="text-muted-foreground">
            Visualizando experiência devocional
          </p>
        </div>
      </div>

      {/* Experience Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Informações da Experiência</CardTitle>
              <CardDescription>{experience.description || "Sem descrição"}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant={experience.is_active ? "default" : "secondary"}>
                {experience.is_active ? "Ativa" : "Inativa"}
              </Badge>
              <Badge variant="outline">
                {getTemplateLabel(experience.template_id)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Total de Dias</p>
                <p className="text-lg font-semibold">{totalDays}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Criada em</p>
                <p className="text-lg font-semibold">
                  {new Date(experience.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Book className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Última atualização</p>
                <p className="text-lg font-semibold">
                  {new Date(experience.updated_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Navigation */}
      {totalDays > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Conteúdo Diário</CardTitle>
                <CardDescription>
                  Navegue pelos dias da experiência para visualizar o conteúdo
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                  disabled={currentDay === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-3 py-1 bg-muted rounded text-sm font-medium">
                  Dia {currentDay} de {totalDays}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDay(Math.min(totalDays, currentDay + 1))}
                  disabled={currentDay === totalDays}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentDayContent ? (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {currentDayContent.title}
                  </h3>
                </div>

                {/* Verse */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Versículo do Dia</h4>
                  <blockquote className="text-muted-foreground italic mb-2">
                    "{currentDayContent.verse}"
                  </blockquote>
                  <cite className="text-sm text-muted-foreground font-medium">
                    {currentDayContent.verse_reference}
                  </cite>
                </div>

                {/* Devotional */}
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    Devocional
                  </h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {currentDayContent.devotional}
                    </p>
                  </div>
                </div>

                {/* Reflection Questions */}
                {currentDayContent.reflection_questions && currentDayContent.reflection_questions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Perguntas para Reflexão
                    </h4>
                    <ul className="space-y-2">
                      {currentDayContent.reflection_questions.map((question, index) => (
                        <li key={index} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary font-medium">{index + 1}.</span>
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Prayer */}
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Oração
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentDayContent.prayer}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Conteúdo não encontrado para o dia {currentDay}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}