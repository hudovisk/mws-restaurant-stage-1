/**
 * Create restaurant HTML and add it to the webpage
 */
export function fillRestaurantHTML(restaurant) {
  const name = document.getElementById("restaurant-name");
  name.innerHTML = restaurant.name;

  const address = document.getElementById("restaurant-address");
  address.innerHTML = restaurant.address;

  const image = document.getElementById("restaurant-img");
  image.className = "restaurant-img";
  image.src = restaurant.photograph_url;
  image.alt = "";

  const cuisine = document.getElementById("restaurant-cuisine");
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML(restaurant.operating_hours);
  }
  // fill reviews
  fillReviewsHTML(restaurant.reviews);
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
export function fillRestaurantHoursHTML(operatingHours) {
  const hours = document.getElementById("restaurant-hours");
  for (let key in operatingHours) {
    const row = document.createElement("tr");

    const day = document.createElement("td");
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement("td");
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
export function fillReviewsHTML(reviews) {
  const container = document.getElementById("reviews-container");
  const title = document.createElement("h2");
  title.innerHTML = "Reviews";
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement("p");
    noReviews.innerHTML = "No reviews yet!";
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById("reviews-list");
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
export function createReviewHTML(review) {
  const li = document.createElement("li");
  const info = document.createElement("div");
  info.className = "info";

  const name = document.createElement("p");
  name.innerHTML = review.name;
  info.appendChild(name);

  const date = document.createElement("p");
  date.innerHTML = review.date;
  info.appendChild(date);

  li.appendChild(info);

  const rating = document.createElement("p");
  rating.innerHTML = `Rating: ${review.rating}`;
  rating.className = "rating";
  li.appendChild(rating);

  const comments = document.createElement("p");
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
export function fillBreadcrumb(restaurant) {
  const breadcrumb = document.getElementById("breadcrumb");
  const li = document.createElement("li");
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}
