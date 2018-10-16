import "@babel/polyfill";
import chai from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";

// ----------------------------------------
// Mocha
// ----------------------------------------
mocha.setup({
  ui: "bdd"
});

// ----------------------------------------
// Chai
// ----------------------------------------
chai.use(chaiAsPromised);
global.expect = chai.expect;

global.L = {
  map: sinon.spy(),
  tileLayer: sinon.spy()
};
