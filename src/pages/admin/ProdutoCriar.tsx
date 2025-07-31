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
import { 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  Smartphone, 
  Check, 
  Copy,
  Save,
  Eye,
  Palette,
  Type,
  Zap
} from "lucide-react";

interface ProductData {
  experienceId: string;
  title: string;
  description: string;
  price: string;
  category: string;
  template: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  content: any;
  landingPage: any;
}

const categories = [
  "Devocional",
  "Crescimento Espiritual", 
  "Oração",
  "Fé e Esperança",
  "Meditação Cristã",
  "Vida Cristã",
  "Propósito de Vida",
  "Relacionamento com Deus",
  "Transformação Pessoal",
  "Disciplina Espiritual"
];

const templates = [
  {
    id: "classico",
    name: "Clássico",
    description: "Design elegante e tradicional",
    colors: { primary: "#2563eb", secondary: "#64748b", accent: "#f59e0b" }
  },
  {
    id: "moderno", 
    name: "Moderno",
    description: "Interface contemporânea e clean",
    colors: { primary: "#7c3aed", secondary: "#6b7280", accent: "#10b981" }
  },
  {
    id: "sereno",
    name: "Sereno", 
    description: "Cores suaves e relaxantes",
    colors: { primary: "#059669", secondary: "#9ca3af", accent: "#f97316" }
  }
];

const fonts = [
  { id: "inter", name: "Inter", description: "Moderna e legível" },
  { id: "poppins", name: "Poppins", description: "Friendly e acessível" },
  { id: "playfair", name: "Playfair Display", description: "Elegante e clássica" },
  { id: "lora", name: "Lora", description: "Serif contemporânea" }
];

export default function ProdutoCriar() {
  const [currentStep, setCurrentStep] = useState(1);
  const [productData, setProductData] = useState<ProductData>({
    experienceId: "",
    title: "",
    description: "",
    price: "",
    category: "",
    template: "",
    colors: { primary: "", secondary: "", accent: "" },
    fonts: { heading: "", body: "" },
    content: null,
    landingPage: null
  });
  const [customCategory, setCustomCategory] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [gptResponse, setGptResponse] = useState("");
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [currentDay, setCurrentDay] = useState(1);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Auto-generate prompt when entering step 5
  React.useEffect(() => {
    if (currentStep === 5 && !generatedPrompt) {
      generatePrompt();
    }
  }, [currentStep, generatedPrompt]);

  const updateProductData = (field: string, value: any) => {
    setProductData(prev => ({ ...prev, [field]: value }));
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
    const prompt = `Olá! Preciso que você me ajude a criar uma experiência devocional completa.

**INFORMAÇÕES DO PRODUTO:**
- Título: ${productData.title}
- Descrição: ${productData.description}
- Categoria: ${productData.category}

**INSTRUÇÕES:**
Converse comigo para definir quantos dias será a experiência (entre 7 e 30 dias) e crie todo o conteúdo.

Para cada dia, você deve criar:
1. Um título inspirador para o dia
2. Um texto devocional de 200-300 palavras
3. Uma passagem bíblica com referência
4. 3-5 perguntas reflexivas com 4 opções de resposta cada (marque a resposta correta)
5. Uma oração direcionada

Também crie uma landing page persuasiva para vender o produto.

**IMPORTANTE: RESPONDA EM FORMATO DE TEXTO SIMPLES COMO ESTE EXEMPLO:**

EXPERIÊNCIA: 21 DIAS

=== DIA 1 ===
TÍTULO: Novo Amanhecer
DEVOCIONAL: [Texto completo do devocional aqui...]
PASSAGEM: João 3:16 - "Porque Deus amou o mundo de tal maneira..."
QUIZ:
P1: Qual é o principal tema deste devocional?
A) Amor de Deus (CORRETA)
B) Perdão
C) Fé
D) Esperança

P2: [Segunda pergunta]
A) Opção A
B) Opção B (CORRETA)
C) Opção C
D) Opção D
ORAÇÃO: [Texto da oração...]

=== DIA 2 ===
[Repetir o formato...]

=== LANDING PAGE ===
TÍTULO: [Título principal]
SUBTÍTULO: [Subtítulo]
BENEFÍCIOS: 
- Benefício 1
- Benefício 2
- Benefício 3
DEPOIMENTOS:
"Depoimento 1..."
"Depoimento 2..."
BOTÃO: [Texto do botão de compra]

Agora crie a experiência completa seguindo exatamente este formato!`;

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
    try {
      const content = gptResponse.trim();
      
      // Parse the text format
      const experienceMatch = content.match(/EXPERIÊNCIA:\s*(\d+)\s*DIAS/i);
      const totalDays = experienceMatch ? parseInt(experienceMatch[1]) : 0;
      
      if (totalDays === 0) {
        throw new Error("Número de dias não encontrado");
      }
      
      // Extract days
      const dayRegex = /=== DIA (\d+) ===\s*TÍTULO:\s*(.*?)\s*DEVOCIONAL:\s*([\s\S]*?)PASSAGEM:\s*(.*?)\s*QUIZ:\s*([\s\S]*?)ORAÇÃO:\s*([\s\S]*?)(?=\s*===|$)/gi;
      const days = [];
      let dayMatch;
      
      while ((dayMatch = dayRegex.exec(content)) !== null) {
        const [, dayNum, title, devotional, passage, quizSection, prayer] = dayMatch;
        
        // Parse quiz questions
        const quiz = [];
        const questionRegex = /P(\d+):\s*(.*?)\s*A\)\s*(.*?)\s*(?:\(CORRETA\))?\s*B\)\s*(.*?)\s*(?:\(CORRETA\))?\s*C\)\s*(.*?)\s*(?:\(CORRETA\))?\s*D\)\s*(.*?)\s*(?:\(CORRETA\))?/g;
        let questionMatch;
        
        while ((questionMatch = questionRegex.exec(quizSection)) !== null) {
          const [fullMatch, qNum, question, optA, optB, optC, optD] = questionMatch;
          const options = [optA.replace(/\s*\(CORRETA\)/, ''), optB.replace(/\s*\(CORRETA\)/, ''), optC.replace(/\s*\(CORRETA\)/, ''), optD.replace(/\s*\(CORRETA\)/, '')];
          
          // Find correct answer
          let correct = 0;
          if (fullMatch.includes(optA + ' (CORRETA)')) correct = 0;
          else if (fullMatch.includes(optB + ' (CORRETA)')) correct = 1;
          else if (fullMatch.includes(optC + ' (CORRETA)')) correct = 2;
          else if (fullMatch.includes(optD + ' (CORRETA)')) correct = 3;
          
          quiz.push({
            question: question.trim(),
            options: options.map(opt => opt.trim()),
            correct
          });
        }
        
        // Parse scripture
        const scriptureRegex = /(.*?)\s*-\s*"(.*)"/;
        const scriptureMatch = passage.match(scriptureRegex);
        const scripture = scriptureMatch 
          ? { reference: scriptureMatch[1].trim(), text: scriptureMatch[2].trim() }
          : { reference: passage.trim(), text: passage.trim() };
        
        days.push({
          day: parseInt(dayNum),
          title: title.trim(),
          devotional: devotional.trim(),
          scripture,
          quiz,
          prayer: prayer.trim()
        });
      }
      
      // Extract landing page
      const landingMatch = content.match(/=== LANDING PAGE ===\s*TÍTULO:\s*(.*?)\s*SUBTÍTULO:\s*(.*?)\s*BENEFÍCIOS:\s*([\s\S]*?)DEPOIMENTOS:\s*([\s\S]*?)BOTÃO:\s*(.*?)(?:\s*$)/i);
      
      let landingPage = null;
      if (landingMatch) {
        const [, headline, subheadline, benefitsSection, testimonialsSection, cta] = landingMatch;
        
        const benefits = benefitsSection.split(/\n/).filter(line => line.trim().startsWith('-')).map(line => line.replace(/^-\s*/, '').trim());
        const testimonials = testimonialsSection.split(/\n/).filter(line => line.trim().startsWith('"')).map(line => line.replace(/^"|"$/g, '').trim());
        
        landingPage = {
          headline: headline.trim(),
          subheadline: subheadline.trim(),
          benefits,
          testimonials,
          cta: cta.trim()
        };
      }
      
      const parsed = { days, landingPage };
      setParsedContent(parsed);
      updateProductData("content", parsed.days);
      updateProductData("landingPage", parsed.landingPage);
      
      toast({
        title: "Conteúdo importado!",
        description: `${parsed.days.length} dias de experiência criados.`
      });
      
    } catch (error) {
      toast({
        title: "Erro ao importar",
        description: "Verifique se a resposta está no formato correto conforme o exemplo.",
        variant: "destructive"
      });
      console.error("Erro ao processar:", error);
    }
  };

  const saveProduct = () => {
    // Here would integrate with Supabase to save the product
    toast({
      title: "Produto salvo!",
      description: "Seu produto foi criado com sucesso."
    });
    navigate("/admin/produtos");
  };

  const renderStep1 = () => (
    <Card className="shadow-soft border-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Escolher Experiência
        </CardTitle>
        <CardDescription>
          Selecione a experiência base para seu produto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                productData.experienceId === "devocional" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => {
                console.log("Experiência selecionada: devocional");
                updateProductData("experienceId", "devocional");
                console.log("ProductData após seleção:", { ...productData, experienceId: "devocional" });
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Experiência Devocional</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Jornada espiritual com devocionais diários, passagens bíblicas e reflexões
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline">Devocional</Badge>
                      <Badge variant="outline">Reflexão</Badge>
                      <Badge variant="outline">Oração</Badge>
                    </div>
                  </div>
                  {productData.experienceId === "devocional" && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="shadow-soft border-soft">
      <CardHeader>
        <CardTitle>Dados do Produto</CardTitle>
        <CardDescription>
          Defina as informações básicas do seu produto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Produto</Label>
          <Input
            id="title"
            placeholder="Ex: Transformação 21 Dias"
            value={productData.title}
            onChange={(e) => updateProductData("title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Descreva a experiência que seu produto oferece..."
            value={productData.description}
            onChange={(e) => updateProductData("description", e.target.value)}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              placeholder="97,00"
              value={productData.price}
              onChange={(e) => updateProductData("price", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select 
              value={productData.category} 
              onValueChange={(value) => {
                if (value === "custom") {
                  updateProductData("category", customCategory);
                } else {
                  updateProductData("category", value);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione ou digite" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
                <SelectItem value="custom">Digitar nova categoria</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {productData.category === customCategory && (
          <div className="space-y-2">
            <Label htmlFor="custom-category">Nova Categoria</Label>
            <Input
              id="custom-category"
              placeholder="Digite uma nova categoria"
              value={customCategory}
              onChange={(e) => {
                setCustomCategory(e.target.value);
                updateProductData("category", e.target.value);
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="shadow-soft border-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" />
          Template Visual
        </CardTitle>
        <CardDescription>
          Escolha o template que melhor representa sua experiência
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {templates.map(template => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 ${
                productData.template === template.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => updateProductData("template", template.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {Object.values(template.colors).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                  {productData.template === template.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => {
    const selectedTemplate = templates.find(t => t.id === productData.template);
    
    return (
      <Card className="shadow-soft border-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Design System
          </CardTitle>
          <CardDescription>
            Personalize as cores e fontes da sua experiência
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Cores
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Cor Primária</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={productData.colors.primary || selectedTemplate?.colors.primary}
                    onChange={(e) => updateProductData("colors", {
                      ...productData.colors,
                      primary: e.target.value
                    })}
                    className="w-12 h-10 p-1 border-soft"
                  />
                  <Input
                    value={productData.colors.primary || selectedTemplate?.colors.primary}
                    onChange={(e) => updateProductData("colors", {
                      ...productData.colors,
                      primary: e.target.value
                    })}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Cor Secundária</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={productData.colors.secondary || selectedTemplate?.colors.secondary}
                    onChange={(e) => updateProductData("colors", {
                      ...productData.colors,
                      secondary: e.target.value
                    })}
                    className="w-12 h-10 p-1 border-soft"
                  />
                  <Input
                    value={productData.colors.secondary || selectedTemplate?.colors.secondary}
                    onChange={(e) => updateProductData("colors", {
                      ...productData.colors,
                      secondary: e.target.value
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cor de Destaque</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={productData.colors.accent || selectedTemplate?.colors.accent}
                    onChange={(e) => updateProductData("colors", {
                      ...productData.colors,
                      accent: e.target.value
                    })}
                    className="w-12 h-10 p-1 border-soft"
                  />
                  <Input
                    value={productData.colors.accent || selectedTemplate?.colors.accent}
                    onChange={(e) => updateProductData("colors", {
                      ...productData.colors,
                      accent: e.target.value
                    })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Type className="h-4 w-4" />
              Tipografia
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fonte dos Títulos</Label>
                <Select 
                  value={productData.fonts.heading} 
                  onValueChange={(value) => updateProductData("fonts", {
                    ...productData.fonts,
                    heading: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map(font => (
                      <SelectItem key={font.id} value={font.id}>
                        <div>
                          <div className="font-semibold">{font.name}</div>
                          <div className="text-xs text-muted-foreground">{font.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fonte do Texto</Label>
                <Select 
                  value={productData.fonts.body} 
                  onValueChange={(value) => updateProductData("fonts", {
                    ...productData.fonts,
                    body: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map(font => (
                      <SelectItem key={font.id} value={font.id}>
                        <div>
                          <div className="font-semibold">{font.name}</div>
                          <div className="text-xs text-muted-foreground">{font.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStep5 = () => {
    return (
      <div className="space-y-6">
        <Card className="shadow-soft border-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Geração de Conteúdo com IA
            </CardTitle>
            <CardDescription>
              Siga as instruções abaixo para gerar o conteúdo da sua experiência
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">📋 Como usar:</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Clique no botão "Copiar Prompt para GPT" abaixo</li>
                <li>Abra o ChatGPT em uma nova aba</li>
                <li>Cole o prompt e envie</li>
                <li>Copie toda a resposta do ChatGPT</li>
                <li>Cole aqui na caixa de texto e clique em "Processar Conteúdo"</li>
              </ol>
            </div>

            {/* Copy Prompt Button */}
            <div className="flex justify-center">
              <Button 
                onClick={copyPrompt}
                className="gradient-primary text-white px-8 py-3 text-lg"
                disabled={!generatedPrompt}
              >
                <Copy className="h-5 w-5 mr-3" />
                Copiar Prompt para GPT
              </Button>
            </div>

            {/* Prompt Preview */}
            {generatedPrompt && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Preview do Prompt (será copiado automaticamente):</Label>
                <div className="bg-gray-50 border rounded-lg p-4 max-h-48 overflow-y-auto">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                    {generatedPrompt}
                  </pre>
                </div>
              </div>
            )}

            {/* Paste Response Area */}
            <div className="space-y-3">
              <Label htmlFor="gpt-response" className="text-base font-semibold">
                Cole aqui a resposta completa do ChatGPT:
              </Label>
              <Textarea
                id="gpt-response"
                placeholder="Cole toda a resposta do ChatGPT aqui, incluindo o código JSON..."
                value={gptResponse}
                onChange={(e) => setGptResponse(e.target.value)}
                rows={12}
                className="text-sm font-mono resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={parseGptResponse}
                  disabled={!gptResponse}
                  className="gradient-primary text-white px-6"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Processar Conteúdo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Navigator */}
        {parsedContent && (
          <Card className="shadow-soft border-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Navegador de Conteúdo
              </CardTitle>
              <CardDescription>
                {parsedContent.days?.length} dias de experiência criados • Navegue e revise o conteúdo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Day Navigator */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <Button
                  variant="outline"
                  onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                  disabled={currentDay === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Visualizando</div>
                  <div className="font-semibold">Dia {currentDay} de {parsedContent.days?.length}</div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentDay(Math.min(parsedContent.days?.length || 1, currentDay + 1))}
                  disabled={currentDay === parsedContent.days?.length}
                >
                  Próximo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Day Preview */}
              {parsedContent.days && (
                <div className="space-y-6">
                  {(() => {
                    const day = parsedContent.days.find((d: any) => d.day === currentDay);
                    return day ? (
                      <div className="space-y-4">
                        {/* Day Title */}
                        <div className="text-center pb-4 border-b">
                          <h2 className="text-2xl font-bold text-foreground">{day.title}</h2>
                          <p className="text-muted-foreground">Dia {day.day}</p>
                        </div>

                        {/* Devotional Section */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Devocional
                          </h3>
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <p className="text-sm leading-relaxed">{day.devotional}</p>
                          </div>
                        </div>

                        {/* Scripture Section */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
                            📖 Passagem Bíblica
                          </h3>
                          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                            <p className="font-semibold text-secondary mb-2">{day.scripture.reference}</p>
                            <p className="text-sm italic">{day.scripture.text}</p>
                          </div>
                        </div>

                        {/* Quiz Section */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-accent flex items-center gap-2">
                            🤔 Quiz Reflexivo
                          </h3>
                          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-3">
                            {day.quiz.map((q: any, idx: number) => (
                              <div key={idx} className="space-y-2">
                                <p className="font-medium text-sm">{idx + 1}. {q.question}</p>
                                <div className="grid grid-cols-2 gap-2 ml-4">
                                  {q.options.map((option: string, optIdx: number) => (
                                    <div 
                                      key={optIdx}
                                      className={`text-xs p-2 rounded ${
                                        optIdx === q.correct 
                                          ? 'bg-green-100 text-green-800 border border-green-300' 
                                          : 'bg-gray-50 text-gray-600'
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

                        {/* Prayer Section */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-purple-600 flex items-center gap-2">
                            🙏 Oração
                          </h3>
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <p className="text-sm leading-relaxed italic">{day.prayer}</p>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              {/* Approve Button */}
              <div className="flex justify-center pt-6 border-t">
                <Button 
                  onClick={() => {
                    toast({
                      title: "Conteúdo aprovado!",
                      description: "Produto pronto para ser finalizado."
                    });
                  }}
                  className="gradient-primary text-white px-8 py-3 text-lg"
                >
                  <Check className="h-5 w-5 mr-3" />
                  Aprovar Conteúdo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const isStepValid = () => {
    console.log("Verificando step:", currentStep, "ProductData:", productData);
    switch (currentStep) {
      case 1: 
        const valid1 = !!productData.experienceId;
        console.log("Step 1 válido:", valid1, "experienceId:", productData.experienceId);
        return valid1;
      case 2: return !!(productData.title && productData.description && productData.price && productData.category);
      case 3: return !!productData.template;
      case 4: return true; // Colors and fonts are optional
      case 5: return !!parsedContent;
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
            onClick={() => navigate("/admin/produtos")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Criar Produto</h1>
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
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        {currentStep === totalSteps ? (
          <Button 
            onClick={saveProduct}
            disabled={!isStepValid()}
            className="gradient-primary text-white gap-2"
          >
            <Save className="h-4 w-4" />
            Salvar Produto
          </Button>
        ) : (
          <Button 
            onClick={() => {
              console.log("Clicou em Próximo - Step atual:", currentStep);
              console.log("ProductData atual:", productData);
              console.log("isStepValid retorna:", isStepValid());
              if (isStepValid()) {
                nextStep();
                console.log("Avançou para step:", currentStep + 1);
              } else {
                console.log("Step inválido, não pode avançar");
              }
            }}
            disabled={!isStepValid()}
            className={`gap-2 ${
              isStepValid() 
                ? "gradient-primary text-white" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Próximo
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}