import * as restaurantProvider from "src/js/providers/restaurants";

describe("restaurantProvider", function() {
  it("should fetch all", async () => {
    const restaurants = await restaurantProvider.fetchAll();
    expect(restaurants).to.be.an("array").that.is.not.empty;
  });

  it("should fetch by neighborhood", async () => {
    const restaurants = await restaurantProvider.fetchByNeighborhood(
      "Manhattan"
    );
    expect(restaurants).to.be.an("array").that.is.not.empty;
  });

  it("should fetch restaurant by id", async () => {
    const restaurant = await restaurantProvider.fetchById(1);
    expect(restaurant).to.be.an("object").that.is.not.empty;
  });

  it("should throw error with non existent id", () => {
    expect(restaurantProvider.fetchById(-1)).to.rejectedWith(Error);
  });

  it("should fetch by cuisine", async () => {
    const restaurants = await restaurantProvider.fetchByCuisine("Asian");
    expect(restaurants).to.be.an("array").that.is.not.empty;
  });

  describe("fetch by cuisine and neighborhood", () => {
    it("should filter by cuisine and neighborhood", async () => {
      const restaurants = await restaurantProvider.fetchByCuisineAndNeighborhood(
        "Asian",
        "Manhattan"
      );
      expect(restaurants).to.be.an("array").that.is.not.empty;
    });

    it("should accept 'all' as cuisine and neighborhood", async () => {
      const restaurants = await restaurantProvider.fetchByCuisineAndNeighborhood(
        "all",
        "all"
      );
      expect(restaurants).to.be.an("array").that.is.not.empty;
    });
  });
});
