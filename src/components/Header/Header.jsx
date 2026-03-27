import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header id="header" className={styles.header}>
			<div className={styles.home}>	
				<Link className={styles.homeLogo} to="/">
					<div className={styles.homeVector}>
						<img src="/imagenes/recursos/LR 2021.svg" alt="Logo vector" />
					</div>
					<h1 className={styles.homeText}>
						LUCAS RETAMOZO
					</h1>
				</Link>
			</div>
			<nav className={styles.subHeaderPc}>
				<Link className={styles.subHeaderPcButton} to="/contact">
					<div className={styles.subHeaderPcButtonLink}>Contact</div>
				</Link>
				<Link className={styles.subHeaderPcButton} to="/about">
					<div className={styles.subHeaderPcButtonLink}>About</div>
				</Link>
			</nav>
			<nav className={styles.subHeaderSm}>
				<Link to="/contact" title="Contactarme">
					<i className="fa-solid fa-comment" title="Contact"></i>
				</Link>
				<Link to="/about" title="Acerca de mí">
					<i className="fa-solid fa-user" title="About Me"></i>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
