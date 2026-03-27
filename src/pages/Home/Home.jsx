import { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';
import { supabase } from '../../supabaseClient';
import Masonry from 'react-masonry-css';

const Home = () => {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false);
    const loaderRef = useRef(null);

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function for when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImageIndex]);

    const fetchImages = async (currentPage) => {
        if (!hasMore && currentPage !== 0) return;
        
        if (currentPage > 0) setFetchingMore(true);

        const from = currentPage * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        const { data, error } = await supabase
            .from('dibujos')
            .select('*')
            .order('id', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('Error fetching images:', error);
        } else {
            if (data.length < ITEMS_PER_PAGE) {
                setHasMore(false);
            }
            
            if (currentPage === 0) {
                setImages(data);
            } else {
                setImages((prev) => [...prev, ...data]);
            }
        }
        
        setLoading(false);
        setFetchingMore(false);
    };

    useEffect(() => {
        fetchImages(page);
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !fetchingMore && !loading) {
                setPage((prev) => prev + 1);
            }
        }, {
            root: null,
            rootMargin: '200px',
            threshold: 0
        });

        if (loaderRef.current) observer.observe(loaderRef.current);
        
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [hasMore, fetchingMore, loading]);

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsZoomed(false);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
        setIsZoomed(false);
    };

    const toggleZoom = (e) => {
        e.stopPropagation();
        setIsZoomed(!isZoomed);
    };

    const showPrevImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
        setIsZoomed(false);
    };

    const showNextImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        setIsZoomed(false);
    };

    if (loading) {
        return <main className={styles.main}><p style={{color: 'white', textAlign: 'center', marginTop: '20px'}}>Cargando dibujos...</p></main>;
    }

    return (
        <main className={styles.main}>
            {selectedImageIndex !== null && images.length > 0 && (
                <div className={isZoomed ? styles.fulImgBoxZoomed : styles.fulImgBox} onClick={closeModal}>
                    <div className={isZoomed ? styles.imgContainerZoomed : styles.imgContainer}>
                        <img 
                            className={isZoomed ? styles.imgZoomed : styles.imgOriginal} 
                            src={images[selectedImageIndex].src} 
                            alt={images[selectedImageIndex].title} 
                            onClick={toggleZoom} 
                        />
                    </div>
                    {!isZoomed && <i className={`fa-solid fa-circle-arrow-left ${styles.modalButtons}`} id={styles.arrowLeft} onClick={showPrevImage}></i>}
                    {!isZoomed && <i className={`fa-solid fa-circle-arrow-right ${styles.modalButtons}`} id={styles.arrowRight} onClick={showNextImage}></i>}
                    <i className={`fa-solid fa-circle-xmark`} id={styles.x} onClick={closeModal}></i>
                </div>
            )}
            <div className={styles.masonryWrapper}>
                <Masonry
                    breakpointCols={{
                        default: 5,
                        1400: 4,
                        1100: 3,
                        800: 2,
                        500: 1
                    }}
                    className={styles.myMasonryGrid}
                    columnClassName={styles.myMasonryGridColumn}
                >
                    {images.map((img, index) => (
                        <div key={img.id || index} className={styles.gridItem} onClick={() => openModal(index)}>
                            <img className={styles.gridItemItem} src={img.src} alt={img.title} title={img.title} />
                            <div className={styles.gridItemMask}>
                                <h4 className={styles.gridItemTitle}>
                                    {img.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </Masonry>
            </div>
            
            {fetchingMore && <p style={{color: 'white', textAlign: 'center', marginTop: '18px', letterSpacing: '.1em'}}>Cargando más dibujos...</p>}
            
            {/* Observer element target */}
            <div ref={loaderRef} style={{ height: '20px' }}></div>
        </main>
    );
};

export default Home;
