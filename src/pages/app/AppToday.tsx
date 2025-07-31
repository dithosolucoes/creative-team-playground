import React, { useState, useEffect } from "react";
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
  Star,
  Clock,
  Flame,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function AppToday() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedToday, setCompletedToday] = useState(false);
  const [userProgress, setUserProgress] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [reflections, setReflections] = useState({
    question1: "",
    question2: ""
  });

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    try {
      setLoading(true);

      // First, get user's active product
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select(`
          *,
          products(
            *,
            experiences(*)
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1);

      if (purchasesError) throw purchasesError;

      if (!purchases || purchases.length === 0) {
        toast({
          title: "Nenhuma experiência encontrada",
          description: "Você ainda não possui nenhuma experiência ativa.",
          variant: "destructive"
        });
        return;
      }

      const userProduct = purchases[0];
      const experience = userProduct.products.experiences;

      // Get user progress for this product
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', userProduct.product_id)
        .order('day_number', { ascending: false })
        .limit(1);

      if (progressError) throw progressError;

      const lastCompletedDay = progress && progress.length > 0 ? progress[0].day_number : 0;
      const experienceContent = experience?.content as any;
      const nextDay = Math.min(lastCompletedDay + 1, experienceContent?.days || 21);

      setCurrentDay(nextDay);
      setExperienceData(experience);
      setUserProgress(progress && progress.length > 0 ? progress[0] : null);

      // Check if today is already completed
      const todayProgress = progress?.find(p => p.day_number === nextDay && p.completed);
      setCompletedToday(!!todayProgress);

    } catch (error) {
      console.error('Error fetching user progress:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar sua experiência.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProgress = async () => {
    try {
      if (!user || !experienceData) return;

      const { data: purchases } = await supabase
        .from('purchases')
        .select('product_id')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .limit(1);

      if (!purchases || purchases.length === 0) return;

      await supabase.from('user_progress').upsert({
        user_id: user.id,
        product_id: purchases[0].product_id,
        day_number: currentDay,
        completed: true,
        data: {
          reflections: reflections,
          completed_at: new Date().toISOString()
        },
        completed_at: new Date().toISOString()
      });

      setCompletedToday(true);
      toast({
        title: "Progresso salvo!",
        description: "Parabéns por completar mais um dia da sua jornada!",
      });

    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar seu progresso.",
        variant: "destructive"
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
          Você ainda não possui nenhuma experiência ativa. Adquira uma experiência para começar sua jornada!
        </p>
      </div>
    );
  }

  // Get current day content from experience data
  const experienceContent = experienceData?.content as any;
  const dailyContent = experienceContent?.daily_content?.[currentDay.toString()];
  
  const todayContent = {
    day: currentDay,
    title: dailyContent?.title || `Dia ${currentDay} - Reflexão Diária`,
    verse: dailyContent?.verse || "Renovai-vos no espírito do vosso entendimento - Efésios 4:23",
    verseRef: "Efésios 4:23",
    reflection: dailyContent?.reflection || "Hoje é um novo dia para crescer e se transformar. Aproveite cada momento desta jornada.",
    action: dailyContent?.action || "Reflita sobre seu crescimento pessoal",
    questions: dailyContent?.questions || [
      "O que você aprendeu hoje?",
      "Como pode aplicar isso na sua vida?"
    ],
    meditation: dailyContent?.meditation || "Dedique alguns minutos para meditar e refletir."
  };

  const tasks = [
    { id: 1, title: "Leia a reflexão", completed: true },
    { id: 2, title: "Faça a meditação guiada", completed: false },
    { id: 3, title: "Responda as perguntas", completed: reflections.question1 && reflections.question2 },
    { id: 4, title: "Complete a ação do dia", completed: false }
  ];

  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Day Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Dia {todayContent.day} de {(experienceData?.content as any)?.days || 21}
        </Badge>
        <h1 className="text-2xl font-bold text-foreground">
          {todayContent.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>15-20 minutos</span>
        </div>
      </div>

      {/* Progress */}
      <Card className="border-soft shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">Progresso de Hoje</span>
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
              onChange={(e) => setReflections(prev => ({...prev, question1: e.target.value}))}
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
              onChange={(e) => setReflections(prev => ({...prev, question2: e.target.value}))}
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
              disabled={progressPercentage < 75}
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