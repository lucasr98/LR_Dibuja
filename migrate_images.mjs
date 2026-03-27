import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const bucketName = process.env.VITE_STORAGE_BUCKET || 'proyectos-web';
const storagePath = process.env.VITE_STORAGE_PATH || 'lr_dibuja/dibujos';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Faltan credenciales en .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrateImages() {
  console.log(`Iniciando migración de imágenes locales a Supabase Storage (Bucket: \${bucketName}, Ruta: \${storagePath}/)...`);
  
  // 1. Obtener los dibujos actuales en la base de datos
  const { data: dibujos, error: fetchError } = await supabase.from('dibujos').select('*');
  if (fetchError) {
    console.error("Error obteniendo dibujos:", fetchError);
    return;
  }

  // 2. Por cada dibujo que tenga src local, subir la imagen al bucket
  for (const dibujo of dibujos) {
    if (dibujo.src.startsWith('/imagenes/')) {
        const localPath = path.join(__dirname, 'public', dibujo.src);
        
        if (fs.existsSync(localPath)) {
            const fileName = path.basename(localPath);
            const fileBuffer = fs.readFileSync(localPath);
            const fullStoragePath = `${storagePath}/${fileName}`;
            
            console.log(`Subiendo \${fileName}... a \${fullStoragePath}`);
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(fullStoragePath, fileBuffer, {
                    contentType: 'image/jpeg',
                    upsert: true
                });
            
            if (uploadError) {
                console.error(`Error subiendo \${fileName}:`, uploadError.message);
            } else {
                // Generar URL pública
                const { data: publicUrlData } = supabase.storage
                    .from(bucketName)
                    .getPublicUrl(fullStoragePath);
                
                const newUrl = publicUrlData.publicUrl;
                
                // Actualizar en db
                const { error: updateError } = await supabase
                    .from('dibujos')
                    .update({ src: newUrl })
                    .eq('id', dibujo.id);
                
                if (updateError) {
                    console.error(`Error actualizando db para \${fileName}:`, updateError.message);
                } else {
                    console.log(`✓ \${fileName} en Storage y en Base de Datos.`);
                }
            }
        } else {
            console.warn(`No se encontró el archivo local: \${localPath}`);
        }
    }
  }
  
  console.log("¡Migración finalizada! Tus imágenes locales ahora usan Supabase Storage.");
}

migrateImages();
