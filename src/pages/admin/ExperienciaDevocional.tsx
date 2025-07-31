import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Star, Calendar, Smartphone, ChevronRight, Book, MessageCircle, HelpCircle, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Template Clássico",
    description: "Design limpo e minimalista focado na leitura",
    preview: "bg-gradient-to-br from-blue-50 to-indigo-100",
    accent: "bg-blue-500"
  },
  {
    id: 2,
    name: "Template Moderno",
    description: "Interface moderna com elementos visuais dinâmicos",
    preview: "bg-gradient-to-br from-purple-50 to-pink-100",
    accent: "bg-purple-500"
  },
  {
    id: 3,
    name: "Template Sereno",
    description: "Cores suaves para uma experiência contemplativa",
    preview: "bg-gradient-to-br from-green-50 to-emerald-100",
    accent: "bg-emerald-500"
  }
];

const mockDays = Array.from({ length: 24 }, (_, i) => ({
  day: i + 1,
  completed: i < 3,
  title: `Dia ${i + 1}`
}));

export default function ExperienciaDevocional() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/experiencias")}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experiência Devocional</h1>
          <p className="text-muted-foreground">
            Experiência de crescimento espiritual através de devocionais diários
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informações da Experiência */}
        <div className="space-y-6">
          {/* Detalhes */}
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Detalhes da Experiência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Devocional</h3>
                <p className="text-muted-foreground">
                  Uma jornada de 24 dias de crescimento espiritual através de devocionais diários, 
                  passagens bíblicas interativas, quiz de reflexão e momentos de oração guiada.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">24 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">0 participantes</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Espiritual
                </Badge>
                <Badge className="bg-success text-white text-xs">
                  Ativa
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Estrutura da Experiência */}
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle>Estrutura Diária</CardTitle>
              <CardDescription>
                Cada dia contém 4 componentes principais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <Book className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Devocional</p>
                  <p className="text-sm text-muted-foreground">Reflexão e ensinamento do dia</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Passagem Bíblica</p>
                  <p className="text-sm text-muted-foreground">Leitura guiada das escrituras</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <HelpCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Quiz</p>
                  <p className="text-sm text-muted-foreground">Perguntas de reflexão</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <Heart className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Oração</p>
                  <p className="text-sm text-muted-foreground">Momento de oração guiada</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle>Templates Disponíveis</CardTitle>
              <CardDescription>
                Escolha o visual da experiência para os usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${template.preview} border border-border relative overflow-hidden`}>
                      <div className={`absolute bottom-0 left-0 right-0 h-3 ${template.accent}`}></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview Mobile */}
        <div className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Preview Mobile Interativo
              </CardTitle>
              <CardDescription>
                Veja como a experiência aparece para os usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mobile Frame */}
              <div className="mx-auto w-80 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-black flex items-center justify-center">
                    <div className="w-16 h-1 bg-white rounded-full"></div>
                  </div>
                  
                  {/* App Content */}
                  <div className={`flex-1 ${templates.find(t => t.id === selectedTemplate)?.preview} p-4`}>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-lg font-bold text-gray-800">Olá, João!</h2>
                      <p className="text-sm text-gray-600">Continue sua jornada espiritual</p>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progresso</span>
                        <span className="text-sm text-gray-600">3/24 dias</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '12.5%' }}></div>
                      </div>
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-6 gap-2 mb-6">
                      {mockDays.slice(0, 18).map((day) => (
                        <div
                          key={day.day}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            day.completed
                              ? 'bg-blue-500 text-white'
                              : day.day === 4
                              ? 'bg-blue-100 text-blue-600 border-2 border-blue-500'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {day.completed ? '✓' : day.day}
                        </div>
                      ))}
                    </div>

                    {/* Today's Content */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-800 text-center">Hoje - Dia 4</h3>
                      
                      {/* Cards */}
                      <div className="space-y-2">
                        <div className="bg-white/80 backdrop-blur rounded-lg p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Book className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">Devocional</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="bg-white/80 backdrop-blur rounded-lg p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MessageCircle className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">Passagem</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="bg-white/80 backdrop-blur rounded-lg p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <HelpCircle className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">Quiz</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="bg-white/80 backdrop-blur rounded-lg p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Heart className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">Oração</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-6 h-6 bg-blue-500 rounded"></div>
                      <span className="text-xs text-blue-600 font-medium">Hoje</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <span className="text-xs text-gray-400">Crescimento</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <span className="text-xs text-gray-400">Perfil</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}