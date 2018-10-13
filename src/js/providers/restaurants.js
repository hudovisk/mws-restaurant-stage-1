import restaurantsUrl from "src/data/restaurants.json";

const pathToImgs = require.context("src/img", true);

const filterByCuisine = cuisine => restaurant =>
  restaurant.cuisine_type === cuisine;

const filterNeighborhood = neighborhood => restaurant =>
  restaurant.neighborhood === neighborhood;

const findById = id => restaurant => restaurant.id === id;

const normalizeRestaurant = restaurant => ({
  ...restaurant,
  url: `./restaurant.html?id=${restaurant.id}`,
  photograph_url: pathToImgs(`./${restaurant.photograph}`, true)
});

/**
 * Fetch all restaurants
 * @return {Promise<Array>}
 */
export function fetchAll() {
  return fetch(restaurantsUrl)
    .then(response => response.json())
    .then(({ restaurants }) => restaurants)
    .then(restaurants => restaurants.map(normalizeRestaurant));
}

/**
 * Fetch all restaurants by id
 * @param {number} id
 * @return {Promise<any>}
 */
export function fetchById(id) {
  return fetchAll()
    .then(restaurants => restaurants.find(findById(id)))
    .then(restaurant => {
      if (!restaurant) {
        throw new Error("Restaurant does not exist");
      }

      return restaurant;
    });
}

/**
 * Fetch all restaurants by neighborhood name
 * @param {string} neighborhood
 * @return {Promise<Array>}
 */
export function fetchByNeighborhood(neighborhood) {
  return fetchAll().then(restaurants =>
    restaurants.filter(filterNeighborhood(neighborhood))
  );
}

/**
 * Fetch all restaurants by cuisine type
 * @param {string} cuisine
 * @return {Promise<Array>}
 */
export function fetchByCuisine(cuisine) {
  return fetchAll().then(restaurants =>
    restaurants.filter(filterByCuisine(cuisine))
  );
}

/**
 * Fetch all restaurants by cuisine type and neighborhood
 * @param {string} cuisine
 * @param {string} neighborhood
 * @return {Promise<Array>}
 */
export function fetchByCuisineAndNeighborhood(cuisine, neighborhood) {
  return fetchAll()
    .then(
      restaurants =>
        cuisine !== "all"
          ? restaurants.filter(filterByCuisine(cuisine))
          : restaurants
    )
    .then(
      restaurants =>
        neighborhood !== "all"
          ? restaurants.filter(filterNeighborhood(neighborhood))
          : restaurants
    );
}
