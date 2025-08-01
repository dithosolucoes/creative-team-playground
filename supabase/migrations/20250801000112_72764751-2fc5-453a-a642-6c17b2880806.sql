-- Tornar creator_id opcional na tabela products
ALTER TABLE public.products 
ALTER COLUMN creator_id DROP NOT NULL;