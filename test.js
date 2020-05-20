var color='blue';

function chageColor(){
	var newColor='red'

	function swapColor(){
		var tempColor=newColor;
		color='yellow';
		console.log(color);
	}

	swapColor();
	console.log(newColor, color);
}

chageColor();
