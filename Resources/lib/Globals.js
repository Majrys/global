exports.a=1;

exports.b={"value":"xyz"};

exports.nameToIso = function(nazwaKraju) {

	var kodyKrajow = {
		"Bangladesh" : "bd",
		"Brazil" : "br",
		"Poland" : "pl",
		"United Kingdom" : "uk"
	};

	if (kodyKrajow[nazwaKraju]!==undefined) {
	
		return kodyKrajow[nazwaKraju];
				
	} else {
		
		return false; // nie ma takiego kraju, jest Lądek, Lądek Zdrój...
	}
	

};

