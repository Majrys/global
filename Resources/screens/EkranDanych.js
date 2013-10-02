var Globals = require("/lib/Globals");

function EkranDanych(daneKraju) {

	Ti.API.info("elo");

	var self = Titanium.UI.createWindow({
		title: 'Skąd jest Twój produkt?',
		backgroundImage: 'images/background.jpg',
		navBarHidden:true,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		zIndex:15
	});
		

	var myScrollView = Ti.UI.createScrollView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout:'vertical'	
	});

	
	var tytul2 = Titanium.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 48,
			fontWeight: 'bold'
		},
		text: 'Kraj pochodzenia towaru to:',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		top: 50,
		left: 25
	});

	var country = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 42,
			fontWeight: 'bold'
		},
		text: daneKraju.country,
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		top: 50,
		left: 25
	});

	var poverty = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		text: '% osób żyjących za 2$ dziennie: ' + daneKraju.poverty,
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		top: 50,
		left: 25,
	});

	
	

	var povertyNational = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		text: '% osób żyjących w ubóstwie (dane krajowe): ' + daneKraju.povertyNational,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: 50,
		left: 25
	});

	var incomeShare = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: 'Ile procent majątku posiada dolne 20% populacji? ' + daneKraju.incomeShare,
		top: 50,
		left: 25
	});

	
	

	var children = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: 'Jaki procent dzieci pracuje zawodowo: ' + daneKraju.children,
		top: 50,
		left: 25
	});

	var unemployment = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: '% osób bezrobotnych: ' + daneKraju.unemployment,
		top: 50,
		left: 25
	});

	var undernourishment = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: '% osób niedożywionych: ' + daneKraju.undernourishment,
		top: 50,
		left: 25
	});

	var literacy = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: '% osób umiejących czytać ' + daneKraju.literacy,
		top: 50,
		left: 25
	});

	var emissions = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: 'Ilość emisji CO2: ' + daneKraju.emissions,
		top: 50,
		left: 25
	});

	var slums = Ti.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 28
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: '% osób żyjących w slumsach ' + daneKraju.slums,
		top: 50,
		left: 25
	});

	var cargoButton = Ti.UI.createButton({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		title: 'A ile kosztuje transport?',
		font: {
			fontSize: 31,
			fontFamily: 'Helvetica Neue'
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		width: Ti.UI.FILL,
		height: 100,
		top: 50,
		right: 30
	});

	
	

	cargoButton.addEventListener('click', function() {
	//			win3.add(cargo);
	//	 win3.open();
	//	 cargo.evalJS("document.getElementById('DISPtxt').value = Delhi;");
	//	 cargo.evalJS("document.getElementById('DESTtxt').value = Warsaw;");
	});


	self.add(myScrollView);

	myScrollView.add(tytul2);
	myScrollView.add(country);
	myScrollView.add(poverty);
	myScrollView.add(povertyNational);
	myScrollView.add(incomeShare);
	myScrollView.add(children);
	myScrollView.add(unemployment);
	myScrollView.add(undernourishment);
	myScrollView.add(literacy);
	myScrollView.add(emissions);
	myScrollView.add(slums);

	myScrollView.add(cargoButton);
	
	return self;

}

module.exports = EkranDanych;
