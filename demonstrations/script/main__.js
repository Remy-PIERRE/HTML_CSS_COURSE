const dataAll = {};

const initApp = () => {
	const page = getPage();
	getData(page);

	setEvents();
};

const getPage = () => {
	const page = document.querySelector("#page").dataset.page;
	return page;
};

const getData = async (page) => {
	try {
		const resp = await fetch(`/public/json/${page}.json`);
		const data = await resp.json();

		if (data.length !== 0)
			for (const [key, value] of Object.entries(data)) dataAll[key] = value;
	} catch (error) {
		console.log(`Error fetching ${page} data: `, error.message);
	}
};

const isDataAllReady = () => {
	return Object.keys(dataAll).length > 0 ? true : false;
};

const getDataWithAttributeName = (attribute) => {
	return dataAll[attribute];
};

const setEvents = () => {
	const toHomePage = document.querySelector("#toHomePage");
	toHomePage.addEventListener("click", handleToHomePageRedirect);

	const toTopOfPage = document.querySelector("#toTopOfPage");
	toTopOfPage.addEventListener("click", handleReturnToTopOfPage);
	window.addEventListener("scroll", handleToTopOfPageVisibility);

	const selectSection = document.querySelector("#selectSection");
	selectSection.addEventListener("click", handleSelectSectionOpening);

	const selectOptions = selectSection.querySelectorAll(".select--option");
	selectOptions.forEach((option) =>
		option.addEventListener("click", handleOptionSelection)
	);

	[...selectOptions]
		.find((option) => option.innerHTML === "order")
		.dispatchEvent(new CustomEvent("click"));
};

const handleToHomePageRedirect = () => {
	window.location.href = "/";
};

const handleSelectSectionOpening = (event) => {
	if (isDataAllReady()) {
		const selectSection = event.currentTarget;
		const arrow = selectSection.querySelector("img");
		const list = selectSection.querySelector(".select--list");

		arrow.classList.toggle("opened");
		list.classList.toggle("opened");
	}
};

const handleOptionSelection = (event) => {
	const optionText = event.currentTarget.innerHTML;
	const selectText = document.querySelector("#selectSection h2");

	selectText.innerHTML = optionText;

	resetArticles();
	initArticle(optionText);
};

const getIdFromText = (text) => {
	const textList = text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.split(/ |-/);
	for (let i = 1; i < textList.length; i++) {
		textList[i] = textList[i].charAt(0).toUpperCase() + textList[i].slice(1);
	}
	const id = textList.join("");

	return id;
};

const resetArticles = () => {
	const articles = [...document.querySelectorAll("article")];

	articles.forEach((article) => {
		if (![...article.classList].includes("hidden"))
			article.classList.toggle("hidden");
	});
};

const initArticle = (text) => {
	const id = getIdFromText(text);
	const article = document.querySelector(`#${id}`);
	const dataArticle = getDataWithAttributeName(text);

	article.classList.toggle("hidden");

	if (dataArticle && dataArticle.length !== 0) {
		article
			.querySelectorAll(":not(template")
			.forEach((element) => element.remove());

		dataArticle.forEach((data) => {
			const template = article
				.querySelector("template")
				.content.cloneNode(true);
			if (data.attribute) createSection(template, { ...data });
			else createSection(template, { ...data, attribute: text });
			article.appendChild(template);
		});
	}
};

const createSection = (template, data) => {
	const { default: isDefault, value, attribute } = data;
	const elementDefault = template.querySelector(".element--default");
	const elementAttribute = template.querySelector(".element--attribute");
	const container = template.querySelector(".container");

	if (isDefault) elementDefault.classList.toggle("hidden");
	elementAttribute.innerHTML = `&emsp;&emsp;&emsp;&emsp;${attribute}: <span class="code--orange">${value}</span>`;
	container.setAttribute("style", `${attribute}: ${value}`);
};

const handleReturnToTopOfPage = () => {
	window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const handleToTopOfPageVisibility = () => {
	const toTopOfPage = document.querySelector("#toTopOfPage");
	if (window.scrollY < 200 && ![...toTopOfPage.classList].includes("hidden"))
		toTopOfPage.classList.toggle("hidden");
	else if (
		window.scrollY >= 200 &&
		[...toTopOfPage.classList].includes("hidden")
	)
		toTopOfPage.classList.toggle("hidden");
};

initApp();
