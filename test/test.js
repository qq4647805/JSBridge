import JSBridge from '../src/index.js';
const jsBridge=new JSBridge();
describe("new jsBridge", function() {
  it("jsBridge 对外方法 on,off,dispatch", function() {
      expect(jsBridge).to.be.a('object');
      expect(jsBridge.on).to.be.a('function');
      expect(jsBridge.off).to.be.a('function');
      expect(jsBridge.dispatch).to.be.a('function');
  });
});
