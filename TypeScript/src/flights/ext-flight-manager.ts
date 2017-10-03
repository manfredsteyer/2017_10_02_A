
import { FlightManager } from './flight-manager';
import { Flight } from './flight';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


export class ExtFlightManager extends FlightManager {

  constructor(cache: Flight[], private limit: number) {
    super(cache);
  }

  add(f: Flight) {

    if (this.flightCache.length >= this.limit) {
      throw new Error('limit reached!');
    }

    super.add(f);
  }

  /*
  loadFlights(from: string, to: string, callback: Function) {
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let flights = JSON.parse(this.responseText);
        callback(flights);
      }
    };

    xmlhttp.open("GET", `http://www.angular.at/api/flight?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, true);
    xmlhttp.send();
  }
  */

  loadFlights(from: string, to: string): Promise<Flight[]> {
    return new Promise((resolve: Function, reject: Function) => {
      let xmlhttp;
      xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let flights = JSON.parse(this.responseText);
          resolve(flights);
        }
        else if (this.status != 200 && this.readyState == 4) {
          reject(this.status + ", " + this.statusText + ", " + this.responseText);
        }
      };

      xmlhttp.open("GET", `http://www.angular.at/api/flight?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, true);
      xmlhttp.send();
    });

  }

  loadFlightsWithObservables(from: string, to: string): Observable<Flight[]> {
    return Observable.create((sender: Observer<Flight[]>) => {
      let xmlhttp;
      xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let flights = JSON.parse(this.responseText);
          sender.next(flights);
          sender.complete();
        }
        else if (this.status != 200 && this.readyState == 4) {
          sender.error(this.status + ", " + this.statusText + ", " + this.responseText);
          sender.complete();
        }
      };

      xmlhttp.open("GET", `http://www.angular.at/api/flight?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, true);
      xmlhttp.send();
    });

  }

}
