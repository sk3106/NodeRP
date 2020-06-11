var geoip = require('geoip-lite');

exports('GetGeoIP', (arg) => {
	if (arg != null)
	{
		var geo = geoip.lookup(arg);
		
		return geo;
	}
});