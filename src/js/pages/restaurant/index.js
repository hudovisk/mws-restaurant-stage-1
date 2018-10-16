import querystring from "querystring";
import RestaurantController from "./restaurant.controller";
import * as restaurantPage from "./restaurant.page";

import * as restaurantsProvider from "src/js/providers/restaurants";

const restaurantController = new RestaurantController(
  restaurantsProvider,
  restaurantPage
);

document.addEventListener("DOMContentLoaded", () => {
  const search = window.location.search.replace("?", "");
  const decoded = querystring.parse(search);

  restaurantController.init(parseInt(decoded.id));
});
