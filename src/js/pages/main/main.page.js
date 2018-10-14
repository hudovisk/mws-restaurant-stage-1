export function getNeighborhoodsSelect() {
  return document.getElementById("neighborhoods-select");
}

export function getCuisinesSelect() {
  return document.getElementById("cuisines-select");
}

export function getSelectedCuisine() {
  const cSelect = getCuisinesSelect();
  const cIndex = cSelect.selectedIndex;

  return cSelect[cIndex].value;
}

export function getSelectedNeighborhood() {
  const nSelect = getNeighborhoodsSelect();
  const nIndex = nSelect.selectedIndex;

  return nSelect[nIndex].value;
}

/**
 * Set neighborhoods HTML.
 */
export function fillNeighborhoodsHTML(neighborhoods) {
  const select = getNeighborhoodsSelect();
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement("option");
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Set cuisines HTML.
 */
export function fillCuisinesHTML(cuisines) {
  const select = getCuisinesSelect();

  cuisines.forEach(cuisine => {
    const option = document.createElement("option");
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

function createRestaurantHTML(restaurant) {
  const li = document.createElement("li");

  const image = document.createElement("img");
  image.className = "restaurant-img";
  image.alt = "";
  image.src = restaurant.photograph_url;
  li.append(image);

  const name = document.createElement("h1");
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement("p");
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement("p");
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement("a");
  more.innerHTML = "View Details";
  more.href = restaurant.url;
  li.append(more);

  return li;
}

export function fillRestaurantsHTML(restaurants) {
  const ul = document.getElementById("restaurants-list");

  ul.innerHTML = "";

  restaurants.forEach(restaurant =>
    ul.append(createRestaurantHTML(restaurant))
  );

  const status = document.getElementById("list-status");
  status.innerText = "";
  status.innerText = "List updated!";
}
