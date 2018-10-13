import * as neighborhoodsProvider from "src/js/providers/neighborhoods";

describe("neighbordhoodsProvider", function() {
  it("should fetch all", async () => {
    const neighborhoods = await neighborhoodsProvider.fetchAll();
    expect(neighborhoods).to.be.an("array").that.is.not.empty;
  });
});
