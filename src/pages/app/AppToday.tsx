import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Play, 
  CheckCircle,
  BookOpen,
  MessageCircle,
  Star,
  Clock,
  Flame
} from "lucide-react";

export default function AppToday() {
  const [currentDay] = useState(7);
  const [completedToday, setCompletedToday] = useState(false);
  
  const todayContent = {
    day: currentDay,
    title: "Encontrando Propósito na Gratidão",
    verse: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    verseRef: "1 Tessalonicenses 5:18",
    reflection: "A gratidão é uma das chaves mais poderosas para uma vida transformada. Quando escolhemos ser gratos, mudamos nossa perspectiva e abrimos nosso coração para as bênçãos de Deus.",
    tasks: [
      { id: 1, title: "Leia a reflexão", completed: true },
      { id: 2, title: "Faça a meditação guiada", completed: false },
      { id: 3, title: "Responda as perguntas", completed: false },
      { id: 4, title: "Pratique gratidão", completed: false }
    ]
  };

  const completedTasks = todayContent.tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / todayContent.tasks.length) * 100;

  const handleMarkComplete = () => {
    setCompletedToday(true);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Day Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Dia {todayContent.day} de 21
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
              {completedTasks}/{todayContent.tasks.length}
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
              1. Quais são 3 coisas pelas quais você é grato hoje?
            </p>
            <div className="h-20 bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
              Toque para escrever...
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium text-foreground">
              2. Como a gratidão pode transformar seu dia?
            </p>
            <div className="h-20 bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
              Toque para escrever...
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complete Day */}
      <Card className="border-soft shadow-soft">
        <CardContent className="p-6">
          {!completedToday ? (
            <Button 
              onClick={handleMarkComplete}
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