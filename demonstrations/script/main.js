import getProps from "./getProps.js";

console.log("Hello main.js !");

// DEV displayed article
const articles = [...document.querySelectorAll("article")];
// articles.forEach((section) => {
// 	if (![...section.classList].includes("hidden"))
// 		section.classList.toggle("hidden");
// });
// articles
// 	.find((article) => article.id === "flexDirection")
// 	?.classList.toggle("hidden");
// DEV end

// dev section selection
// const article = articles.find((article) => article.id === "flexDirection");

// props.getFlexWrap().forEach(({ isDefault, attribute }) => {
// 	const template = article.querySelector("template").content.cloneNode(true);
// 	const defaultElement = template.querySelector(".default");
// 	const attributeElement = template.querySelector(".attribute");
// 	const container = template.querySelector(".container");

// 	if (isDefault) defaultElement.classList.toggle("hidden");
// 	attributeElement.innerHTML = attribute;
// 	container.setAttribute("style", `flex-direction: ${attribute}`);

// 	article.appendChild(template);
// });

/////////
// APP //
/////////
const app = () => {
	// retour accueil
	const buttonToHome = document.querySelector("#toHome");
	buttonToHome.addEventListener("click", handleToHome);

	// gestion select
	const select = document.querySelector("#headerSelect");
	select.addEventListener("click", handleSelectOpening);

	// selection options
	const options = select.querySelectorAll("p");
	options.forEach((option) => {
		option.addEventListener("click", handleOptionSelection);
	});
};

// retour accueil
const handleToHome = () => {
	window.location.href = "/index.html";
};

// gestion select
const handleSelectOpening = (event) => {
	const select = event.currentTarget;
	const arrow = select.querySelector("img");
	const list = select.querySelector(".select--list");

	list.classList.toggle("opened");
	arrow.classList.toggle("actived");
};

// select option
const handleOptionSelection = (event) => {
	const option = event.target;
	const selectTitle = document.querySelector("#headerSelect h2");
	const articles = [...document.querySelectorAll("article")];

	selectTitle.innerHTML = option.innerHTML;

	// get id
	const words = option.innerHTML
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.split(/ |-/);
	for (let i = 1; i < words.length; i++) {
		words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
	}
	const id = words.join("");

	// reset articles
	articles.forEach((article) => {
		if (![...article.classList].includes("hidden"))
			article.classList.toggle("hidden");

		article
			.querySelectorAll(":not(template)")
			.forEach((element) => element.remove());
	});

	// show selected section
	const article = articles.find((article) => article.id === id);
	article.classList.toggle("hidden");

	const props = getProps(id);
	const attribute = props[0];
	console.log(props, attribute);

	for (let i = 1; i < props.length; i++) {
		console.log(props[i]);
		const { isDefault, value } = props[i];

		const template = article.querySelector("template").content.cloneNode(true);
		const defaultElement = template.querySelector(".default");
		const attributeElement = template.querySelector(".attribute");
		const container = template.querySelector(".container");

		if (isDefault) defaultElement.classList.toggle("hidden");
		attributeElement.innerHTML = value;
		container.setAttribute("style", `${attribute}: ${value}`);

		article.appendChild(template);
	}
};

app();
