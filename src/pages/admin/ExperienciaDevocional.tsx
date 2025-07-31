import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Users, Calendar, Smartphone, ChevronRight, Book, MessageCircle, HelpCircle, Heart, ChevronLeft, TrendingUp, Home, User, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Template Clássico",
    description: "Cards em lista vertical, design tradicional",
    preview: "bg-gradient-to-br from-blue-50 to-indigo-100",
    accent: "bg-blue-500",
    layout: "classic"
  },
  {
    id: 2,
    name: "Template Moderno",
    description: "Layout dinâmico com gradientes e elementos visuais",
    preview: "bg-gradient-to-br from-purple-50 to-pink-100",
    accent: "bg-purple-500",
    layout: "modern"
  },
  {
    id: 3,
    name: "Template Sereno",
    description: "Espaçamento maior, cores suaves, minimalista",
    preview: "bg-gradient-to-br from-green-50 to-emerald-100",
    accent: "bg-emerald-500",
    layout: "serene"
  }
];

const mockDays = Array.from({ length: 21 }, (_, i) => ({
  day: i + 1,
  completed: i < 3,
  title: `Dia ${i + 1}`
}));

const mockContent = {
  devocional: {
    title: "A Importância da Oração",
    content: "A oração é o meio pelo qual nos comunicamos com Deus. É através dela que expressamos nossa gratidão, apresentamos nossos pedidos e buscamos direcionamento divino. Quando oramos, entramos em intimidade com o Criador do universo..."
  },
  passagem: {
    reference: "Filipenses 4:6-7",
    text: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus."
  },
  quiz: {
    question: "Segundo o texto de hoje, o que devemos fazer quando estamos ansiosos?",
    options: ["Nos preocupar mais", "Orar e apresentar nossos pedidos a Deus", "Ignorar os problemas", "Buscar soluções sozinhos"]
  },
  oracao: {
    title: "Oração de Gratidão",
    content: "Senhor, obrigado por este novo dia. Obrigado pela oportunidade de crescer espiritualmente através desta jornada. Ajude-me a aplicar os ensinamentos em minha vida..."
  }
};

export default function ExperienciaDevocional() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const getVisibleDays = () => {
    const startDay = currentWeek * 7;
    return mockDays.slice(startDay, startDay + 7);
  };

  const handleCardExpand = (cardType: string) => {
    setExpandedCard(expandedCard === cardType ? null : cardType);
  };

  const openSectionPopup = (section: string) => {
    setOpenPopup(section);
    setCurrentSection(0);
  };

  const getTemplateStyles = (template: any, cardType: string) => {
    const baseStyles = "transition-all duration-300 cursor-pointer";
    
    switch (template.layout) {
      case "classic":
        return `${baseStyles} bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md`;
      case "modern":
        return `${baseStyles} bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 shadow-sm hover:shadow-lg border-l-4 border-${template.accent.split('-')[1]}-500`;
      case "serene":
        return `${baseStyles} bg-white/90 backdrop-blur rounded-2xl p-6 border border-gray-100 hover:bg-white`;
      default:
        return `${baseStyles} bg-white rounded-lg p-4`;
    }
  };

  const getCardIcon = (type: string) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case "devocional": return <Book className={iconClass} />;
      case "passagem": return <MessageCircle className={iconClass} />;
      case "quiz": return <HelpCircle className={iconClass} />;
      case "oracao": return <Heart className={iconClass} />;
      default: return null;
    }
  };

  const sections = ["devocional", "passagem", "quiz", "oracao"];
  const sectionTitles = {
    devocional: "Devocional",
    passagem: "Passagem Bíblica",
    quiz: "Quiz",
    oracao: "Oração"
  };

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
                  Uma jornada de crescimento espiritual através de devocionais diários, 
                  passagens bíblicas interativas, quiz de reflexão e momentos de oração guiada.
                  A duração será definida na criação do produto.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Duração configurável</span>
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
              <CardTitle>Layouts de Template</CardTitle>
              <CardDescription>
                Escolha o layout da tela "Hoje" para os usuários
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

        {/* Preview Mobile Interativo */}
        <div className="space-y-6">
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Preview Mobile 100% Interativo
              </CardTitle>
              <CardDescription>
                Clique nos cards e teste a experiência real do usuário
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
                  <div className={`flex-1 h-[calc(100%-4rem)] ${templates.find(t => t.id === selectedTemplate)?.preview} p-4 overflow-y-auto`}>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-lg font-bold text-gray-800">Olá, João!</h2>
                      <p className="text-sm text-gray-600">Continue sua jornada espiritual</p>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progresso</span>
                        <span className="text-sm text-gray-600">3 dias completados</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '14%' }}></div>
                      </div>
                    </div>

                    {/* Week Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                        disabled={currentWeek === 0}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium text-gray-700">
                        Semana {currentWeek + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                        disabled={currentWeek >= 2}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Days Grid - Only 7 days */}
                    <div className="grid grid-cols-7 gap-2 mb-6">
                      {getVisibleDays().map((day) => (
                        <div
                          key={day.day}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            day.completed
                              ? 'bg-blue-500 text-white'
                              : day.day === 4 && currentWeek === 0
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
                      
                      {/* Cards with Template Styling */}
                      <div className={selectedTemplate === 3 ? "space-y-4" : "space-y-2"}>
                        {/* Devocional Card */}
                        <div 
                          className={getTemplateStyles(templates.find(t => t.id === selectedTemplate), "devocional")}
                          onClick={() => handleCardExpand("devocional")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getCardIcon("devocional")}
                              <span className="text-sm font-medium text-gray-700">Devocional</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                              expandedCard === "devocional" ? "rotate-180" : ""
                            }`} />
                          </div>
                          {expandedCard === "devocional" && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-600 mb-2">A Importância da Oração</p>
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openSectionPopup("devocional");
                                }}
                                className="h-6 text-xs"
                              >
                                Ler
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {/* Passagem Card */}
                        <div 
                          className={getTemplateStyles(templates.find(t => t.id === selectedTemplate), "passagem")}
                          onClick={() => handleCardExpand("passagem")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getCardIcon("passagem")}
                              <span className="text-sm font-medium text-gray-700">Passagem</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                              expandedCard === "passagem" ? "rotate-180" : ""
                            }`} />
                          </div>
                          {expandedCard === "passagem" && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-600 mb-2">Filipenses 4:6-7</p>
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openSectionPopup("passagem");
                                }}
                                className="h-6 text-xs"
                              >
                                Ler
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {/* Quiz Card */}
                        <div 
                          className={getTemplateStyles(templates.find(t => t.id === selectedTemplate), "quiz")}
                          onClick={() => handleCardExpand("quiz")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getCardIcon("quiz")}
                              <span className="text-sm font-medium text-gray-700">Quiz</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                              expandedCard === "quiz" ? "rotate-180" : ""
                            }`} />
                          </div>
                          {expandedCard === "quiz" && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-600 mb-2">Pergunta de reflexão</p>
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openSectionPopup("quiz");
                                }}
                                className="h-6 text-xs"
                              >
                                Responder
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {/* Oração Card */}
                        <div 
                          className={getTemplateStyles(templates.find(t => t.id === selectedTemplate), "oracao")}
                          onClick={() => handleCardExpand("oracao")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getCardIcon("oracao")}
                              <span className="text-sm font-medium text-gray-700">Oração</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                              expandedCard === "oracao" ? "rotate-180" : ""
                            }`} />
                          </div>
                          {expandedCard === "oracao" && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-600 mb-2">Oração de Gratidão</p>
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openSectionPopup("oracao");
                                }}
                                className="h-6 text-xs"
                              >
                                Orar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation - Reordered */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around">
                    {/* Crescimento */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-400">Crescimento</span>
                    </div>
                    
                    {/* Hoje - Center */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Home className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs text-blue-600 font-medium">Hoje</span>
                    </div>
                    
                    {/* Perfil */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-400">Perfil</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Popup Fullscreen */}
      <Dialog open={!!openPopup} onOpenChange={() => setOpenPopup(null)}>
        <DialogContent className="max-w-md h-[80vh] p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg">
                  {openPopup && sectionTitles[openPopup as keyof typeof sectionTitles]}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenPopup(null)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {openPopup === "devocional" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{mockContent.devocional.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{mockContent.devocional.content}</p>
                </div>
              )}
              
              {openPopup === "passagem" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{mockContent.passagem.reference}</h3>
                  <p className="text-gray-700 leading-relaxed italic">{mockContent.passagem.text}</p>
                </div>
              )}
              
              {openPopup === "quiz" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pergunta de Reflexão</h3>
                  <p className="text-gray-700">{mockContent.quiz.question}</p>
                  <div className="space-y-2">
                    {mockContent.quiz.options.map((option, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {openPopup === "oracao" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{mockContent.oracao.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{mockContent.oracao.content}</p>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = sections.indexOf(openPopup!);
                  if (currentIndex > 0) {
                    setOpenPopup(sections[currentIndex - 1]);
                  }
                }}
                disabled={sections.indexOf(openPopup!) === 0}
              >
                Anterior
              </Button>
              
              <span className="flex items-center text-sm text-gray-600">
                {sections.indexOf(openPopup!) + 1} de {sections.length}
              </span>
              
              <Button
                onClick={() => {
                  const currentIndex = sections.indexOf(openPopup!);
                  if (currentIndex < sections.length - 1) {
                    setOpenPopup(sections[currentIndex + 1]);
                  }
                }}
                disabled={sections.indexOf(openPopup!) === sections.length - 1}
              >
                Próximo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}