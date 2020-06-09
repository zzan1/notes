var name = 'The'

var object = {
	name: "Obj",
	getNameFunc: function(a){
		var that = this;
		return function(){
			console.log(that.arguments)
			return that.name;
		}
	}
}

console.log(object.getNameFunc()())