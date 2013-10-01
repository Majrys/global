// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
	title : 'Wysokie koszty niskich cen',
	backgroundImage : 'images/background.jpg',
	exitOnClose: true
});

var win2 = Titanium.UI.createWindow({
	title : 'Skąd jest Twój produkt?',
	backgroundImage : 'images/background.jpg',
	keepScreenOn: true,
	modal: true
});

var win3 = Titanium.UI.createWindow({
	title : 'Ile kosztuje transport?',
	backgroundImage : 'images/background.jpg',
	keepScreenOn: true,
});

var cargoButton = Ti.UI.createButton({
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	title : 'A ile kosztuje transport?',
	font : {
		fontSize : 31,
		fontFamily : 'Helvetica Neue'
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 450,
	height : 100,
	top : 800,
	right: 30
});

var cargo = Ti.UI.createWebView({
	url:'http://www.cargorouter.com'
	});

var tytul = Titanium.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 42,
		fontWeight : 'bold'
	},
	text : 'Gdzie wyprodukowano Twoją rzecz?',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 100
});

var tytul2 = Titanium.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 48,
		fontWeight : 'bold'
	},
	text : 'Kraj pochodzenia towaru to:',
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	top : 50,
	left : 25
});

// Skanowanie kodu kreskowego

var buttonSkanuj = Titanium.UI.createButton({
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color : '#336699',
	title : 'Skanuj kod kreskowy',
	font : {
		fontSize : 31,
		fontFamily : 'Helvetica Neue'
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : 350,
	height : 100,
	top : 250
});

buttonSkanuj.addEventListener("click", function(x) {
	var intent = Ti.Android.createIntent({
		action : "com.google.zxing.client.android.SCAN",
		mode : "SCAN_MODE"
	});
	var activity = Ti.Android.currentActivity;
	activity.startActivityForResult(intent, function(e) {
		Ti.API.info('e: ' + e);
		if (e.resultCode == Ti.Android.RESULT_OK) {
			var contents = e.intent.getStringExtra("SCAN_RESULT");
			var format = e.intent.getStringExtra("SCAN_RESULT_FORMAT");
			Ti.UI.createNotification({
				message : "Contents: " + contents + ", Format:" + format
			}).show();
		} else if (e.resultCode == Ti.Android.RESULT_CANCELED) {
			Ti.UI.createNotification({
				message : "Scan canceled!"
			}).show();
		} else if (e.error) {
			//Here goes code Prompting user to install app or cancel
			app.scan.getScanner();
		}
	});
});

// Wpisywanie ręczne

var kraj = Ti.UI.createTextField({
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color : '#336699',
	top : 900,
	width : 350,
	height : 100
});

var buttonKraj = Titanium.UI.createButton({
	width : 350,
	height : 100,
	top : 1025,
	title : "Sprawdź!"
});

// Dane ze wskaźników

var country = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 42,
		fontWeight : 'bold'
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	top : 100,
	left : 25
});

var poverty = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	top : 200,
	left : 25,
});


var povertyNational = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 250,
	left : 25
});

var incomeShare = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 300,
	left : 25
});

var children = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 350,
	left : 25
});

var unemployment = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 400,
	left : 25
});

var undernourishment = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 450,
	left : 25
});

var literacy = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 500,
	left : 25
});

var emissions = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 550,
	left : 25
});

var slums = Ti.UI.createLabel({
	color : "#000",
	font : {
		fontSize : 28
	},
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	top : 600,
	left : 25
});


var nameToIso = function() {

	var names = {
		"Bangladesh" : "bd",
		"Brazil" : "br",
		"Poland" : "pl",
		"United Kingdom" : "uk"
	};

	if (names[kraj.value] !== undefined) {
		kraj.value = names[kraj.value];
	} else {
		alert("Niewłaściwa nazwa kraju!");
	}
};

var bankCountry = Ti.Network.createHTTPClient({
	onload : function() {
		var countryId = JSON.parse(this.responseText)[1][0].name;
		country.text = countryId;
	},

	onerror : function() {
		Ti.API.debug(error);
		alert('error');
	},

	timeout : 5000 // in milliseconds
});

win2.add(tytul2);
win2.add(country);

win2.add(poverty);
win2.add(povertyNational);
win2.add(incomeShare);
win2.add(children);
win2.add(unemployment);
win2.add(undernourishment);
win2.add(literacy);
win2.add(emissions);
win2.add(slums);

var zmienne = ['SI.POV.2DAY', 'SI.POV.NAHC', 'SI.DST.FRST.20', 'SL.TLF.0714.ZS', 'SL.UEM.TOTL.ZS', 'SN.ITK.DEFC.ZS', 'SE.ADT.LITR.ZS', 'EN.ATM.CO2E.KT', 'EN.POP.SLUM.UR.ZS'];
var obiekty = [poverty, povertyNational, incomeShare, children, unemployment, undernourishment, literacy, emissions, slums];
var pozycjaTabeli = 0;

var kolejka = function() {
	var worldBank = Ti.Network.createHTTPClient({

		onload : function() {
			var data = JSON.parse(this.responseText)[1][0].value;
			obiekty[pozycjaTabeli].text = data;
			Ti.API.info(data);

			if (pozycjaTabeli < zmienne.length - 1) {

				pozycjaTabeli++;
				kolejka();

			} else {

				Ti.API.info("koniec iteracji");
				pozycjaTabeli = 0;
				poverty.text = '% osób żyjących za 2$ dziennie:' + " " + poverty.text + "%";
				povertyNational.text = '% osób żyjących w ubóstwie (dane krajowe):' + ' ' + povertyNational.text + '%';
				incomeShare.text = 'Ile procent majątku posiada dolne 20% populacji?' + ' ' + incomeShare.text + '%';
				children.text = 'Jaki procent dzieci pracuje zawodowo:' + ' ' + children.text + '%';
				unemployment.text = '% osób bezrobotnych:' + ' ' + unemployment.text + '%';
				undernourishment.text = '% osób niedożywionych:' + ' ' + undernourishment.text + '%';
				literacy.text = '% osób umiejących czytać' + ' ' + literacy.text + '%';
				emissions.text = 'Ilość emisji CO2:' + ' ' + emissions.text + 'kiloton';
				slums.text = '% osób żyjących w slumsach' + ' ' + slums.text + '%';
			}
		},

		onerror : function() {
			Ti.API.debug(error);
			alert('error');
		},

		timeout : 5000 // in milliseconds
	});

	worldBank.open("GET", 'http://api.worldbank.org/countries/' + kraj.value + '/indicators/' + zmienne[pozycjaTabeli] + '?MRV=15&Gapfill=Y&format=json');
	worldBank.send();
};

var szukajKraju = {
	format : "json",
};

win2.addEventListener('android:back', function(e) {
	Ti.API.info("Log: The Android back button was pressed - DO SOMETHING!!!!");
	win2.close();
});

buttonKraj.addEventListener("click", function() {
	nameToIso();
	bankCountry.open("GET", 'http://api.worldbank.org/countries/' + kraj.value + '?format=json');
	bankCountry.send();
	kolejka();
	win2.open();
	kraj.value = "";
});

cargoButton.addEventListener('click', function() {
	win3.add(cargo);
	win3.open();
	cargo.evalJS("document.getElementById('DISPtxt').value = Delhi;");
	cargo.evalJS("document.getElementById('DESTtxt').value = Warsaw;");
});

win1.add(buttonSkanuj);
win1.add(buttonKraj);
win1.add(kraj);
win1.add(tytul);
win2.add(cargoButton);
win1.open();

