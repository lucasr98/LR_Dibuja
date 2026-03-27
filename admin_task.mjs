import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const projectId = 'yyueyhklxhewianpneci';
const token = process.env.SUPABASE_ACCESS_TOKEN;
const supabaseUrl = process.env.VITE_SUPABASE_URL;

async function main() {
    console.log("1. Obteniendo service_role key mediante Management API...");
    const res = await fetch(`https://api.supabase.com/v1/projects/\${projectId}/api-keys`, {
        headers: { 'Authorization': `Bearer \${token}` }
    });
    
    if (!res.ok) {
        console.error("Error obteniendo API keys:", await res.text());
        return;
    }
    
    const keys = await res.json();
    const serviceRoleKey = keys.find(k => k.name === 'service_role')?.api_key;
    
    if (!serviceRoleKey) {
        console.error("No se encontró el service_role key");
        return;
    }

    // Usamos serviceRoleKey para brincarnos el RLS y tener permisos root sobre BD y Storage
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    
    console.log("2. Actualizando URLs en tabla dibujos a /lr_dibuja/dibujos/ ...");
    const { data: dibujos, error: fetchErr } = await supabase.from('dibujos').select('*');
    if (fetchErr) {
        console.error("Error obteniendo dibujos:", fetchErr);
    } else if (dibujos && dibujos.length > 0) {
        let actualizados = 0;
        for (const dibujo of dibujos) {
            if (dibujo.src.includes('lr-dibuja/galeria')) {
                const newSrc = dibujo.src.replace('lr-dibuja/galeria', 'lr_dibuja/dibujos');
                await supabase.from('dibujos').update({ src: newSrc }).eq('id', dibujo.id);
                actualizados++;
            }
        }
        console.log(`✓ Tabla actualizada: \${actualizados} registros modificados.`);
    }
    
    console.log("3. Listando y borrando archivos en la vieja carpeta lr-dibuja/galeria ...");
    const { data: files, error: lstErr } = await supabase.storage.from('proyectos-web').list('lr-dibuja/galeria', { limit: 100 });
    
    if (lstErr) {
        console.error("Error listando archivos:", lstErr);
    } else if (files && files.length > 0) {
        // Ignorar placeholders vacios
        const toDelete = files
            .filter(f => f.name !== '.emptyFolderPlaceholder')
            .map(f => `lr-dibuja/galeria/\${f.name}`);
            
        if (toDelete.length > 0) {
            const { error: rmErr } = await supabase.storage.from('proyectos-web').remove(toDelete);
            if (rmErr) {
                console.error("Error borrando archivos:", rmErr);
            } else {
                console.log(`✓ Físicamente eliminados \${toDelete.length} archivos obsoletos de Storage.`);
            }
        } else {
            console.log("Solo habia carpetas vacias, no hay archivos por borrar.");
        }
    } else {
        console.log("No se encontraron archivos en la carpeta vieja.");
    }
    
    console.log("¡Operaciones automáticas finalizadas!");
}

main();
