import list from "../src/list";
import chai = require("chai");
var expect = chai.expect;

describe("addLast", function(){
	it("should add elements at last", function(){
		var l = list<number>();
		l.addLast(4);
		l.addLast(5);
		var elements: number[] = [];
		l.forEach(function(el){
			elements.push(el);
		});
		expect(l.size).to.equal(2);
		expect(elements).to.deep.equal([4, 5]);
	});
});

describe("addFirst", function(){
	it("should add elements at first", function(){
		var l = list<number>();
		l.addFirst(4);
		l.addFirst(5);
		var elements: number[] = [];
		l.forEach(function(el){
			elements.push(el);
		});
		expect(l.size).to.equal(2);
		expect(elements).to.deep.equal([5, 4]);
	});
});

describe("findAndRemove", function(){
	it("should remove element", function(){
		var l = list();
		l.addFirst(4);
		l.addFirst(5);
		expect(l.size).to.equal(2);
		var res = l.findAndRemove(4);
		expect(res).to.equal(true);
		expect(l.size).to.equal(1);
	});
	
	it("should return false if element doesnt exist", function(){
		var l = list();
		l.addFirst(4);
		l.addFirst(5);
		var res = l.findAndRemove(6);
		expect(res).to.equal(false);
		expect(l.size).to.equal(2);
	});
});

describe("contains", function(){
	it("should return true if contains element, false otherwise", function(){
		var l = list();
		l.addFirst(4);
		l.addFirst(5);
		expect(l.contains(4)).to.equal(true);
		expect(l.contains(5)).to.equal(true);
		expect(l.contains(6)).to.equal(false);
	});
});

describe("remove", function(){
	it("multiple remove doesnt do anything", function(){
		var l = list();
		l.addFirst(4);
		var node = l.addFirst(5);
		node.remove();
		expect(l.size).to.equal(1);
		node.remove();
		expect(l.size).to.equal(1);
	});
});

describe("node", function(){
	describe("addBefore", function(){
		it("should insert node before the given node", function(){
			var l = list();
			l.addLast(1);
			var n = l.addLast(2);
			l.addLast(3);
			n.addBefore(11);
			expect(l.get(1)).to.equal(11);
			expect(l.get(0)).to.equal(1);
			expect(l.get(2)).to.equal(2);
			expect(l.get(3)).to.equal(3);
		});
	});

	describe("addAfter", function(){
		it("should insert node after the given node", function(){
			var l = list();
			l.addLast(1);
			var n = l.addLast(2);
			l.addLast(3);
			n.addAfter(11);
			expect(l.get(0)).to.equal(1);
			expect(l.get(1)).to.equal(2);
			expect(l.get(2)).to.equal(11);
			expect(l.get(3)).to.equal(3);
		});
	});

});

describe("get", function(){
	it("should return null if item not defined", function(){
		var l = list();
		expect(l.get(3)).to.be.null;
	});
});