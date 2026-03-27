-- Ejecuta este bloque completo en el SQL Editor de Supabase

-- 1. Respaldamos los datos invirtiendo el orden (el ID más alto pasará a ser el primero)
CREATE TEMP TABLE dibujos_temp AS 
SELECT src, title, created_at 
FROM dibujos 
ORDER BY id DESC;

-- 2. Vaciamos la tabla original y reiniciamos el contador de IDs a 1
TRUNCATE TABLE dibujos RESTART IDENTITY;

-- 3. Volvemos a insertar los datos, ahora en el nuevo orden
INSERT INTO dibujos (src, title, created_at)
SELECT src, title, created_at FROM dibujos_temp;

-- 4. Limpiamos la memoria borrando la tabla temporal
DROP TABLE dibujos_temp;
