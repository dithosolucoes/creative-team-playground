import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar,
  Star,
  Trophy,
  Flame,
  Target,
  CheckCircle,
  BarChart,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function AppGrowth() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    currentDay: 0,
    totalDays: 21,
    streak: 0,
    completionRate: 0,
    totalReflections: 0,
    meditationMinutes: 0
  });
  const [achievements, setAchievements] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState([]);

  useEffect(() => {
    if (user) {
      fetchGrowthData();
    }
  }, [user]);

  const fetchGrowthData = async () => {
    try {
      setLoading(true);

      // Get user's active product
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
      const experienceContent = experience?.content as any;
      const totalDays = experienceContent?.days || 21;

      // Get all user progress
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', userProduct.product_id)
        .order('day_number', { ascending: true });

      if (progressError) throw progressError;

      // Calculate stats
      const completedDays = progress?.filter(p => p.completed).length || 0;
      const currentDay = Math.min(completedDays + 1, totalDays);
      
      // Calculate streak (consecutive days from the start)
      let streak = 0;
      if (progress) {
        for (let i = 1; i <= totalDays; i++) {
          const dayProgress = progress.find(p => p.day_number === i && p.completed);
          if (dayProgress) {
            streak = i;
          } else {
            break;
          }
        }
      }

      const completionRate = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
      
      // Count reflections (approximate based on completed days)
      const totalReflections = completedDays * 2; // Assuming 2 reflections per day
      
      // Mock meditation minutes
      const meditationMinutes = completedDays * 7; // 7 minutes per day

      setStats({
        currentDay,
        totalDays,
        streak,
        completionRate: Math.round(completionRate),
        totalReflections,
        meditationMinutes
      });

      // Generate achievements based on progress
      const generatedAchievements = [
        {
          id: 1,
          title: "Primeira Semana",
          description: "Complete 7 dias consecutivos",
          icon: Calendar,
          completed: streak >= 7,
          date: streak >= 7 ? "Concluído" : undefined,
          progress: streak >= 7 ? 100 : Math.min((streak / 7) * 100, 100)
        },
        {
          id: 2,
          title: "Reflexivo",
          description: "Escreva 10 reflexões pessoais",
          icon: Star,
          completed: totalReflections >= 10,
          date: totalReflections >= 10 ? "Concluído" : undefined,
          progress: totalReflections >= 10 ? 100 : Math.min((totalReflections / 10) * 100, 100)
        },
        {
          id: 3,
          title: "Meditador",
          description: "Complete 100 minutos de meditação",
          icon: Target,
          completed: meditationMinutes >= 100,
          date: meditationMinutes >= 100 ? "Concluído" : undefined,
          progress: meditationMinutes >= 100 ? 100 : Math.min((meditationMinutes / 100) * 100, 100)
        },
        {
          id: 4,
          title: "Transformador",
          description: "Complete toda a jornada",
          icon: Trophy,
          completed: completedDays >= totalDays,
          date: completedDays >= totalDays ? "Concluído" : undefined,
          progress: completedDays >= totalDays ? 100 : Math.min((completedDays / totalDays) * 100, 100)
        }
      ];

      setAchievements(generatedAchievements);

      // Generate weekly progress
      const weeks = [];
      for (let week = 1; week <= Math.ceil(totalDays / 7); week++) {
        const startDay = (week - 1) * 7 + 1;
        const endDay = Math.min(week * 7, totalDays);
        const weekDays = endDay - startDay + 1;
        
        const weekCompleted = progress?.filter(p => 
          p.day_number >= startDay && 
          p.day_number <= endDay && 
          p.completed
        ).length || 0;

        weeks.push({
          week: `Semana ${week}`,
          completed: weekCompleted,
          total: weekDays,
          percentage: weekDays > 0 ? (weekCompleted / weekDays) * 100 : 0
        });
      }

      setWeeklyProgress(weeks);

    } catch (error) {
      console.error('Error fetching growth data:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar seus dados de crescimento.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando dados de crescimento...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = (stats.currentDay / stats.totalDays) * 100;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Seu Crescimento</h1>
        <p className="text-muted-foreground">
          Acompanhe sua jornada de transformação
        </p>
      </div>

      {/* Main Progress */}
      <Card className="border-soft shadow-soft bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Progresso Geral
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Jornada de 21 Dias</span>
            <span className="text-sm text-muted-foreground">
              Dia {stats.currentDay} de {stats.totalDays}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-center">
            <span className="text-2xl font-bold text-primary">
              {Math.round(progressPercentage)}%
            </span>
            <p className="text-sm text-muted-foreground">concluído</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-soft shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-6 w-6 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.streak}</p>
            <p className="text-xs text-muted-foreground">dias seguidos</p>
          </CardContent>
        </Card>

        <Card className="border-soft shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.completionRate}%</p>
            <p className="text-xs text-muted-foreground">conclusão</p>
          </CardContent>
        </Card>

        <Card className="border-soft shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.totalReflections}</p>
            <p className="text-xs text-muted-foreground">reflexões</p>
          </CardContent>
        </Card>

        <Card className="border-soft shadow-soft">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart className="h-6 w-6 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.meditationMinutes}</p>
            <p className="text-xs text-muted-foreground">min meditação</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="border-soft shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Progresso Semanal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weeklyProgress.map((week, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {week.week}
                </span>
                <span className="text-sm text-muted-foreground">
                  {week.completed}/{week.total} dias
                </span>
              </div>
              <Progress value={week.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-soft shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  achievement.completed 
                    ? 'bg-success/10 border-success/20' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  achievement.completed 
                    ? 'bg-success text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {achievement.title}
                    </h3>
                    {achievement.completed && (
                      <Badge variant="secondary" className="bg-success text-white">
                        Concluído
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  
                  {!achievement.completed && achievement.progress && (
                    <div className="mt-2">
                      <Progress value={achievement.progress} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.progress}% concluído
                      </p>
                    </div>
                  )}
                </div>
                
                {achievement.completed && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {achievement.date}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}