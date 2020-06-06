function Book() {}

Book.prototype.name = 'Tom'

book1 = new Book()

Book.prototype = {
  constructor: Book,
  name: 'Wang',
  sayName: function () {
    return this.name
  },
}

book2 = new Book()

// book1 没有 sayname
console.log(book2.sayName(), book1.sayName) 

// book1 no chage
console.log(
  book2.name,
  book1.name
)

for (let property in book2) {
  console.log(property)
}
console.log("-------")
for (let property in book1) {
  console.log(property)
}

// book1 no longer is belong to Book, (Ture, false)
console.log(book2 instanceof Book, book1 instanceof Book)

// ture false
console.log(Book.prototype.isPrototypeOf(book2), Book.prototype.isPrototypeOf(book1))

console.log(Book.constructor)