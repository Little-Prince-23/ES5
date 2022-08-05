const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//Start UI
const ui = new UI();

//Create storage object
const storage = new Storage();

//Download all elements
eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms)
}

function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" | director === "" | url === ""){
        console.error(`Bütün inputlar doldurulmayıb!`);
        ui.displayMessages("Bütün xanaları doldurun!", "danger")
    }
    else{
        //New movie
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm)//Add movie to screen

        storage.addFilmToStorage(newFilm); //Add movie to storage

        ui.displayMessages("Film əlavə olundu!", "success")

    }

    ui.clearInputs(titleElement, directorElement, urlElement);


    e.preventDefault();
}

function deleteFilm(e){

    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Silindi...", "success");

    }
}

function clearAllFilms(){
    if(confirm("Əminsinizmi")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
    // ui.displayMessages("Bütün filmlər silindi...", "success");
}

