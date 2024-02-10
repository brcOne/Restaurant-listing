let Myrestaurants;
let xhr = new XMLHttpRequest();
xhr.open("GET", "restaurant.json", true);
xhr.onload = () => {
  let myData = JSON.parse(xhr.responseText);
  Myrestaurants = myData.restaurants;

  for (let ids of Myrestaurants) {
    if (window.location.hash.substring(1) == ids.id) {
      createDetails(
        ids.logo,
        ids.name,
        ids.specialty,
        ids.rating,
        ids.phone,
        ids.website,
        ids.hours,
        ids.address
      );
    }
  }
};
xhr.send();

function createDetails(biglogo, name, specialty, rating, phone, website, hours,adress) {
    const detailsContainer = document.getElementById("details");
  
    // Create big-card div
    const bigCard = document.createElement("div");
    bigCard.classList.add("big-card");
  
    // Create cover div with image
    const cover = document.createElement("div");
    cover.classList.add("cover");
    const img = document.createElement("img");
    img.src = biglogo;
    cover.appendChild(img);
  
    // Create card-info div
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
  
    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = name;
  
    const specialtyParagraph = document.createElement("p");
    specialtyParagraph.textContent = specialty;
  
    const schedulesContainer = document.createElement("div");
    schedulesContainer.classList.add("schedules");
  

    for (const [day, time] of Object.entries(hours)) {
      const dayElement = document.createElement("span");
      dayElement.classList.add("days");
      dayElement.textContent = `${day} :`;
  
      const timeElement = document.createElement("span");
      timeElement.classList.add("time");
      timeElement.textContent = time;
  
      const brElement = document.createElement("br");
  
      schedulesContainer.appendChild(dayElement);
      schedulesContainer.appendChild(timeElement);
      schedulesContainer.appendChild(brElement);
    }
  
    const ratingParagraph = document.createElement("p");
    ratingParagraph.classList.add("rating");
    ratingParagraph.innerHTML = `<span>${rating}</span>`;
  
    const adressParagraph = document.createElement("p");
    adressParagraph.classList.add("adress");
    adressParagraph.innerHTML = `Adress: <span class="adress">${adress}</span>`;

    const phoneParagraph = document.createElement("p");
    phoneParagraph.innerHTML = `Phone: <span class="infos">${phone}</span>`;
  
    const websiteParagraph = document.createElement("p");
    websiteParagraph.innerHTML = `Website: <span class="infos">${website}</span>`;
  
    // Append everything to card-info div
    cardInfo.appendChild(nameParagraph);
    cardInfo.appendChild(specialtyParagraph);
    cardInfo.appendChild(schedulesContainer);
    cardInfo.appendChild(ratingParagraph);
    cardInfo.appendChild(adressParagraph);
    cardInfo.appendChild(phoneParagraph);
    cardInfo.appendChild(websiteParagraph);
  
    // Append cover and card-info to big-card
    bigCard.appendChild(cover);
    bigCard.appendChild(cardInfo);
  
    // Append big-card to detailsContainer
    detailsContainer.appendChild(bigCard);
}
