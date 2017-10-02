
import { FlightManager } from './flight-manager';
import { Flight } from './flight';


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

}
