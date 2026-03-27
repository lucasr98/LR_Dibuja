-- Ejecuta el siguiente código SQL en el SQL Editor de tu Dashboard de Supabase para crear la tabla "dibujos":

CREATE TABLE dibujos (
    id SERIAL PRIMARY KEY,
    src TEXT NOT NULL,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Opcional: Activar las políticas de seguridad (RLS) para permitir que cualquier usuario lea la tabla "dibujos":
ALTER TABLE dibujos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." 
ON dibujos FOR SELECT USING (true);
