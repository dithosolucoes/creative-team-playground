-- Limpar todos os dados relacionados primeiro para evitar conflitos de foreign key
DELETE FROM analytics;
DELETE FROM coupon_usage;
DELETE FROM user_progress;
DELETE FROM purchases;

-- Deletar todos os produtos
DELETE FROM products;

-- Deletar todas as experiências
DELETE FROM experiences;

-- Limpar outras tabelas de vendas se houver dados
DELETE FROM upsells;
DELETE FROM funnels;
DELETE FROM coupons;