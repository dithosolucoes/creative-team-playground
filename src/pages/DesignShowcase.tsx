import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DesignShowcase = () => {
  const designVariations = [
    {
      id: 1,
      name: "Royal Deep",
      description: "Azul Royal + Preto profundo (Elegante)",
      colors: {
        primary: "220 91% 50%", // Royal Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 3%", // Deep Black
        foreground: "0 0% 98%",
        card: "0 0% 8%",
        cardForeground: "0 0% 98%",
        secondary: "0 0% 15%",
        secondaryForeground: "0 0% 98%",
        accent: "220 91% 45%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 12%",
        mutedForeground: "0 0% 60%",
        border: "0 0% 20%",
        input: "0 0% 20%",
      }
    },
    {
      id: 2,
      name: "Tech Modern",
      description: "Azul Tech + Cinza moderno (Tecnológico)",
      colors: {
        primary: "210 100% 60%", // Tech Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 6%",
        foreground: "0 0% 95%",
        card: "0 0% 10%",
        cardForeground: "0 0% 95%",
        secondary: "220 13% 18%",
        secondaryForeground: "0 0% 95%",
        accent: "210 100% 55%",
        accentForeground: "0 0% 98%",
        muted: "220 13% 15%",
        mutedForeground: "0 0% 65%",
        border: "220 13% 25%",
        input: "220 13% 25%",
      }
    },
    {
      id: 3,
      name: "Ocean Calm",
      description: "Azul Oceano + Preto suave (Calmo)",
      colors: {
        primary: "200 100% 45%", // Ocean Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 7%",
        foreground: "0 0% 92%",
        card: "0 0% 12%",
        cardForeground: "0 0% 92%",
        secondary: "200 20% 20%",
        secondaryForeground: "0 0% 92%",
        accent: "200 100% 40%",
        accentForeground: "0 0% 98%",
        muted: "200 20% 17%",
        mutedForeground: "0 0% 62%",
        border: "200 20% 27%",
        input: "200 20% 27%",
      }
    },
    {
      id: 4,
      name: "Electric Energy",
      description: "Azul Elétrico + Cinza escuro (Energético)",
      colors: {
        primary: "240 100% 70%", // Electric Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 4%",
        foreground: "0 0% 96%",
        card: "0 0% 9%",
        cardForeground: "0 0% 96%",
        secondary: "240 8% 16%",
        secondaryForeground: "0 0% 96%",
        accent: "240 100% 65%",
        accentForeground: "0 0% 98%",
        muted: "240 8% 13%",
        mutedForeground: "0 0% 66%",
        border: "240 8% 23%",
        input: "240 8% 23%",
      }
    },
    {
      id: 5,
      name: "Corporate Pro",
      description: "Azul Corporativo + Preto clássico (Profissional)",
      colors: {
        primary: "217 91% 40%", // Corporate Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 5%",
        foreground: "0 0% 93%",
        card: "0 0% 11%",
        cardForeground: "0 0% 93%",
        secondary: "217 13% 19%",
        secondaryForeground: "0 0% 93%",
        accent: "217 91% 35%",
        accentForeground: "0 0% 98%",
        muted: "217 13% 16%",
        mutedForeground: "0 0% 63%",
        border: "217 13% 26%",
        input: "217 13% 26%",
      }
    },
    {
      id: 6,
      name: "Midnight Mystery",
      description: "Azul Midnight + Cinza carvão (Misterioso)",
      colors: {
        primary: "225 75% 35%", // Midnight Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 2%",
        foreground: "0 0% 90%",
        card: "0 0% 7%",
        cardForeground: "0 0% 90%",
        secondary: "225 10% 14%",
        secondaryForeground: "0 0% 90%",
        accent: "225 75% 30%",
        accentForeground: "0 0% 98%",
        muted: "225 10% 11%",
        mutedForeground: "0 0% 60%",
        border: "225 10% 21%",
        input: "225 10% 21%",
      }
    },
    {
      id: 7,
      name: "Sky Inspiration",
      description: "Azul Céu + Preto moderno (Inspirador)",
      colors: {
        primary: "190 100% 50%", // Sky Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 6%",
        foreground: "0 0% 94%",
        card: "0 0% 10%",
        cardForeground: "0 0% 94%",
        secondary: "190 15% 18%",
        secondaryForeground: "0 0% 94%",
        accent: "190 100% 45%",
        accentForeground: "0 0% 98%",
        muted: "190 15% 15%",
        mutedForeground: "0 0% 64%",
        border: "190 15% 25%",
        input: "190 15% 25%",
      }
    },
    {
      id: 8,
      name: "Sapphire Luxury",
      description: "Azul Safira + Cinza premium (Luxuoso)",
      colors: {
        primary: "235 85% 55%", // Sapphire Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 8%",
        foreground: "0 0% 97%",
        card: "0 0% 13%",
        cardForeground: "0 0% 97%",
        secondary: "235 12% 22%",
        secondaryForeground: "0 0% 97%",
        accent: "235 85% 50%",
        accentForeground: "0 0% 98%",
        muted: "235 12% 19%",
        mutedForeground: "0 0% 67%",
        border: "235 12% 29%",
        input: "235 12% 29%",
      }
    }
  ];

  const applyColors = (colors: any) => {
    const style: any = {};
    Object.entries(colors).forEach(([key, value]) => {
      style[`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
    });
    return style;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Proposito24h - Design System Showcase</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Escolha o design system que mais combina com a vibe do projeto
          </p>
          <p className="text-muted-foreground">
            8 variações com Preto, Cinza e Azul em diferentes tonalidades
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {designVariations.map((variation) => (
            <div 
              key={variation.id}
              className="border rounded-lg p-6"
              style={applyColors(variation.colors)}
            >
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {variation.name}
                </h2>
                <p className="text-muted-foreground">
                  {variation.description}
                </p>
              </div>

              {/* Color Palette */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Paleta de Cores</h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <div className="w-full h-8 rounded bg-primary"></div>
                    <p className="text-xs text-muted-foreground">Primary</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-8 rounded bg-secondary"></div>
                    <p className="text-xs text-muted-foreground">Secondary</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-8 rounded bg-accent"></div>
                    <p className="text-xs text-muted-foreground">Accent</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-8 rounded bg-muted"></div>
                    <p className="text-xs text-muted-foreground">Muted</p>
                  </div>
                </div>
              </div>

              {/* Components Demo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Componentes</h3>
                
                {/* Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                </div>

                {/* Card Example */}
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>
                      Exemplo de card com o design system aplicado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Input placeholder="Digite algo aqui..." />
                      <div className="flex gap-2">
                        <Badge>Básico</Badge>
                        <Badge variant="secondary">Premium</Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Progresso: 75%</p>
                        <Progress value={75} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Typography */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-foreground">Tipografia</h4>
                  <p className="text-foreground">Texto principal em foreground</p>
                  <p className="text-muted-foreground">Texto secundário em muted-foreground</p>
                </div>
              </div>

              {/* Selection Button */}
              <div className="mt-6 pt-4 border-t border-border">
                <Button className="w-full" size="lg">
                  Escolher este Design System
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3">Como funciona?</h3>
              <p className="text-muted-foreground">
                Cada variação mostra como ficaria o design system completo do Proposito24h. 
                Escolha a que mais combina com a vibe do projeto e vamos aplicar em todo o app!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesignShowcase;