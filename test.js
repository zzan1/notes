	re= /.at/g;
	console.log(re.exec("cat, aat, lat"))
	//[ 'cat', index: 0, input: 'cat, aat, lat', groups: undefined ]
	console.log(re.exec("cat, aat, lat"))
	//[ 'aat', index: 5, input: 'cat, aat, lat', groups: undefined ]
