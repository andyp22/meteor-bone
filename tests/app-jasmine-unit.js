(function () {
	
	"use strict";
  	
	describe("BaseRouter", function () {
		
		it("should throw an error if no options are specified", function () {
			expect(function()  { var router = new BaseRouter(); }).toThrow();
		});
		
		it("should throw an error if no factory is specified", function () {
			expect(function()  { var router = new BaseRouter({}); }).toThrow();
		});
		
		it("should not throw an error if a factory is specified", function () {
			var factory = {
				routes: {}
			};
			expect(function()  { var router = new BaseRouter({ factory: factory }); }).not.toThrow();
		});
		
	});
	
})();
