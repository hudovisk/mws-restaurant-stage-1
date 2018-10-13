import * as neighborhoodsProvider from "src/js/providers/neighborhoods";
import * as cuisinesProvider from "src/js/providers/cuisines";
import * as restaurantsProvider from "src/js/providers/restaurants";

import * as mainPage from "./main.page";
import MainController from "./main.controller";

const mainController = new MainController(
  mainPage,
  restaurantsProvider,
  neighborhoodsProvider,
  cuisinesProvider
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

document.addEventListener("DOMContentLoaded", event => {
  mainController.init();

  mainPage.getCuisinesSelect().addEventListener("change", () => {
    mainController.updateRestaurants();
  });

  mainPage.getNeighborhoodsSelect().addEventListener("change", () => {
    mainController.updateRestaurants();
  });
});
