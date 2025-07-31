import React from "react";
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
  BarChart
} from "lucide-react";

export default function AppGrowth() {
  const stats = {
    currentDay: 7,
    totalDays: 21,
    streak: 7,
    completionRate: 95,
    totalReflections: 15,
    meditationMinutes: 98
  };

  const progressPercentage = (stats.currentDay / stats.totalDays) * 100;

  const achievements = [
    {
      id: 1,
      title: "Primeira Semana",
      description: "Complete 7 dias consecutivos",
      icon: Calendar,
      completed: true,
      date: "Hoje"
    },
    {
      id: 2,
      title: "Reflexivo",
      description: "Escreva 10 reflexões pessoais",
      icon: Star,
      completed: true,
      date: "Ontem"
    },
    {
      id: 3,
      title: "Meditador",
      description: "Complete 100 minutos de meditação",
      icon: Target,
      completed: false,
      progress: 98
    },
    {
      id: 4,
      title: "Transformador",
      description: "Complete toda a jornada de 21 dias",
      icon: Trophy,
      completed: false,
      progress: 33
    }
  ];

  const weeklyProgress = [
    { week: "Semana 1", completed: 7, total: 7, percentage: 100 },
    { week: "Semana 2", completed: 0, total: 7, percentage: 0 },
    { week: "Semana 3", completed: 0, total: 7, percentage: 0 }
  ];

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