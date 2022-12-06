"use strict";

document.addEventListener("submit", getParamsLimit);
document.addEventListener("click", changeOffsetManga);
document.addEventListener("click", extraInformation);
document.addEventListener("click", returnToMain);

const MANGA_COVER_URL = "https://uploads.mangadex.org/covers/";
const SELECTORS = ["#limit-page", "#display-manga", ".page-container", "#extra-info", "#back"];

async function getParamsLimit(e){
	e.preventDefault();
	PARAMS["limit"] = document.querySelector("#limit").value;
	displayManga(await getAllManga());
}

function returnToMain(e){
	if (!e.target.closest("#back")) return;
	document.querySelector("#extra-info").innerHTML = "";
	makeVisible(["#limit-page", "#display-manga", ".page-container"]);
}

function makeVisible(visibleSelectors){
	SELECTORS.forEach(selector => {
		document.querySelector(selector).classList.add("hidden");
	});

	for(const selector in visibleSelectors){
		document.querySelector(visibleSelectors[selector]).classList.remove("hidden");
	}
}