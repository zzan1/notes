var book = {
	_year: 2004,
	edition: 1
};

Object.defineProperties(book,{
	"year":{
		"value": 2005
	},
	"edition":{
		"value": 3
	}
})

console.log(book.year);

console.log(book.edition);
