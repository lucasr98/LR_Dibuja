import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Faltan las credenciales de Supabase en .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const images = [
  { src: '/imagenes/dibujos/SHE_HULK_05_IG.jpg', title: 'She Hulk' },
  { src: '/imagenes/dibujos/PSYLOCKE_05_IG_b.jpg', title: 'Psylocke' },
  { src: '/imagenes/dibujos/Robot_05_IG.jpg', title: 'Robot (OC)' },
  { src: '/imagenes/dibujos/Jeanne_05_IG_b.jpg', title: 'Jeanne (OC)' },
  { src: '/imagenes/dibujos/CapitanAmerica_05_IG.jpg', title: 'Captain America' },
  { src: '/imagenes/dibujos/Supergirl_05_IG.jpg', title: 'Supergirl' },
  { src: '/imagenes/dibujos/SCARLET WITCH g.IG 3.jpg', title: 'Scarlet Witch' },
  { src: '/imagenes/dibujos/JILL VALENTINE e.IG.jpg', title: 'Jill Valentine' },
  { src: '/imagenes/dibujos/Scarlet Spider e.IG.jpg', title: 'Scarlet Spider' },
  { src: '/imagenes/dibujos/MS MARVEL e.IG.jpg', title: 'Ms Marvel' },
  { src: '/imagenes/dibujos/Wolverine IG.jpg', title: 'Wolverine' },
  { src: '/imagenes/dibujos/Magik IG.jpg', title: 'Magik' },
  { src: '/imagenes/dibujos/Motoko Kusanagi chaqueta IG.jpg', title: 'Motoko Kusanagi' },
  { src: '/imagenes/dibujos/Ahsoka Tano IG.jpg', title: 'Ahsoka Tano' },
  { src: '/imagenes/dibujos/Ultimate Spider-man IG.jpg', title: 'Spider-man' },
  { src: '/imagenes/dibujos/Thanos IG.jpg', title: 'Thanos' },
  { src: '/imagenes/dibujos/Wonder Woman IG.jpg', title: 'Wonder Woman' },
  { src: '/imagenes/dibujos/Hulk IG.jpg', title: 'Hulk' },
  { src: '/imagenes/dibujos/Captain Marvel IG.jpg', title: 'Captain Marvel' },
  { src: '/imagenes/dibujos/Pink Shadow IG.jpg', title: 'Pink Shadow (OC)' },
  { src: '/imagenes/dibujos/Wicca IG.jpg', title: 'Wicca (OC)' },
  { src: '/imagenes/dibujos/SpiderGwen IG.jpg', title: 'Spider-Gwen' },
  { src: '/imagenes/dibujos/Impulso IG.jpg', title: 'Impulso (OC)' },
  { src: '/imagenes/dibujos/Chica CMYK IG.jpg', title: 'CMYK girl' },
  { src: '/imagenes/dibujos/Spider-Man color.jpg', title: 'Spider-man' }
];

async function insertData() {
  console.log("Insertando datos en Supabase...");
  const { data, error } = await supabase
    .from('dibujos')
    .insert(images)
    .select();

  if (error) {
    console.error("Error insertando datos:", error);
  } else {
    console.log("¡Se insertaron " + data.length + " dibujos en la base de datos exitosamente!");
  }
}

insertData();
