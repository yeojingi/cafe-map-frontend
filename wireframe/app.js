let foldButton = document.getElementById("fold-button");
let filterContainer = document.getElementById("filter-container");
let filters = document.querySelectorAll(".filter");
let filterTitle = document.querySelector("#filter-title");

let folded = true;

foldButton.addEventListener("click", function () {
  folded = !folded;

  if (folded) {
    filters.forEach(e => {
      e.className = "filter";
    });
    filterTitle.style.display = "none";

    foldButton.className = "";
  } else {
    filters.forEach(e => {
      e.className = "filter-unfolded";
    });
    filterTitle.style.display = "inline-block";

    foldButton.id = "unfolded-button";
  }
});


// https://www.w3schools.com/howto/howto_css_modals.asp

var modal = document.getElementById("cafe-detail");
var btn = document.getElementById("cafe-address-button");

btn.addEventListener("click", function() {
  modal.style.display = "block";
});

modal.addEventListener("click", function () {

  if (event.target == modal) {
    modal.style.display = "none";
  }
})

let tabButtons = document.querySelectorAll(".tab");
let tabPages = document.querySelectorAll('.tab-page');

tabButtons[0].addEventListener("click", () => {
  tabPages[0].style.display = "block";
  tabPages[1].style.display = "none";
  tabButtons[0].style.backgroundColor = "#7DD8FF";
  tabButtons[1].style.backgroundColor = "#0093ED";
});

tabButtons[1].addEventListener("click", () => {
  tabPages[1].style.display = "block";
  tabPages[0].style.display = "none";
  tabButtons[1].style.backgroundColor = "#7DD8FF";
  tabButtons[0].style.backgroundColor = "#0093ED";
})