-- Confirmar manualmente o usuário atual que está preso no loop
UPDATE auth.users 
SET email_confirmed_at = now(), 
    updated_at = now() 
WHERE email = 'tgabriel324@gmail.com' 
AND email_confirmed_at IS NULL;