-- Corrigir foreign key para profiles e criar tabelas faltantes

-- Primeiro, adicionar constraint unique ao user_id na tabela profiles
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- FASE 1: Criar tabelas faltantes para funcionalidades core

-- Tabela para funis de vendas
CREATE TABLE public.funnels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  products JSONB, -- sequência de produtos no funil
  upsells JSONB, -- configuração de upsells
  order_bumps JSONB, -- configuração de order bumps
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  total_revenue INTEGER DEFAULT 0, -- em centavos
  total_visitors INTEGER DEFAULT 0,
  total_purchases INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, paused, archived
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para upsells/ofertas
CREATE TABLE public.upsells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  product_id UUID REFERENCES products(id),
  upsell_product_id UUID REFERENCES products(id),
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  total_revenue INTEGER DEFAULT 0, -- em centavos
  total_shows INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  average_order_value INTEGER DEFAULT 0, -- em centavos
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para analytics/métricas
CREATE TABLE public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  event_type TEXT NOT NULL, -- view, click, purchase, completion, funnel_enter, upsell_show, etc
  user_id UUID REFERENCES profiles(user_id),
  session_id TEXT,
  revenue INTEGER DEFAULT 0, -- em centavos, quando aplicável
  metadata JSONB, -- dados específicos do evento
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para configurações do sistema
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- general, domain, integrations, notifications, security
  key TEXT NOT NULL,
  value JSONB,
  encrypted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(creator_id, category, key)
);

-- Tabela para tracking de uso de cupons
CREATE TABLE public.coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID REFERENCES coupons(id) ON DELETE CASCADE,
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(user_id),
  discount_applied INTEGER, -- valor do desconto aplicado em centavos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upsells ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para funnels
CREATE POLICY "Creators can manage their own funnels" 
ON public.funnels 
FOR ALL 
USING (creator_id = auth.uid()) 
WITH CHECK (creator_id = auth.uid());

-- Políticas RLS para upsells
CREATE POLICY "Creators can manage their own upsells" 
ON public.upsells 
FOR ALL 
USING (creator_id = auth.uid()) 
WITH CHECK (creator_id = auth.uid());

-- Políticas RLS para analytics
CREATE POLICY "Creators can view analytics of their products" 
ON public.analytics 
FOR SELECT 
USING (product_id IN (SELECT id FROM products WHERE creator_id = auth.uid()));

CREATE POLICY "System can insert analytics" 
ON public.analytics 
FOR INSERT 
WITH CHECK (true);

-- Políticas RLS para settings
CREATE POLICY "Creators can manage their own settings" 
ON public.settings 
FOR ALL 
USING (creator_id = auth.uid()) 
WITH CHECK (creator_id = auth.uid());

-- Políticas RLS para coupon_usage
CREATE POLICY "Creators can view coupon usage of their coupons" 
ON public.coupon_usage 
FOR SELECT 
USING (coupon_id IN (SELECT id FROM coupons WHERE product_id IN (SELECT id FROM products WHERE creator_id = auth.uid())));

CREATE POLICY "System can insert coupon usage" 
ON public.coupon_usage 
FOR INSERT 
WITH CHECK (true);

-- Triggers para updated_at
CREATE TRIGGER update_funnels_updated_at
BEFORE UPDATE ON public.funnels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_upsells_updated_at
BEFORE UPDATE ON public.upsells
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_analytics_product_id ON public.analytics(product_id);
CREATE INDEX idx_analytics_event_type ON public.analytics(event_type);
CREATE INDEX idx_analytics_created_at ON public.analytics(created_at);
CREATE INDEX idx_settings_creator_category_key ON public.settings(creator_id, category, key);
CREATE INDEX idx_coupon_usage_coupon_id ON public.coupon_usage(coupon_id);