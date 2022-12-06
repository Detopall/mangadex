"use strict";

async function changeOffsetManga(e){
	if (e.target.id === "next" || e.target.id === "prev"){
		const button = e.target;
		const maxPage = 29921;
		const minPage = 0;
	
		if (button.id === "next" && parseInt(button.getAttribute("data-next")) < maxPage){
			document.querySelector("#prev").setAttribute("data-prev", parseInt(document.querySelector("#prev").getAttribute("data-prev")) + 1);
			button.setAttribute("data-next", parseInt(button.getAttribute("data-next")) + 1);
		}
		
		if (button.id === "prev" && parseInt(button.getAttribute("data-prev")) > minPage){
			button.setAttribute("data-prev", parseInt(button.getAttribute("data-prev")) - 1);
			document.querySelector("#next").setAttribute("data-next", parseInt(document.querySelector("#next").getAttribute("data-next")) - 1);
		}

		OFFSET = document.querySelector("#prev").getAttribute("data-prev");
		document.querySelector("#page").innerHTML = document.querySelector("#prev").getAttribute("data-prev");
		
		displayManga(await getAllManga());
	}

}