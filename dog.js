let timer;
let deleteDelay;

// asinchronyzed function
async function start() {
    try{
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        createBreedList(data.message);
    } catch (e) {
        console.log("Error: fetch was unsuccessful");
    }
}

start();

function createBreedList(breedList) {

    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed){
            return `<option>${breed}</option>`;
        }).join('')}
    </select>
    `;
}

async function loadByBreed(breed) {
    if(breed != "Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images
        `);
        const data = await response.json();
        createSlideshow(data.message);
    }
}

function createSlideshow(images) {
    let current=0;
    clearInterval(timer);
    clearTimeout(deleteDelay);

    if(images.length > 1){
        document.getElementById("slideShow").innerHTML = `
        <div class="slide" style="background-image: url('${images[current]}')"></div>
        <div class="slide" style="background-image: url('${images[current+1]}')"></div>
        `;
        current+=2;
        if(images.length == 2) current = 0 ;
        timer = setInterval(nextSlide, 3000);
    } else {
        document.getElementById("slideShow").innerHTML = `
        <div class="slide" style="background-image: url('${images[current]}')"></div>
        <div class="slide"></div>
        `;
    }

    function nextSlide() {
        document.getElementById("slideShow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[current]}')"></div>`);
        deleteDelay = setTimeout(function (){
            document.querySelector(".slide").remove()
        },1000);
        if(current+1 >=images.length){
            current=0;
        }else {
            current++;
        }
    }

}