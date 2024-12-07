import React from "react";

const fetcher = async url => {
	const response = await fetch(url);
	if (!response.ok) {
		const error = new Error(`An error ocurred while fetching the data.`);
		throw error;
	}
	const json = await response.json();
	return json;
};

const createObserver = (
	setFunction,
	{ root = null, marginRoot = "0px 0px 0px 0px", threshold = 0 }
) => {
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setFunction(true);
				}
			});
		},
		{ root, marginRoot, threshold }
	);
	return observer;
};

function parseTextToJSX(text) {
	const boldRegex = /<b>(.*?)<\/b>/g;
	const breakRegex = /<br\s*\/?>/g;

	let formattedText = text.split(boldRegex).map((part, index) => {
		if (index % 2 === 1) {
			return <b key={`bold-${index}`}>{part}</b>;
		}

		return part.split(breakRegex).map((subpart, subIndex, array) =>
			subIndex < array.length - 1 ? (
				<React.Fragment key={`break-${index}-${subIndex}`}>
					{subpart}
					<br />
				</React.Fragment>
			) : (
				subpart
			)
		);
	});

	return formattedText.flat(2);
}

function validateRegex(name, value, setError, removeError) {
	switch (name) {
		case "Nombre":
		case "Apellido":
			const message = `El campo ${name} solo permite letras.`;
			const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
			!regex.test(value) ? setError(name, message) : removeError(name);
			break;
		case "Telefono":
			const messageTel = `El campo ${name} debe tener entre 7 y 15 caracteres numéricos.`;
			const regexTel = /^\+?[0-9\s-]{7,15}$/;
			!regexTel.test(value) ? setError(name, messageTel) : removeError(name);
			break;
		case "Email":
			const messageEmail = `El email ingresado no es un email valido.`;
			const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			!regexEmail.test(value)
				? setError(name, messageEmail)
				: removeError(name);
	}
}

function formatedDate(date) {
	const fecha = new Date(date);

	// Extraer el año, mes y día
	const year = fecha.getFullYear();
	const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Sumar 1 al mes y agregar un cero al principio si es menor a 10
	const dia = String(fecha.getDate()).padStart(2, "0"); // Agregar un cero al principio si el día es menor a 10

	// Formatear la fecha en el formato YYYY-MM-DD
	const fechaFormateada = `${year}-${mes}-${dia}`;
	return fechaFormateada;
}

export { fetcher, createObserver, parseTextToJSX, validateRegex, formatedDate };
