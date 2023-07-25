function getDogRow(number) {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    
    for (let i = 0; i < number; i++) {
        const newImg = document.createElement("img");
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.classList.add("mt-4");
        newImg.classList.add("img-fluid");
        fetch('https://dog.ceo/api/breeds/image/random')
		.then(res => res.json())
		.then(data => {
            newImg.setAttribute("src", `${data.message}`);
		});
        
        newImg.setAttribute("alt", "dog picture");
        newCol.appendChild(newImg);
        newRow.appendChild(newCol);
    }
    document.querySelector('#image-container').appendChild(newRow);
}

getDogRow(3);
getDogRow(3);
getDogRow(3);

let isWaiting = false;

document.addEventListener('wheel', () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

    if (window.scrollY >= scrollableHeight) {
        if (!isWaiting){
            getDogRow(3);
            isWaiting = true;
            setTimeout(() => isWaiting = false, 500);
        }
    }
})