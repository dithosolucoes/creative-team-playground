-- ETAPA 1: Estrutura completa do banco de dados para PROPOSITO24H

-- Tabela de criadores/administradores
CREATE TABLE public.creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  domain TEXT,
  stripe_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de perfis de usuários finais
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  cpf TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de experiências/templates
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  template_id INTEGER NOT NULL, -- 1, 2 ou 3
  content JSONB, -- conteúdo estruturado da experiência
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de produtos
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creators(id),
  experience_id UUID REFERENCES experiences(id),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER, -- centavos
  customization JSONB, -- cores, fontes, etc
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de compras/vendas
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  user_id UUID REFERENCES auth.users(id),
  stripe_payment_id TEXT,
  amount INTEGER,
  coupon_code TEXT,
  status TEXT DEFAULT 'completed', -- pending, completed, refunded
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de progresso dos usuários
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  product_id UUID REFERENCES products(id),
  day_number INTEGER,
  completed BOOLEAN DEFAULT false,
  data JSONB, -- dados específicos do dia
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de cupons
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT, -- percentage, fixed
  discount_value INTEGER,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para creators
CREATE POLICY "Creators can view their own data" ON public.creators
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Creators can update their own data" ON public.creators
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas RLS para experiences (públicas para visualização)
CREATE POLICY "Experiences are viewable by everyone" ON public.experiences
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only authenticated users can create experiences" ON public.experiences
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Políticas RLS para products (públicos para visualização)
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only authenticated users can create products" ON public.products
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Políticas RLS para purchases
CREATE POLICY "Users can view their own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create purchases" ON public.purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas RLS para user_progress
CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas RLS para coupons (visualização pública)
CREATE POLICY "Coupons are viewable by everyone" ON public.coupons
  FOR SELECT USING (is_active = true);

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para timestamps automáticos
CREATE TRIGGER update_creators_updated_at
  BEFORE UPDATE ON public.creators
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed inicial: Experiência "Transformação 21 Dias"
INSERT INTO public.experiences (title, description, template_id, content) VALUES (
  'Transformação 21 Dias',
  'Uma jornada completa de transformação pessoal em 21 dias, com reflexões diárias, meditações e ações práticas.',
  1,
  '{
    "days": 21,
    "daily_content": {
      "1": {
        "title": "Despertar Interior",
        "verse": "Renovai-vos no espírito do vosso entendimento - Efésios 4:23",
        "reflection": "Hoje iniciamos uma jornada de 21 dias em direção à transformação pessoal. O primeiro passo é sempre o despertar da consciência sobre onde estamos e para onde queremos ir.",
        "meditation": "Dedique 5 minutos para respirar profundamente e refletir sobre seus objetivos para esta jornada.",
        "action": "Escreva 3 coisas que você gostaria de transformar em sua vida nos próximos 21 dias.",
        "questions": [
          "O que eu mais desejo mudar em minha vida?",
          "Que obstáculos têm me impedido de crescer?",
          "Como posso me comprometer com esta jornada?"
        ]
      }
    }
  }'
);

-- Produto exemplo usando a experiência criada
INSERT INTO public.products (slug, title, description, price, experience_id, customization) VALUES (
  'transformacao-21-dias',
  'Transformação 21 Dias - Jornada Completa',
  'Transforme sua vida em 21 dias com nossa jornada estruturada de crescimento pessoal e espiritual.',
  4999,
  (SELECT id FROM public.experiences WHERE title = 'Transformação 21 Dias'),
  '{
    "primary_color": "hsl(262, 83%, 58%)",
    "secondary_color": "hsl(262, 83%, 70%)", 
    "font_family": "Inter",
    "template_style": "modern"
  }'
);