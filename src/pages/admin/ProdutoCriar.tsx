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
    const prompt = `# INSTRUÇÕES PARA CRIAÇÃO DE EXPERIÊNCIA DEVOCIONAL

Você é um especialista em criar experiências devocionais cristãs transformadoras. Eu preciso que você crie uma experiência completa baseada nos seguintes dados:

**PRODUTO:**
- Título: ${productData.title}
- Descrição: ${productData.description}
- Categoria: ${productData.category}

**INSTRUÇÕES:**
1. Crie uma experiência devocional de quantos dias achar apropriado (mínimo 7, máximo 30)
2. Cada dia deve conter:
   - Devocional (texto inspirador de 200-300 palavras)
   - Passagem bíblica relevante 
   - Quiz reflexivo (3-5 perguntas)
   - Oração direcionada

3. Crie também uma landing page persuasiva para o produto

**FORMATO DE RESPOSTA OBRIGATÓRIO:**
\`\`\`json
{
  "days": [
    {
      "day": 1,
      "title": "Título do Dia",
      "devotional": "Texto devocional completo...",
      "scripture": {
        "reference": "João 3:16",
        "text": "Texto da passagem bíblica"
      },
      "quiz": [
        {
          "question": "Pergunta reflexiva?",
          "options": ["A", "B", "C", "D"],
          "correct": 0
        }
      ],
      "prayer": "Oração direcionada para o tema do dia"
    }
  ],
  "landingPage": {
    "headline": "Título principal",
    "subheadline": "Subtítulo",
    "benefits": ["Benefício 1", "Benefício 2"],
    "testimonials": ["Depoimento 1", "Depoimento 2"],
    "cta": "Texto do botão"
  }
}
\`\`\`

Crie agora a experiência completa seguindo exatamente este formato!`;

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
      // Extract JSON from response
      const jsonMatch = gptResponse.match(/```json\n([\s\S]*?)\n```/);
      if (!jsonMatch) {
        throw new Error("JSON não encontrado na resposta");
      }
      
      const parsed = JSON.parse(jsonMatch[1]);
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
        description: "Verifique se a resposta está no formato correto.",
        variant: "destructive"
      });
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

  const renderStep5 = () => (
    <div className="space-y-6">
      <Card className="shadow-soft border-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Geração de Conteúdo
          </CardTitle>
          <CardDescription>
            Gere o conteúdo da sua experiência usando IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button 
                onClick={generatePrompt}
                className="gradient-primary text-white"
              >
                <Zap className="h-4 w-4 mr-2" />
                Gerar Prompt
              </Button>
              {generatedPrompt && (
                <Button 
                  variant="outline" 
                  onClick={copyPrompt}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Prompt
                </Button>
              )}
            </div>

            {generatedPrompt && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {generatedPrompt}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gpt-response">Cole a resposta do GPT aqui:</Label>
                  <Textarea
                    id="gpt-response"
                    placeholder="Cole a resposta completa do ChatGPT..."
                    value={gptResponse}
                    onChange={(e) => setGptResponse(e.target.value)}
                    rows={8}
                  />
                </div>

                <Button 
                  onClick={parseGptResponse}
                  disabled={!gptResponse}
                  variant="outline"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Importar Conteúdo
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {parsedContent && (
        <Card className="shadow-soft border-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Preview do Conteúdo
            </CardTitle>
            <CardDescription>
              {parsedContent.days?.length} dias de experiência criados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {parsedContent.days?.map((day: any, idx: number) => (
                <Button
                  key={idx}
                  variant={currentDay === day.day ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentDay(day.day)}
                >
                  Dia {day.day}
                </Button>
              ))}
            </div>

            {parsedContent.days && (
              <div className="border rounded-lg p-4 space-y-4">
                {(() => {
                  const day = parsedContent.days.find((d: any) => d.day === currentDay);
                  return day ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-foreground">{day.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        <p><strong>Devocional:</strong> {day.devotional.substring(0, 100)}...</p>
                        <p><strong>Passagem:</strong> {day.scripture.reference}</p>
                        <p><strong>Quiz:</strong> {day.quiz.length} perguntas</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

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