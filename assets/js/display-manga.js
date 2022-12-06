"use strict";

async function displayManga(manga){
	const location = document.querySelector("#display-manga");
	location.innerHTML = "";
	let html = "";
	manga.data.forEach(async index => {
		const coverId = index.relationships.filter(relIndex => relIndex.type === "cover_art")[0].id;
		const fileName = await getCoverFileName(coverId);
		html = returnMangaHTML(index, fileName);
		location.insertAdjacentHTML("beforeend", html);
	});
}

function returnMangaHTML(index, fileName){
	localStorage.setItem("cover-src", `${MANGA_COVER_URL}${index.id}/${fileName}`);
	return `
		<article class="manga" data-id="${index.id}">
				<h2> ${index.attributes.title.en} </h2>
				<img alt="${index.attributes.title.en}" title="${index.attributes.title.en}" src="${MANGA_COVER_URL}${index.id}/${fileName}"/>
		</article>`;
}