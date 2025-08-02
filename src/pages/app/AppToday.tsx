import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Play,
  CheckCircle,
  BookOpen,
  MessageCircle,
  Clock,
  Flame,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

// Interfaces para definir a estrutura dos dados
interface DailyContent {
  day: number;
  title?: string;
  titulo?: string;
  scripture?: { text?: string; reference?: string };
  passagem?: { texto?: string; referencia?: string };
  devotional?: string;
  quiz?: { question: string }[];
  questions?: string[];
  prayer?: string;
  oracao?: string;
  action?: string;
}

interface ExperienceData {
  title: string;
  description: string;
  content: Json;
}

// Função "Type Guard" para garantir a estrutura correta do conteúdo diário
function isDailyContent(value: any): value is DailyContent {
  return (
    typeof value === "object" && value !== null && typeof value.day === "number"
  );
}

export default function AppToday() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);
  const [productId, setProductId] = useState<string | null>(null);
  const [completedToday, setCompletedToday] = useState(false);
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(
    null
  );
  const [reflections, setReflections] = useState({
    question1: "",
    question2: "",
  });

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    try {
      setLoading(true);

      const { data: purchase, error: purchaseError } = await supabase
        .from("purchases")
        .select(
          `
          products!inner( id, title, description, content, experiences( id, title, content ) )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (purchaseError) throw purchaseError;

      const product = purchase.products as any;
      const experience = product.experiences as any;
      const definitiveContent = product.content || experience?.content;

      if (!definitiveContent) {
        toast({ title: "Conteúdo não encontrado", variant: "destructive" });
        return;
      }

      setProductId(product.id); // Armazena o ID do produto para uso posterior

      const { data: progress, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .order("day_number", { ascending: false });

      if (progressError) throw progressError;

      const lastCompletedDay =
        progress && progress.length > 0
          ? Math.max(...progress.map((p) => p.day_number))
          : 0;
      let totalDays = 21;
      if (Array.isArray(definitiveContent)) {
        totalDays = definitiveContent.length;
      }

      const nextDay = Math.min(lastCompletedDay + 1, totalDays);
      setCurrentDay(nextDay);

      setExperienceData({
        title: product.title,
        description: product.description,
        content: definitiveContent,
      });

      const todayProgress = progress?.find(
        (p: any) => p.day_number === nextDay
      );
      setCompletedToday(!!todayProgress?.completed);
    } catch (error: any) {
      console.error("Erro ao buscar progresso:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar sua experiência.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProgress = async () => {
    if (!user || !productId) {
      toast({
        title: "Erro",
        description: "Usuário ou produto não identificado.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("user_progress").upsert(
        {
          user_id: user.id,
          product_id: productId,
          day_number: currentDay,
          completed: true,
          data: {
            reflections: reflections,
            completed_at: new Date().toISOString(),
          },
        },
        { onConflict: "user_id, product_id, day_number" }
      );

      if (error) throw error;

      setCompletedToday(true);
      toast({
        title: "Progresso salvo!",
        description: "Parabéns por completar mais um dia da sua jornada!",
      });
    } catch (error: any) {
      console.error("Erro ao salvar progresso:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar seu progresso. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando sua experiência...</p>
        </div>
      </div>
    );
  }

  if (!experienceData) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h2 className="text-xl font-bold mb-4">Nenhuma experiência ativa</h2>
        <p className="text-muted-foreground">
          Você ainda não possui nenhuma experiência ativa. Adquira uma
          experiência para começar sua jornada!
        </p>
      </div>
    );
  }

  const mainContent = experienceData.content;
  let dailyContent: DailyContent | null = null;
  let totalDays = 21;

  if (Array.isArray(mainContent)) {
    const foundDay = mainContent.find(
      (item) => isDailyContent(item) && item.day === currentDay
    );
    dailyContent = (foundDay || null) as any;
    totalDays = mainContent.length > 0 ? mainContent.length : 21;
  }

  const todayContent = {
    day: currentDay,
    title: dailyContent?.title || dailyContent?.titulo || `Dia ${currentDay}`,
    verse:
      dailyContent?.scripture?.text ||
      dailyContent?.passagem?.texto ||
      "Versículo não encontrado.",
    verseRef:
      dailyContent?.scripture?.reference ||
      dailyContent?.passagem?.referencia ||
      "",
    reflection: dailyContent?.devotional || "Reflexão não encontrada.",
    action: dailyContent?.action || "Reflita sobre seu crescimento pessoal",
    questions: dailyContent?.quiz?.map((q) => q.question) ||
      dailyContent?.questions || [
        "O que você aprendeu hoje?",
        "Como pode aplicar isso na sua vida?",
      ],
    meditation:
      dailyContent?.prayer ||
      dailyContent?.oracao ||
      "Dedique alguns minutos para meditar e refletir.",
  };

  const tasks = [
    { id: 1, title: "Leia a reflexão", completed: true },
    { id: 2, title: "Faça a meditação guiada", completed: false }, // Esta lógica pode ser implementada depois
    {
      id: 3,
      title: "Responda as perguntas",
      completed: !!(reflections.question1 && reflections.question2),
    },
    { id: 4, title: "Complete a ação do dia", completed: false }, // Esta lógica pode ser implementada depois
  ];

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Day Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Dia {todayContent.day} de {totalDays}
        </Badge>
        <h1 className="text-2xl font-bold text-foreground">
          {experienceData.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {experienceData.description}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>15-20 minutos</span>
        </div>
      </div>

      {/* Progress */}
      <Card className="border-soft shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">
              Progresso de Hoje
            </span>
            <span className="text-sm text-muted-foreground">
              {completedTasks}/{tasks.length}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Daily Verse */}
      <Card className="border-soft shadow-soft bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            Versículo do Dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-foreground font-medium mb-2 italic">
            "{todayContent.verse}"
          </blockquote>
          <cite className="text-sm text-muted-foreground">
            {todayContent.verseRef}
          </cite>
        </CardContent>
      </Card>

      {/* Reflection */}
      <Card className="border-soft shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-destructive" />
            Reflexão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {todayContent.reflection}
          </p>
        </CardContent>
      </Card>

      {/* Guided Meditation */}
      <Card className="border-soft shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-success" />
            Meditação Guiada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Gratidão e Presença</p>
              <p className="text-sm text-muted-foreground">7 minutos</p>
            </div>
            <Button className="bg-success hover:bg-success/90">
              <Play className="h-4 w-4 mr-2" />
              Iniciar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Questions */}
      <Card className="border-soft shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-warning" />
            Reflexões Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium text-foreground">
              {todayContent.questions[0]}
            </p>
            <Textarea
              placeholder="Escreva sua reflexão..."
              value={reflections.question1}
              onChange={(e) =>
                setReflections((prev) => ({
                  ...prev,
                  question1: e.target.value,
                }))
              }
              className="min-h-20"
            />
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">
              {todayContent.questions[1]}
            </p>
            <Textarea
              placeholder="Escreva sua reflexão..."
              value={reflections.question2}
              onChange={(e) =>
                setReflections((prev) => ({
                  ...prev,
                  question2: e.target.value,
                }))
              }
              className="min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Complete Day */}
      <Card className="border-soft shadow-soft">
        <CardContent className="p-6">
          {!completedToday ? (
            <Button
              onClick={handleSaveProgress}
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
              disabled={progressPercentage < 75} // Desabilita o botão se as tarefas não estiverem completas
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Marcar Dia Como Completo
            </Button>
          ) : (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-success">
                <CheckCircle className="h-6 w-6" />
                <span className="text-lg font-semibold">Dia Concluído!</span>
              </div>
              <p className="text-muted-foreground">
                Parabéns! Você completou mais um dia da sua jornada.
              </p>
              <div className="flex items-center justify-center gap-1 mt-4">
                <Flame className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium text-warning">
                  Sequência de {currentDay} dias!
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
