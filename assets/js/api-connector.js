"use strict";

const URL = "https://api.mangadex.org";
let OFFSET = "0";
const PARAMS = {};

async function getAllManga(){
	const fetched = await fetch(`${URL}/manga?contentRating[]=safe&status[]=completed&${convertParams()}&offset=${OFFSET}`);
	const fetchedToJson = await fetched.json();
	return fetchedToJson;
}

async function getOneManga(mangaId){
	const fetched = await fetch(`${URL}/manga/${mangaId}`);
	const fetchedToJson = await fetched.json();
	return fetchedToJson;
}

async function getCoverFileName(coverId){
	const fetched = await fetch(`${URL}/cover/${coverId}`);
	const fetchedToJson = await fetched.json();
	return fetchedToJson.data.attributes.fileName;
}

function convertParams(){
	let params = "";
	for (const key in PARAMS) {
		params += `${key}=${PARAMS[key]}&`;
	}
	return params.slice(0, params.length-1);
}
