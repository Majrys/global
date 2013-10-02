var Globals = require("/lib/Globals");

var PobierzDaneKraju = require('/connections/PobierzDaneKraju');

var EkranDanych = require("/screens/EkranDanych");


function EkranStartowy() {

	var self = Titanium.UI.createWindow({
		title: 'Wysokie koszty niskich cen',
		backgroundImage: 'images/background.jpg',
		navBarHidden:true,
		exitOnClose: true,
		layout: 'vertical'
	});

	var tytul = Titanium.UI.createLabel({
		color: "#000",
		font: {
			fontSize: 42,
			fontWeight: 'bold'
		},
		text: 'Gdzie wyprodukowano Twoją rzecz?',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: 50
	});

	var buttonSkanuj = Titanium.UI.createButton({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		title: 'Skanuj kod kreskowy',
		font: {
			fontSize: 31,
			fontFamily: 'Helvetica Neue'
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		width: 350,
		height: 100,
		top: 50
	});

	buttonSkanuj.addEventListener("click", function(x) {
		var intent = Ti.Android.createIntent({
			action: "com.google.zxing.client.android.SCAN",
			mode: "SCAN_MODE"
		});
		var activity = Ti.Android.currentActivity;
		activity.startActivityForResult(intent, function(e) {
			Ti.API.info('e: ' + e);
			if (e.resultCode == Ti.Android.RESULT_OK) {
				var contents = e.intent.getStringExtra("SCAN_RESULT");
				var format = e.intent.getStringExtra("SCAN_RESULT_FORMAT");
				Ti.UI.createNotification({
					message: "Contents: " + contents + ", Format:" + format
				}).show();
			} else if (e.resultCode == Ti.Android.RESULT_CANCELED) {
				Ti.UI.createNotification({
					message: "Scan canceled!"
				}).show();
			} else if (e.error) {
				//Here goes code Prompting user to install app or cancel
				app.scan.getScanner();
			}
		});
	});

	// Wpisywanie ręczne

	var buttonKraj = Titanium.UI.createButton({
		width: 350,
		height: 100,
		top: 50,
		title: "Sprawdź!"
	});
	
	
	
	var okienkoCzekania = Ti.UI.createWindow({
		backgroundColor:'black',
		opacity: 0.8,
		zIndex:10,
		navBarHidden:true,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	var ladowanieNapis = Ti.UI.createLabel({
		text:"Ładowanie danych\n\nProszę czekać",
		color:'white',	
	});
	
	okienkoCzekania.add(ladowanieNapis);
	

	buttonKraj.addEventListener("click", function() {
		
		okienkoCzekania.open();
		
		
		new PobierzDaneKraju(Globals.nameToIso(kraj.value), function(odpowiedz){
			
			okienkoCzekania.close();
			
			new EkranDanych(odpowiedz).open();
					
		});
		

	});

	var kraj = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: 50,
		width: 350,
		height: 100
	});

	self.add(tytul);
	self.add(buttonSkanuj);
	self.add(buttonKraj);
	self.add(kraj);

	return self;
}

module.exports = EkranStartowy;
