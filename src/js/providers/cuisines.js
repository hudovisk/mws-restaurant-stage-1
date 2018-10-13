import { fetchAll as fetchAllRestaurants } from "./restaurants";

/**
 * Fetch all cuisines
 * @return {Promise<Array>}
 */
export function fetchAll() {
  return fetchAllRestaurants()
    .then(restaurants =>
      restaurants.reduce(
        (cuisines, restaurant) => cuisines.add(restaurant.cuisine_type),
        new Set()
      )
    )
    .then(cuisines => Array.from(cuisines));
}
