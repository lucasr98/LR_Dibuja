import { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
	const [warnOpen, setWarnOpen] = useState(false);
	const [warnMsg, setWarnMsg] = useState('');
	const [loading, setLoading] = useState(false);

	const closeWarn = () => {
		setWarnOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.target);

		try {
			const res = await fetch("https://formsubmit.co/ajax/lucas.rtmz98@gmail.com", {
				method: "POST",
				headers: {
					'Accept': 'application/json'
				},
				body: formData
			});

			if (res.ok) {
				setWarnMsg("¡Gracias! Tu mensaje ha sido enviado correctamente.");
				setWarnOpen(true);
				e.target.reset();
			} else {
				setWarnMsg("Hubo un problema al enviar el correo. Por favor intenta más tarde.");
				setWarnOpen(true);
			}
		} catch (error) {
			setWarnMsg("Error de conexión. Revisa tu internet.");
			setWarnOpen(true);
		}
		
		setLoading(false);
	};

	return (
		<main className={styles.main}>
			{warnOpen && (
				<div className={styles.fulWarn}>
					<div className={styles.contactWarningBackground}>
						<p className={styles.contactWarning}>{warnMsg}</p>
						<span className={styles.aceptar} onClick={closeWarn}>ok</span>
					</div>
				</div>
			)}
			<div className={styles.contact}>
				<div className={styles.contactTextContainer}>
					<div className="paragraphText">
						<h2>Contact me</h2>
						<p>
							You can contact me by completing the following form. Or you can write to me at the email below.
						</p>
					</div>
					<div className="paragraphText">
						<h2>Contactame</h2>
						<p>
							Podés contactarte conmigo completando el siguiente formulario. O podés escribirme al correo que está debajo.
						</p>
					</div>
					<p>E-mail / Correo electrónico: 
						<a href="mailto:lucas.rtmz98@gmail.com" className="link" style={{marginLeft: '5px'}}>lucas.rtmz98@gmail.com</a>
					</p>
				</div>
				<form className={styles.contactInput} onSubmit={handleSubmit}>
					<div className={styles.contactInputItem}>
						<input type="text" name="name" className={styles.contactInputItemButton} placeholder="Name / Nombre" maxLength="50" required />
					</div>
					<div className={styles.contactInputItem}>
						<input type="email" name="email" className={styles.contactInputItemButton} placeholder="E-mail / Correo electrónico" maxLength="50" required />
					</div>
					<div className={styles.contactInputItem}>
						<textarea name="message" className={styles.contactInputItemButton} placeholder="Message (50 - 1000 characters) / Mensaje (50 - 1000 caracteres)" minLength="50" maxLength="1000" required></textarea>
					</div>
					<button type="submit" className={styles.contactInputItemSubmit} disabled={loading}>
						<div className={styles.contactInputItemButtonSubmit}>
							{loading ? 'Sending / Enviando...' : 'Send / Enviar'}
						</div>
						<input type="hidden" name="_captcha" value="false" />
						<input type="hidden" name="_template" value="box" />
					</button>
				</form>
			</div>
		</main>
	);
};

export default Contact;
