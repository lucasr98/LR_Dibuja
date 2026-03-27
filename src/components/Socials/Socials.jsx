import styles from './Socials.module.css';

const Socials = () => {
	return (
		<nav className={styles.socials}>
			<div className={styles.socialsText}>
				Follow me:
			</div>
			<div className={styles.socialsBox}>
				<a className={styles.socialsBoxButton} href="https://www.instagram.com/lr.dibuja/?hl=es-la" target="_blank" rel="noreferrer">
					<img src="/imagenes/recursos/Instagram_circulo_negro.svg" title="Instagram" alt="Instagram" />
				</a>
				<a className={styles.socialsBoxButton} href="https://www.deviantart.com/rukazu98/gallery/all" target="_blank" rel="noreferrer">
					<img src="/imagenes/recursos/Deviantart_circular_negro1.svg" title="Deviantart" alt="Deviantart" />
				</a>
				<a className={styles.socialsBoxButton} href="https://www.behance.net/lucasretamozo" target="_blank" rel="noreferrer">
					<img src="/imagenes/recursos/Behance.svg" title="Behance" alt="Behance" />
				</a>
				<a className={styles.socialsBoxButton} href="https://ar.pinterest.com/LRdibuja/lr-dibuja/" target="_blank" rel="noreferrer">
					<img src="/imagenes/recursos/Pinterest_circular_negro1.svg" title="Pinterest" alt="Pinterest" />
				</a>
			</div>
		</nav>
	);
};

export default Socials;
