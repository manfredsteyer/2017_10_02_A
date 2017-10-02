import { Flight } from './flight';

export class FlightManager {

  constructor(protected flightCache: Array<Flight>) {
  }

  add(flight: Flight): void {
    this.flightCache.push(flight);
  }

  findById(id: number): Flight {
    return this.flightCache.find(f => f.id === id);
  }

  findByRoute(from: string, to: string): Flight[] {
    return this.flightCache.filter(f => f.from === from && f.to === to);
  }

  get count(): number {
    return this.flightCache.length;
  }

}
