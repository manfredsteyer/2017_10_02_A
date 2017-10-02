import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Flight } from './flights/flight';
import { FlightManager } from './flights/flight-manager';
import { ExtFlightManager } from './flights/ext-flight-manager';

let f1 = new Flight(17);
f1.to = 'Graz';
f1.from = 'Hamburg';
f1.date = '2017-10-03T17:00+01:00';

let f2 = new Flight(18);
f2.to = 'Hamburg';
f2.from = 'Graz';
f2.date = '2017-10-05T17:00+01:00';

let fm = new ExtFlightManager([], 1);
// fm.add(f1);
fm.add(f2);

let result = fm.findById(18);
console.debug('found flight', result);
console.debug('flights count', fm.count);



//
// The rest of this file is needed to bootstrap the Angular Application
// within the folder app. You can ignore both for this exercise.
//

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

