class MapBox {
  /**
   * Map constructor
   * @param {string} mapId Map container id
   */
  constructor(mapId, options) {
    this.map = L.map(mapId, options);

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={mapboxToken}",
      {
        mapboxToken:
          "pk.eyJ1IjoiaHVkb3Zpc2siLCJhIjoiY2puNnJia3NoMDI0djNxcGoxMjI2MnNmOCJ9.E4CFG9Ow2AG1T4pWun00hA",
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox.streets"
      }
    ).addTo(this.map);

    this.mapMarkerForRestaurant = this.mapMarkerForRestaurant.bind(this);
  }

  /**
   * Maps marker for restaurant
   * @param {any} marker
   */
  mapMarkerForRestaurant(restaurant) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker(
      [restaurant.latlng.lat, restaurant.latlng.lng],
      {
        title: restaurant.name,
        alt: restaurant.name,
        url: restaurant.url
      }
    );
    marker.addTo(this.map);
    return marker;
  }
}

export default MapBox;
