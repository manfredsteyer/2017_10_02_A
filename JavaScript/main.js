
var flightNS = {};


(function(flightNS) {

function Flight(id, from, to, date) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.date = date;
}

function FlightManager(flightCache) {
    this.flightCache = flightCache;
}

FlightManager.prototype.getFlightCount = function() {
    return this.flightCache.length;
}

FlightManager.prototype.add = function(f) {
    this.flightCache.push(f);
}

FlightManager.prototype.findById = function(id) {
    for(var i=0; i<this.flightCache.length; i++) {
        var flight = this.flightCache[i];
        if (flight.id == id) {
            return flight;
        }
    }
    // return null;
}

FlightManager.prototype.findById2 = function(id) {
    return this.flightCache.find(function(item) {
        return item.id == id;
    });
}

FlightManager.prototype.findById3 = function(id) {
    return this.flightCache.find( (item) => {
        return item.id == id;
    });
}


FlightManager.prototype.findById4 = function(id) {
    return this.flightCache.find(item => item.id == id);
}

FlightManager.prototype.findByRoute = function(from, to) {
    return this.flightCache.filter(f => f.from == from && f.to == to);
}


function ExtendedFlightManager(flightCache, limit) {
    FlightManager.call(this, flightCache);
    this.limit = limit;
}

ExtendedFlightManager.prototype = new FlightManager();

ExtendedFlightManager.prototype.add = function(f) {
    if (this.flightCache.length >= this.limit) {
        throw new Error('Limit reached!');
    }
    FlightManager.prototype.add.call(this, f);
}

    flightNS.FlightManager = FlightManager;
    flightNS.ExtendedFlightManager = ExtendedFlightManager;
    flightNS.Flight = Flight;

})(flightNS);


var Flight = flightNS.Flight;

var f1 = new Flight(1, 'Graz', 'Flagranti', '2017-10-12T17:00+01:00');
var f2 = new flightNS.Flight(2, 'Graz', 'Kognito', '2017-10-12T17:30+01:00');

// var fm = new FlightManager([]);
var fm = new flightNS.ExtendedFlightManager([], 1);

fm.add(f1);
// fm.add(f2);

console.debug('flug mit 2', fm.findById2(2));
console.debug('flug mit 4711', fm.findById4(4711));

console.debug('flug mit 4711', fm.findByRoute('Graz'));

console.debug('Alle Flüge', fm.getFlightCount());