import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Flight } from './flights/flight';
import { FlightManager } from './flights/flight-manager';
import { ExtFlightManager } from './flights/ext-flight-manager';

// Nicht vergessen!
import * as $ from 'jquery';


let f1 = new Flight(17);
f1.to = 'Graz';
f1.from = 'Hamburg';
f1.date = '2017-10-03T17:00+01:00';

let f2 = new Flight(18);
f2.to = 'Graz';
f2.from = 'Hamburg';
f2.date = '2017-10-05T17:00+01:00';


let f3 = new Flight(19);
f3.to = 'Hamburg';
f3.from = 'Graz';
f3.date = '2017-10-05T17:00+01:00';

let fm = new ExtFlightManager([], 100);
fm.add(f1);
fm.add(f2);
fm.add(f3);

let result = fm.findById(18);
console.debug('found flight', result);
console.debug('found flightId', result.id);

console.debug('flights count', fm.count);


// GUI

let showResult = function (flights) {
  let html = '<table>';
  for (let f of flights) {
    html += `
      <tr>
        <td>${f.id}</td>
        <td>${f.from}</td>
        <td>${f.to}</td>
        <td>${f.date}</td>
      </tr>
    `;
  }
  html += "</table>";

  $('#result').hide();
  $('#result').html(html);
  $('#result').show('slow');
};
$('#btnSearch').click(() => {

  let from: string = $('#from').val() as string;
  let to: string = $('#to').val() as string;

  // let flights = fm.findByRoute(from, to);

  fm
    .loadFlights(from, to)
    .then((flights) => {
      showResult(flights);
      return fm.loadFlights(to, from);
    })
    .then((returnFlights) => {
        console.debug('returnFlights', returnFlights);
      }
    )
    .catch(err => {
      console.error('Error loading flights', err);
    });



});



//
// The rest of this file is needed to bootstrap the Angular Application
// within the folder app. You can ignore both for this exercise.
//

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

