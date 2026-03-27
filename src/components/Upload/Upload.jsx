import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import styles from './Upload.module.css';

const BUCKET_NAME = import.meta.env.VITE_STORAGE_BUCKET || 'proyectos-web';
const STORAGE_PATH = import.meta.env.VITE_STORAGE_PATH || 'lr_dibuja/dibujos';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setStatus("Por favor selecciona una imagen.");
            return;
        }

        if (!title.trim()) {
            setStatus("Por favor ingresa un título para el dibujo.");
            return;
        }

        setLoading(true);
        setStatus(`Subiendo archivo a \${BUCKET_NAME}/\${STORAGE_PATH}...`);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.\${fileExt}`;
        const fullPath = `${STORAGE_PATH}/\${fileName}`;

        // Subir al bucket interactuando con la sub-carpeta dinámica
        const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fullPath, file, { upsert: false });

        if (uploadError) {
            setStatus(`Error subiendo archivo: \${uploadError.message}`);
            setLoading(false);
            return;
        }

        setStatus("Generando enlace y guardando en la base de datos...");

        // Obtener la URL pública de la nueva ruta
        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fullPath);

        const publicUrl = publicUrlData.publicUrl;

        // Insertar en la base de datos
        const { error: insertError } = await supabase
            .from('dibujos')
            .insert([{ title, src: publicUrl }]);

        if (insertError) {
            setStatus(`Error guardando información: \${insertError.message}`);
        } else {
            setStatus("¡Dibujo subido y guardado exitosamente!");
            setTitle('');
            setFile(null);
        }

        setLoading(false);
    };

    return (
        <main className={styles.main}>
            <div className={styles.uploadContainer}>
                <h2>Subir un nuevo dibujo</h2>
                <form className={styles.uploadForm} onSubmit={handleUpload}>
                    <input 
                        type="text" 
                        placeholder="Título del dibujo" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.inputField}
                    />
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className={styles.fileField}
                    />
                    <button 
                        type="submit" 
                        className={styles.uploadButton}
                        disabled={loading}
                    >
                        {loading ? 'Subiendo...' : 'Subir a Galería'}
                    </button>
                    {status && <p className={styles.statusMessage}>{status}</p>}
                </form>
            </div>
        </main>
    );
};

export default Upload;
