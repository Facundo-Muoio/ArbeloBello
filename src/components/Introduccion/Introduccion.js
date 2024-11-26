import "./Introduccion.css";
import { useState, useRef, useEffect } from "react";
import GalleryImage from "../GalleryImage/GalleryImage.js";
import { createObserver } from "../../helpers/helpers.js";

export default function Introduccion() {
	const sectionRef = useRef(null);
	useEffect(() => {
		console.log("GalleryImage mounted");
		return () => {
			console.log("GalleryImage unmounted");
		};
	}, []);

	const [textVisibility, setTextVisibility] = useState(false);
	const [galleryVisibility, setGalleryVisibility] = useState(false);

	useEffect(() => {
		const observerText = createObserver(setTextVisibility, { threshold: 0.3 });
		const observerGallery = createObserver(setGalleryVisibility, {
			threshold: 0.85,
		});

		if (sectionRef.current) {
			observerText.observe(sectionRef.current);
			observerGallery.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				console.log("La seccion ya no es visible");
				observerText.unobserve(sectionRef.current);
				observerGallery.unobserve(sectionRef.current);
			}
		};
	}, []);

	return (
		<section id="introducción" ref={sectionRef}>
			{textVisibility && (
				<div className="contenedor-intro">
					<h3>
						Al pie de las Sierras de <b>Córdoba, en Calamuchita,</b> donde la
						naturaleza susurra secretos y los grateau llenan de colores el
						paisaje, encontrarás nuestro rincón de paz:
					</h3>
					<h1>Alberobello</h1>
					<h2>CASA SERRANA</h2>
				</div>
			)}
			{galleryVisibility && <GalleryImage />}
		</section>
	);
}
