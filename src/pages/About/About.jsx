import styles from './About.module.css';

const About = () => {
	return (
		<main className={styles.main}>
			<div className={styles.about}>
				<div className={styles.aboutImage}>
					<img src="/imagenes/recursos/Lucas_Retamozo.jpg" alt="Lucas Retamozo" />
				</div>
				<div className={styles.aboutTextContainer}>	
					<div className="paragraphText">
						<h2>About me</h2>
						<p>Hi! My name is Lucas Retamozo and I am an Argentine freelance illustrator.
							I was born in Buenos Aires (Argentina), on September 4 of 1998 and I still live here today.<br /><br />
							I've been drawing since I was very young, but I started to take this practice seriously after I finished high school. I am currently studying at the Facultad de Arquitectura, Diseño y Urbanismo (FADU), and in my spare time I dedicate myself to drawing, above all, the human figure.<br /><br />
							My jobs are usually both traditional and digital, and my dream is to be able to make my own comic book one day.
						</p>
					</div>
					<div className="paragraphText">
						<h2>Sobre mí</h2>
						<p>Hola! mi nombre es Lucas Retamozo y soy un dibujante freelance argentino.
							Nací en Buenos Aires (Argentina), el 4 de Septiembre de 1998 y actualmente sigo viviendo acá.<br /><br />
							Dibujo desde muy chico, pero comencé a tomarme en serio dicha práctica luego de terminar la secundaria. Actualmente estudio en la Facultad de Arquitectura, Diseño y Urbanismo (FADU), y en mis tiempos libres me dedico a dibujar sobre todo figura humana.<br /><br />
							Mis trabajos suelen ser tanto de tipo tradicional como digital, y mi sueño es poder, algún día, crear mi propio cómic.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
};

export default About;
