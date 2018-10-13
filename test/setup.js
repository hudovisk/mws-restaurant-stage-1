import "@babel/polyfill";
import chai from "chai";
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
