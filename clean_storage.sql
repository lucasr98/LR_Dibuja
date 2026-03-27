-- 1. Regresar todas las URLs de tu aplicación a la ruta original 'lr_dibuja/dibujos'
UPDATE dibujos 
SET src = replace(src, 'lr-dibuja/galeria', 'lr_dibuja/dibujos');

-- 2. Eliminar completamente la carpeta antigua 'lr-dibuja' y todos sus archivos físicos
DELETE FROM storage.objects 
WHERE bucket_id = 'proyectos-web' AND name LIKE 'lr-dibuja/%';
