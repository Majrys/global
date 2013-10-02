var Globals = require('lib/Globals');

function PobierzDaneKraju(idKraju, callback) {

	var zmienne = ['SI.POV.2DAY', 'SI.POV.NAHC', 'SI.DST.FRST.20', 'SL.TLF.0714.ZS', 'SL.UEM.TOTL.ZS', 'SN.ITK.DEFC.ZS', 'SE.ADT.LITR.ZS', 'EN.ATM.CO2E.KT', 'EN.POP.SLUM.UR.ZS'];

	var odpowiedzi = [];
	var pozycjaTabeli = 0;

	var kolejka = function() {

		var worldBank = Ti.Network.createHTTPClient({

			onload: function() {
				var data = JSON.parse(this.responseText)[1][0].value;
				odpowiedzi[pozycjaTabeli] = data;

				Ti.API.info(data);

				if (pozycjaTabeli < zmienne.length - 1) {

					pozycjaTabeli++;
					kolejka();

				} else {

					var reply = {
						country:idKraju,
						poverty: odpowiedzi[0],
						povertyNational: odpowiedzi[1],
						incomeShare: odpowiedzi[2],
						children: odpowiedzi[3],
						unemployment: odpowiedzi[4],
						undernourishment: odpowiedzi[5],
						literacy: odpowiedzi[6],
						emission: odpowiedzi[7],
						slums: odpowiedzi[8]
					};

					callback(reply); // mamy gotowe dane, wiec odsylamy je callbackiem do kolejnego widoku

					Ti.API.info("koniec iteracji");

					pozycjaTabeli = 0;

				}

			},

			onerror: function() {
				Ti.API.debug(error);
				alert('error');
			},

			timeout: 5000

		});

		worldBank.open("GET", 'http://api.worldbank.org/countries/' + idKraju + '/indicators/' + zmienne[pozycjaTabeli] + '?MRV=15&Gapfill=Y&format=json');
		worldBank.send();

	};

	kolejka();

}

module.exports = PobierzDaneKraju;
