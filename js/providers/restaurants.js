import restaurantsUrl from "../../data/restaurants.json";

/**
 * Fetch all restaurants
 */
export function fetchAll() {
  return fetch(restaurantsUrl)
    .then(response => response.json())
    .then(({ restaurants }) => restaurants);
}

/**
 * Fetch all restaurants by id
 * @param {number} id
 */
export function fetchById(id) {
  return fetchAll()
    .then(restaurants => restaurants.find(r => r.id === id))
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
 */
export function fetchByNeighborhood(neighborhood) {
  return fetchAll().then(restaurants =>
    restaurants.filter(r => r.neighborhood === neighborhood)
  );
}

/**
 * Fetch all restaurants by cuisine type
 * @param {string} cuisine
 */
export function fetchByCuisine(cuisine) {
  return fetchAll().then(restaurants =>
    restaurants.filter(r => r.cuisine_type === cuisine)
  );
}
