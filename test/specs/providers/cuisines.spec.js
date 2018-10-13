import * as cuisineProvider from "src/js/providers/cuisines";

describe("cuisineProvider", function() {
  it("should fetch all", async () => {
    const cuisines = await cuisineProvider.fetchAll();
    expect(cuisines).to.be.an("array").that.is.not.empty;
  });
});
