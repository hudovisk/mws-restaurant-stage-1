import { fetchAll as fetchAllRestaurants } from "./restaurants";
import { Set } from "core-js";

/**
 * Fetch all neighborhoods
 * @return {Promise<Array>}
 */
export function fetchAll() {
  return fetchAllRestaurants()
    .then(restaurants =>
      restaurants.reduce(
        (neighborhoods, restaurant) =>
          neighborhoods.add(restaurant.neighborhood),
        new Set()
      )
    )
    .then(neighborhoods => Array.from(neighborhoods));
}
