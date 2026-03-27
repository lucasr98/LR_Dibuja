-- 1. Crear el bucket llamado 'proyectos-web' público
insert into storage.buckets (id, name, public) 
values ('proyectos-web', 'proyectos-web', true);

-- 2. Permitir que cualquier persona pueda leer los archivos del bucket
create policy "Allow public read access" 
on storage.objects for select 
using ( bucket_id = 'proyectos-web' );

-- 3. Permitir que se puedan subir imágenes con la clave anónima a este bucket
create policy "Allow inserts" 
on storage.objects for insert 
with check ( bucket_id = 'proyectos-web' );
