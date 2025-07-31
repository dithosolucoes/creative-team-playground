import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Clock, 
  Shield, 
  Heart, 
  CheckCircle, 
  Users,
  Calendar,
  ArrowRight
} from "lucide-react";

export default function ProductLanding() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mock product data
  const product = {
    slug: "transformacao-21-dias",
    title: "Transformação em 21 Dias",
    subtitle: "A jornada espiritual que vai revolucionar sua vida",
    description: "Desperte seu potencial divino através de uma experiência devocional única e transformadora",
    price: 97,
    originalPrice: 197,
    highlights: [
      "21 dias de conteúdo exclusivo",
      "Meditações guiadas diárias",
      "Comunidade privada de apoio",
      "Certificado de conclusão",
      "Acesso vitalício"
    ],
    testimonials: [
      {
        name: "Maria Silva",
        text: "Esta experiência mudou completamente minha perspectiva de vida. Recomendo!",
        rating: 5
      },
      {
        name: "João Santos", 
        text: "21 dias que transformaram minha relação com Deus. Simplesmente incrível.",
        rating: 5
      }
    ]
  };

  const handlePurchase = () => {
    navigate(`/produto/${slug}/checkout`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Propósito24h</h1>
          <Button variant="outline" size="sm">Suporte</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            ✨ Oferta Limitada - 50% OFF
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {product.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            {product.subtitle}
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-3xl text-muted-foreground line-through">
              R$ {product.originalPrice}
            </span>
            <span className="text-5xl font-bold text-primary">
              R$ {product.price}
            </span>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handlePurchase}
            size="lg"
            className="text-lg px-8 py-6 mb-8 bg-primary hover:bg-primary/90"
          >
            Começar Minha Transformação
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>+1000 vidas transformadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que você vai receber
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {product.highlights.map((highlight, index) => (
              <Card key={index} className="border-soft shadow-soft">
                <CardContent className="p-6 flex items-center gap-4">
                  <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                  <span className="text-foreground font-medium">{highlight}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Vidas transformadas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {product.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-soft shadow-soft">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sua transformação começa agora
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Não deixe para amanhã a mudança que pode começar hoje
          </p>
          
          <Button 
            onClick={handlePurchase}
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
          >
            Garantir Minha Vaga - R$ {product.price}
            <Heart className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-background">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Propósito24h. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}