var Globals = require("/lib/Globals");

function EkranCargo() {

	var self = Titanium.UI.createWindow({
		title: 'Ile kosztuje transport?',
		backgroundImage: 'images/background.jpg',
		keepScreenOn: true,
	});
	
	var cargo = Ti.UI.createWebView({
	url:'http://www.cargorouter.com'
	});


	return self;
}

module.exports = EkranCargo;
