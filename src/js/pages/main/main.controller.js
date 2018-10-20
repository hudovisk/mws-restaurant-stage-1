import MapBox from "src/js/mapbox";

class MainController {
  constructor(
    page,
    restaurantsProvider,
    neighborhoodsProvider,
    cuisinesProvider
  ) {
    this.page = page;
    this.restaurantsProvider = restaurantsProvider;
    this.neighborhoodsProvider = neighborhoodsProvider;
    this.cuisinesProvider = cuisinesProvider;

    this._restaurants = [];
    this._neighborhoods = [];
    this._cuisines = [];
    this._markers = [];
    this.map = null;
  }

  init() {
    this.map = new MapBox("map", {
      center: [40.722216, -73.987501],
      zoom: 12,
      scrollWheelZoom: false
    });

    return Promise.all([
      this._loadNeighborhoods(),
      this._loadCuisines(),
      this.updateRestaurants()
    ]).catch(e => console.error(e));
  }

  async updateRestaurants() {
    this._restaurants = await this._loadRestaurantsByFilter();

    // Update HTML
    this.page.fillRestaurantsHTML(this._restaurants);

    // Remove old markers
    this._markers.forEach(marker => marker.remove());

    // Add new markers to the map
    this._markers = this._restaurants.map(this.map.mapMarkerForRestaurant);
    this._markers.forEach(
      marker =>
        marker &&
        marker.on("click", () => {
          window.location.href = marker.options.url;
        })
    );
  }

  async _loadRestaurantsByFilter() {
    const cuisine = this.page.getSelectedCuisine();
    const neighborhood = this.page.getSelectedNeighborhood();

    return this.restaurantsProvider.fetchByCuisineAndNeighborhood(
      cuisine,
      neighborhood
    );
  }

  async _loadNeighborhoods() {
    this._neighborhoods = await this.neighborhoodsProvider.fetchAll();
    this.page.fillNeighborhoodsHTML(this._neighborhoods);
  }

  async _loadCuisines() {
    this._cuisines = await this.cuisinesProvider.fetchAll();
    this.page.fillCuisinesHTML(this._cuisines);
  }
}

export default MainController;
