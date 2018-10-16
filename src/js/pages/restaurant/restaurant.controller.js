import MapBox from "src/js/mapbox";

class RestaurantController {
  constructor(restaurantsProvider, restaurantPage) {
    this._restaurantsProvider = restaurantsProvider;
    this._restaurantPage = restaurantPage;
  }

  async init(restaurantId) {
    const restaurant = await this._restaurantsProvider.fetchById(restaurantId);

    this.map = new MapBox("map", {
      center: [restaurant.latlng.lat, restaurant.latlng.lng],
      zoom: 16,
      scrollWheelZoom: false
    });

    this.map.mapMarkerForRestaurant(restaurant);

    this._restaurantPage.fillRestaurantHTML(restaurant);
    this._restaurantPage.fillBreadcrumb(restaurant);
  }
}

export default RestaurantController;
