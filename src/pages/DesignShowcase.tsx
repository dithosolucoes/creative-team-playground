import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DesignShowcase = () => {
  const designVariations = [
    {
      id: 1,
      name: "Midnight Mix",
      description: "Azul profundo + Preto + Cinza médio",
      colors: {
        primary: "220 85% 50%", // Deep Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 8%", // Black
        foreground: "0 0% 85%", // Light gray
        card: "0 0% 12%",
        cardForeground: "0 0% 85%",
        secondary: "0 0% 45%", // Medium gray
        secondaryForeground: "0 0% 95%",
        accent: "220 85% 45%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 35%", // Medium-dark gray
        mutedForeground: "0 0% 70%", // Light gray
        border: "0 0% 25%",
        input: "0 0% 25%",
      }
    },
    {
      id: 2,
      name: "Steel Blue",
      description: "Azul aço + Preto suave + Cinza claro",
      colors: {
        primary: "210 70% 55%", // Steel Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 6%", // Soft black
        foreground: "0 0% 90%", // Very light gray
        card: "0 0% 10%",
        cardForeground: "0 0% 90%",
        secondary: "0 0% 55%", // Medium-light gray
        secondaryForeground: "0 0% 95%",
        accent: "210 70% 50%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 40%", // Medium gray
        mutedForeground: "0 0% 75%", // Light gray
        border: "0 0% 30%",
        input: "0 0% 30%",
      }
    },
    {
      id: 3,
      name: "Ocean Slate",
      description: "Azul oceano + Preto + Cinza ardósia",
      colors: {
        primary: "200 80% 50%", // Ocean Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 4%", // Deep black
        foreground: "0 0% 82%", // Light gray
        card: "0 0% 8%",
        cardForeground: "0 0% 82%",
        secondary: "0 0% 50%", // Medium gray
        secondaryForeground: "0 0% 95%",
        accent: "200 80% 45%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 32%", // Medium-dark gray
        mutedForeground: "0 0% 68%", // Light gray
        border: "0 0% 22%",
        input: "0 0% 22%",
      }
    },
    {
      id: 4,
      name: "Electric Storm",
      description: "Azul elétrico + Preto + Cinza tempestade",
      colors: {
        primary: "230 90% 60%", // Electric Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 5%", // Black
        foreground: "0 0% 88%", // Light gray
        card: "0 0% 9%",
        cardForeground: "0 0% 88%",
        secondary: "0 0% 42%", // Medium gray
        secondaryForeground: "0 0% 95%",
        accent: "230 90% 55%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 28%", // Medium-dark gray
        mutedForeground: "0 0% 72%", // Light gray
        border: "0 0% 18%",
        input: "0 0% 18%",
      }
    },
    {
      id: 5,
      name: "Corporate Fusion",
      description: "Azul corporativo + Preto + Cinza prata",
      colors: {
        primary: "215 75% 45%", // Corporate Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 7%", // Black
        foreground: "0 0% 92%", // Very light gray
        card: "0 0% 11%",
        cardForeground: "0 0% 92%",
        secondary: "0 0% 58%", // Light gray
        secondaryForeground: "0 0% 95%",
        accent: "215 75% 40%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 38%", // Medium gray
        mutedForeground: "0 0% 78%", // Light gray
        border: "0 0% 28%",
        input: "0 0% 28%",
      }
    },
    {
      id: 6,
      name: "Charcoal Wave",
      description: "Azul marinho + Preto + Cinza carvão",
      colors: {
        primary: "225 65% 40%", // Navy Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 3%", // Deep black
        foreground: "0 0% 86%", // Light gray
        card: "0 0% 7%",
        cardForeground: "0 0% 86%",
        secondary: "0 0% 48%", // Medium gray
        secondaryForeground: "0 0% 95%",
        accent: "225 65% 35%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 30%", // Medium-dark gray
        mutedForeground: "0 0% 66%", // Light gray
        border: "0 0% 20%",
        input: "0 0% 20%",
      }
    },
    {
      id: 7,
      name: "Arctic Flow",
      description: "Azul gelo + Preto + Cinza ártico",
      colors: {
        primary: "195 85% 55%", // Ice Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 6%", // Black
        foreground: "0 0% 94%", // Very light gray
        card: "0 0% 10%",
        cardForeground: "0 0% 94%",
        secondary: "0 0% 62%", // Light gray
        secondaryForeground: "0 0% 95%",
        accent: "195 85% 50%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 45%", // Medium gray
        mutedForeground: "0 0% 80%", // Very light gray
        border: "0 0% 35%",
        input: "0 0% 35%",
      }
    },
    {
      id: 8,
      name: "Titanium Blue",
      description: "Azul titânio + Preto + Cinza metálico",
      colors: {
        primary: "240 60% 50%", // Titanium Blue
        primaryForeground: "0 0% 98%",
        background: "0 0% 5%", // Black
        foreground: "0 0% 90%", // Light gray
        card: "0 0% 9%",
        cardForeground: "0 0% 90%",
        secondary: "0 0% 52%", // Medium-light gray
        secondaryForeground: "0 0% 95%",
        accent: "240 60% 45%",
        accentForeground: "0 0% 98%",
        muted: "0 0% 35%", // Medium-dark gray
        mutedForeground: "0 0% 75%", // Light gray
        border: "0 0% 25%",
        input: "0 0% 25%",
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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Proposito24h - Design System</h1>
          <p className="text-lg text-muted-foreground mb-2">
            8 variações: Azul + Preto + Cinza médio/claro
          </p>
          <p className="text-sm text-muted-foreground">
            Escolha a combinação ideal para o projeto
          </p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
          {designVariations.map((variation) => (
            <div 
              key={variation.id}
              className="border rounded-lg p-4 flex flex-col h-full overflow-hidden"
              style={applyColors(variation.colors)}
            >
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-foreground mb-1">
                  {variation.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {variation.description}
                </p>
              </div>

              {/* Color Palette */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-foreground">Cores</h3>
                <div className="grid grid-cols-2 gap-1">
                  <div className="space-y-1">
                    <div className="w-full h-4 rounded bg-primary"></div>
                    <p className="text-xs text-muted-foreground">Primary</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-4 rounded bg-secondary"></div>
                    <p className="text-xs text-muted-foreground">Secondary</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-4 rounded bg-accent"></div>
                    <p className="text-xs text-muted-foreground">Accent</p>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-4 rounded bg-muted"></div>
                    <p className="text-xs text-muted-foreground">Muted</p>
                  </div>
                </div>
              </div>

              {/* Components Demo */}
              <div className="flex-1 space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Componentes</h3>
                
                {/* Buttons */}
                <div className="flex gap-1 flex-wrap">
                  <Button size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Second</Button>
                </div>

                {/* Mini Card Example */}
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Card Demo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Input placeholder="Input..." className="h-8 text-xs" />
                    <div className="flex gap-1">
                      <Badge className="text-xs">Tag</Badge>
                      <Badge variant="secondary" className="text-xs">Tag2</Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                  </CardContent>
                </Card>

              </div>

              {/* Selection Button */}
              <div className="mt-auto pt-3 border-t border-border">
                <Button className="w-full" size="sm">
                  Escolher
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Cada quadrante mostra a mistura: Azul + Preto + Cinza médio/claro
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignShowcase;