"use strict";

const MANGA_LINKS_URLS = { // empty strings are stored as full urls
	al: "https://anilist.co/manga/",
	ap: "https://www.anime-planet.com/manga/",
	bw: "https://bookwalker.jp/",
	mu: "https://www.mangaupdates.com/series.html?id=",
	nu: "https://www.novelupdates.com/series/",
	amz: "",
	ebj: "",
	mal: "https://myanimelist.net/manga/",
	cdj: "",
	raw: "",
	engtl: ""
}

async function extraInformation(e){
	if (!e.target.closest("article.manga")) return;
	makeVisible(["#extra-info", "#back"]);
	const imgSrc = e.target.closest("article").children[1].getAttribute("src");
	document.querySelector("#display-manga").innerHTML = "";
	const mangaId = e.target.closest("article.manga").getAttribute("data-id");
	getOneMangaInformation(await getOneManga(mangaId), imgSrc);
}

function getOneMangaInformation(manga, imgSrc){
	const location = document.querySelector("#extra-info");
	location.innerHTML = "";
	let year = manga.data.attributes.year;
	if (year === null) {year = "year not defined"};
	let html = `
	<img alt="${manga.data.attributes.title.en}" title="${manga.data.attributes.title.en}" src="${imgSrc}"/>

	<div class="information">
		<h2> ${manga.data.attributes.title.en} </h2>
		<p> ${manga.data.attributes.description.en} </p>
		<p> ${year} </p>
		<ul class="tags">${getTags(manga)}</ul>
		<h3> Links </h3>
		<ul class="links">${getLinks(manga)}</ul>
	</div>`;

	location.insertAdjacentHTML("beforeend", html);
}

function getLinks(manga){
	let linksHtml = "";
	const links = manga.data.attributes.links;
	for (const key in links){
		if (key !== "kt") {
			linksHtml += `<li> <a href="${MANGA_LINKS_URLS[key]}${links[key]}"> ${MANGA_LINKS_URLS[key]}${links[key]} </a></li>`;
		}
	}
	return linksHtml;
}

function getTags(manga){
	const tags = manga.data.attributes.tags;
	let tagsHtml = "";
	tags.forEach(tag => {
		tagsHtml += `<li> ${tag.attributes.name.en} </li>`;
	});
	return tagsHtml;
}

