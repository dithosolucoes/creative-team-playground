import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  Save,
  Eye,
  Copy,
  Zap,
  Loader2,
  Plus,
  Trash2,
  Edit3
} from "lucide-react";

interface DayContent {
  day: number;
  title: string;
  devotional: string;
  scripture: {
    reference: string;
    text: string;
  };
  quiz: {
    question: string;
    options: string[];
    correct: number;
  }[];
  prayer: string;
}

interface ExperienceData {
  title: string;
  description: string;
  template_id: number;
  totalDays: number;
  content: DayContent[];
}

const templates = [
  { id: 1, name: "Clássico", description: "Design elegante e tradicional" },
  { id: 2, name: "Moderno", description: "Interface contemporânea e clean" },
  { id: 3, name: "Sereno", description: "Cores suaves e relaxantes" }
];

export default function ExperienciaCriar() {
  const [currentStep, setCurrentStep] = useState(1);
  const [experienceData, setExperienceData] = useState<ExperienceData>({
    title: "",
    description: "",
    template_id: 1,
    totalDays: 21,
    content: []
  });
  const [currentDay, setCurrentDay] = useState(1);
  const [gptResponse, setGptResponse] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateExperienceData = (field: string, value: any) => {
    setExperienceData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generatePrompt = () => {
    const prompt = `Crie uma experiência devocional completa seguindo exatamente este formato:

**INFORMAÇÕES:**
- Título: ${experienceData.title}
- Descrição: ${experienceData.description}  
- Duração: ${experienceData.totalDays} dias

**INSTRUÇÕES IMPORTANTES:**
Responda EXATAMENTE neste formato (copie a estrutura):

EXPERIÊNCIA: ${experienceData.totalDays} DIAS

=== DIA 1 ===
TÍTULO: [Título inspirador para o dia]
DEVOCIONAL: [Texto de 200-300 palavras sobre o tema do dia]
PASSAGEM: [Referência bíblica] - "[Texto da passagem bíblica]"
QUIZ:
P1: [Pergunta reflexiva sobre o conteúdo]
A) [Opção A]
B) [Opção B] (CORRETA)
C) [Opção C]
D) [Opção D]

P2: [Segunda pergunta]
A) [Opção A] (CORRETA)
B) [Opção B]
C) [Opção C]
D) [Opção D]

P3: [Terceira pergunta]
A) [Opção A]
B) [Opção B]
C) [Opção C] (CORRETA)
D) [Opção D]
ORAÇÃO: [Oração direcionada para o tema do dia]

=== DIA 2 ===
[Repetir o mesmo formato para todos os ${experienceData.totalDays} dias]

IMPORTANTE: Crie TODOS os ${experienceData.totalDays} dias seguindo exatamente esta estrutura!`;

    setGeneratedPrompt(prompt);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Prompt copiado!",
      description: "Cole no ChatGPT para gerar o conteúdo."
    });
  };

  const parseGptResponse = () => {
    setIsProcessing(true);
    try {
      const content = gptResponse.trim();
      
      // Parse the text format
      const experienceMatch = content.match(/EXPERIÊNCIA:\s*(\d+)\s*DIAS/i);
      const totalDays = experienceMatch ? parseInt(experienceMatch[1]) : 0;
      
      if (totalDays === 0) {
        throw new Error("Número de dias não encontrado no formato correto");
      }
      
      // Extract days
      const dayRegex = /=== DIA (\d+) ===\s*TÍTULO:\s*(.*?)\s*DEVOCIONAL:\s*([\s\S]*?)PASSAGEM:\s*(.*?)\s*QUIZ:\s*([\s\S]*?)ORAÇÃO:\s*([\s\S]*?)(?=\s*===|$)/gi;
      const days: DayContent[] = [];
      let dayMatch;
      
      while ((dayMatch = dayRegex.exec(content)) !== null) {
        const [, dayNum, title, devotional, passage, quizSection, prayer] = dayMatch;
        
        // Parse quiz questions
        const quiz = [];
        const questionRegex = /P(\d+):\s*(.*?)\s*A\)\s*(.*?)\s*(?:\(CORRETA\))?\s*B\)\s*(.*?)\s*(?:\(CORRETA\))?\s*C\)\s*(.*?)\s*(?:\(CORRETA\))?\s*D\)\s*(.*?)\s*(?:\(CORRETA\))?/g;
        let questionMatch;
        
        while ((questionMatch = questionRegex.exec(quizSection)) !== null) {
          const [fullMatch, qNum, question, optA, optB, optC, optD] = questionMatch;
          const options = [
            optA.replace(/\s*\(CORRETA\)/, '').trim(), 
            optB.replace(/\s*\(CORRETA\)/, '').trim(), 
            optC.replace(/\s*\(CORRETA\)/, '').trim(), 
            optD.replace(/\s*\(CORRETA\)/, '').trim()
          ];
          
          // Find correct answer
          let correct = 0;
          if (fullMatch.includes('A) ' + optA + ' (CORRETA)')) correct = 0;
          else if (fullMatch.includes('B) ' + optB + ' (CORRETA)')) correct = 1;
          else if (fullMatch.includes('C) ' + optC + ' (CORRETA)')) correct = 2;
          else if (fullMatch.includes('D) ' + optD + ' (CORRETA)')) correct = 3;
          
          quiz.push({
            question: question.trim(),
            options,
            correct
          });
        }
        
        // Parse scripture
        const scriptureRegex = /(.*?)\s*-\s*"(.*)"/;
        const scriptureMatch = passage.match(scriptureRegex);
        const scripture = scriptureMatch 
          ? { reference: scriptureMatch[1].trim(), text: scriptureMatch[2].trim() }
          : { reference: passage.trim(), text: "" };
        
        days.push({
          day: parseInt(dayNum),
          title: title.trim(),
          devotional: devotional.trim(),
          scripture,
          quiz,
          prayer: prayer.trim()
        });
      }
      
      if (days.length === 0) {
        throw new Error("Nenhum dia foi encontrado no formato correto");
      }

      updateExperienceData("content", days);
      
      toast({
        title: "Conteúdo importado!",
        description: `${days.length} dias de experiência criados com sucesso.`
      });
      
    } catch (error) {
      toast({
        title: "Erro ao importar",
        description: error instanceof Error ? error.message : "Verifique se a resposta está no formato correto.",
        variant: "destructive"
      });
      console.error("Erro ao processar:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const saveExperience = async () => {
    if (!experienceData.title || !experienceData.description || experienceData.content.length === 0) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos e gere o conteúdo.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('experiences')
        .insert({
          title: experienceData.title,
          description: experienceData.description,
          template_id: experienceData.template_id,
          content: experienceData.content as any,
          is_active: true
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving experience:', error);
        toast({
          title: "Erro ao salvar",
          description: "Ocorreu um erro ao salvar a experiência. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Experiência salva!",
        description: `"${experienceData.title}" criada com sucesso.`
      });
      
      navigate("/admin/experiencias");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep1 = () => (
    <Card className="shadow-soft border-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Informações Básicas
        </CardTitle>
        <CardDescription>
          Defina as informações gerais da sua experiência
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título da Experiência</Label>
          <Input
            id="title"
            placeholder="Ex: Transformação 30 Dias"
            value={experienceData.title}
            onChange={(e) => updateExperienceData("title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Descreva o propósito e objetivo desta experiência..."
            value={experienceData.description}
            onChange={(e) => updateExperienceData("description", e.target.value)}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Duração (dias)</Label>
            <Select 
              value={experienceData.totalDays.toString()} 
              onValueChange={(value) => updateExperienceData("totalDays", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="14">14 dias</SelectItem>
                <SelectItem value="21">21 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Template Visual</Label>
            <Select 
              value={experienceData.template_id.toString()} 
              onValueChange={(value) => updateExperienceData("template_id", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id.toString()}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card className="shadow-soft border-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Geração de Conteúdo
          </CardTitle>
          <CardDescription>
            Use IA para gerar todo o conteúdo da experiência
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">📋 Como gerar conteúdo:</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Clique em "Gerar Prompt" para criar as instruções</li>
              <li>Copie o prompt e cole no ChatGPT</li>
              <li>Aguarde a resposta completa da IA</li>
              <li>Cole a resposta aqui e processe</li>
            </ol>
          </div>

          {/* Generate and Copy Prompt */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={generatePrompt}
              variant="outline"
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Gerar Prompt
            </Button>
            
            <Button 
              onClick={copyPrompt}
              disabled={!generatedPrompt}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copiar Prompt
            </Button>
          </div>

          {/* Prompt Preview */}
          {generatedPrompt && (
            <div className="space-y-3">
              <Label>Preview do Prompt:</Label>
              <div className="bg-gray-50 border rounded-lg p-4 max-h-48 overflow-y-auto">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                  {generatedPrompt}
                </pre>
              </div>
            </div>
          )}

          {/* Paste Response */}
          <div className="space-y-3">
            <Label htmlFor="gpt-response">
              Cole a resposta completa do ChatGPT:
            </Label>
            <Textarea
              id="gpt-response"
              placeholder="Cole aqui toda a resposta do ChatGPT..."
              value={gptResponse}
              onChange={(e) => setGptResponse(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
            <div className="flex justify-end">
              <Button 
                onClick={parseGptResponse}
                disabled={!gptResponse || isProcessing}
                className="gap-2"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                Processar Conteúdo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card className="shadow-soft border-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Revisão e Preview
          </CardTitle>
          <CardDescription>
            {experienceData.content.length} dias de conteúdo gerados • Revise antes de salvar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {experienceData.content.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum conteúdo gerado ainda.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Volte ao passo anterior para gerar o conteúdo.
              </p>
            </div>
          ) : (
            <>
              {/* Day Navigator */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <Button
                  variant="outline"
                  onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                  disabled={currentDay === 1}
                  size="sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Visualizando</div>
                  <div className="font-semibold">Dia {currentDay} de {experienceData.content.length}</div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentDay(Math.min(experienceData.content.length, currentDay + 1))}
                  disabled={currentDay === experienceData.content.length}
                  size="sm"
                >
                  Próximo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Day Content Preview */}
              {(() => {
                const day = experienceData.content.find(d => d.day === currentDay);
                return day ? (
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b">
                      <h2 className="text-2xl font-bold">{day.title}</h2>
                      <Badge variant="outline">Dia {day.day}</Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-primary mb-2">📖 Devocional</h3>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <p className="text-sm leading-relaxed">{day.devotional}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-secondary mb-2">📜 Passagem Bíblica</h3>
                        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                          <p className="font-semibold mb-2">{day.scripture.reference}</p>
                          <p className="text-sm italic">{day.scripture.text}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-accent mb-2">🤔 Quiz ({day.quiz.length} perguntas)</h3>
                        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-3">
                          {day.quiz.map((q, idx) => (
                            <div key={idx} className="text-sm">
                              <p className="font-medium mb-2">{idx + 1}. {q.question}</p>
                              <div className="grid grid-cols-2 gap-2 ml-4">
                                {q.options.map((option, optIdx) => (
                                  <div 
                                    key={optIdx}
                                    className={`text-xs p-2 rounded ${
                                      optIdx === q.correct 
                                        ? 'bg-green-100 text-green-800 border border-green-300' 
                                        : 'bg-gray-50'
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optIdx)}) {option}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-purple-600 mb-2">🙏 Oração</h3>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-sm italic">{day.prayer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return !!(experienceData.title && experienceData.description);
      case 2: return experienceData.content.length > 0;
      case 3: return experienceData.content.length > 0;
      default: return false;
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/experiencias")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Criar Experiência</h1>
            <p className="text-muted-foreground">
              Passo {currentStep} de {totalSteps}
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progresso</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps Content */}
      <div className="space-y-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </Button>

        <Button 
          variant="default" 
          onClick={currentStep === totalSteps ? saveExperience : nextStep}
          disabled={!isStepValid() || isSaving}
          className="gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : currentStep === totalSteps ? (
            <>
              <Save className="h-4 w-4" />
              Salvar Experiência
            </>
          ) : (
            <>
              Próximo
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}