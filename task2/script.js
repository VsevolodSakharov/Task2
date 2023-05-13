const URL = "https://www.googleapis.com/books/v1/volumes?q="
const fields = "fields=totalItems,items/volumeInfo(title, authors,publisher,publishedDate,description,categories,averageRating,imageLinks/thumbnail)";
const KEY = "AIzaSyDtcDzfyPGRVxMSono-HwGXNO_oIgqkDI0";
const fromInput = document.querySelector("input");
const fromSelect = document.querySelector("#search-select");
const insert = document.querySelector("form");

async function searchBook(e) {
  e.preventDefault();
  try {
  const response = await fetch(`${URL}${fromInput.value}+${fromSelect.value}&${fields}&:keyes&key=${KEY}`);
  var result = await response.json();
  var counter = Object.keys(result.items).length;
  }
  catch{err => console.log(err)};

  if (result.totalItems>0){
    for(var i=0; i<counter; i++){
      insert.insertAdjacentHTML("beforeend",
      '<section class="card">'+
      '<img src="'+ result.items[i].volumeInfo.imageLinks.thumbnail +'" class="card__image" alt="Text">'+
      '<p class="card__title">'+ result.items[i].volumeInfo.title +'</p>'+
      '<p class="card__category">'+ result.items[i].volumeInfo.categories +'</p>'+
      '<p class="card__rating">'+ result.items[i].volumeInfo.averageRating +'</p>'+
      '<p class="card__authors">'+ result.items[i].volumeInfo.authors +'</p>'+
      '<p class="card__publisher">'+ result.items[i].volumeInfo.publisher +'</p>'+
      '<p class="card__publishedDate">'+ result.items[i].volumeInfo.publishedDate +'</p>'+
      '<p class="card__description">'+result.items[i].volumeInfo.description +'</p>'+
      '</section>');
    }
  } else{
    insert.insertAdjacentHTML("beforeend", '<p class="card searchfail">No search results.</p>');
  };
  
}

function clearFields(e){
  e.preventDefault();
  const field = document.querySelectorAll(".card");
  for (let i = 0; i < field.length; i++) {
    field[i].remove();
  }
}

async function search(e){
  clearFields(e);
  searchBook(e);
}

const btn = document.querySelector("button");
btn.addEventListener("click", search);