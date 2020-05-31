var book = {
	_year: 2004,
	edition: 1
};

Object.defineProperty(book, "year", {
	get: function() {
		return this._year;
	},

	set: function(newValue) {
		this._year = newValue;
	}
});

console.log(book.year);

book.year = 2005;

console.log(book.year);
