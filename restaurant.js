let Myrestaurants;

let xhr = new XMLHttpRequest();
xhr.open("GET", "restaurant.json", true);
xhr.onload = function() {
  let myData = JSON.parse(xhr.responseText);
  Myrestaurants = myData.restaurants;
  for (let items of Myrestaurants) {
    createCard(items.logo, items.name, items.specialty, items.rating, items.id);
  }
};
xhr.send();

function createCard(logos, name, cuisine, rating, id) {
  const cards = document.getElementById("cards");

  // Create card elements
  const card = document.createElement("div");
  card.classList.add("card");

  const logo = document.createElement("img");
  logo.classList.add("logo");
  logo.src = logos;

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const nameParagraph = document.createElement("p");
  nameParagraph.style.fontSize = "17px";
  nameParagraph.style.fontWeight = "600";
  nameParagraph.textContent = name;

  const cuisineParagraph = document.createElement("p");
  cuisineParagraph.style.fontSize = "15px";
  cuisineParagraph.style.fontWeight = "500";
  cuisineParagraph.textContent = cuisine;

  const ratingParagraph = document.createElement("p");
  ratingParagraph.style.fontWeight = "300";
  ratingParagraph.style.fontSize = "16px";
  ratingParagraph.innerHTML = `Rating: <span style="color: #04be00; font-weight: 400; font-size: 16px">${rating}</span>`;

  const detailsLink = document.createElement("a");
  detailsLink.classList.add("full-details");
  detailsLink.setAttribute("href", "Details.html#" + id);
  detailsLink.textContent = "Full Details";

  card.appendChild(logo);
  card.appendChild(cardInfo);
  cardInfo.appendChild(nameParagraph);
  cardInfo.appendChild(cuisineParagraph);
  cardInfo.appendChild(ratingParagraph);
  cardInfo.appendChild(detailsLink);
  cards.appendChild(card);
}
//cards after filter

function updateCards(filteredRestaurants) {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  filteredRestaurants.forEach((restaurant) => {
    createCard(
      restaurant.logo,
      restaurant.name,
      restaurant.specialty,
      restaurant.rating,
      restaurant.id
    );
  });
}
//Search 
const inputSearch = document.getElementById("inputSearch");
inputSearch.addEventListener("input", search);

function search() {
  const searchValue = inputSearch.value.toLowerCase();
  const afterFilter = Myrestaurants.filter((item) => {
    const restaurantName = item.name.toLowerCase();
    return restaurantName.includes(searchValue);
  });
  updateCards(afterFilter);
}
//filter by speciality
const specialty =document.getElementById('speciality');
specialty.addEventListener('change',Speciality)

function Speciality(){
  const filterValue= specialty.value;
  const resultS= Myrestaurants.filter((item)=>{
    const restaurantSpeciality =item.specialty;
    return restaurantSpeciality.includes(filterValue);
  })
  updateCards(resultS);
}

//filter by Rating
const rating = document.getElementById('rating');
rating.addEventListener('change', Rating);
function Rating() {
  const filterValue = parseInt(rating.value);
  const upperLimit = filterValue + 0.9;

  const resultR = Myrestaurants.filter(item => {
    const restaurantRating = parseFloat(item.rating);
    return restaurantRating >= filterValue && restaurantRating <= upperLimit;
  });

  updateCards(resultR);
}



