import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const bucketName = process.env.VITE_STORAGE_BUCKET;
const storagePath = process.env.VITE_STORAGE_PATH;

async function forceUpload() {
    console.log("Forzando la subida de todas las imagenes locales a Storage...");
    const dir = path.join(__dirname, 'public', 'imagenes', 'dibujos');
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile()) {
            const fileBuffer = fs.readFileSync(filePath);
            const fullPath = `${storagePath}/${file}`;
            console.log("Subiendo", fullPath);
            const { error } = await supabase.storage.from(bucketName).upload(fullPath, fileBuffer, {
                upsert: true,
                contentType: 'image/jpeg' 
            });
            if (error) {
                console.error("Error subiendo", file, error.message);
            }
        }
    }
    console.log("¡Todas las imagenes subidas exitosamente al bucket correcto!");
}
forceUpload();
