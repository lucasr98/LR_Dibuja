-- Ejecuta este comando en el SQL Editor de tu panel de Supabase:
-- Reemplazará la ruta local ('/imagenes/dibujos/') por la URL pública remota de tu Storage en todos los registros.

UPDATE dibujos 
SET src = replace(src, '/imagenes/dibujos/', 'https://yyueyhklxhewianpneci.supabase.co/storage/v1/object/public/proyectos-web/lr-dibuja/galeria/');
