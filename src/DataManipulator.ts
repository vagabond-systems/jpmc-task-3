import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0]. top_bid.price) /2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1]. top_bid.price) /2;
    const ratio = priceABC /priceDEF;
    const upperBond = 1 + 0.05;
    const lowerbound = 1 - 0.05;
      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
        upper_bound: upperBond,
        lower_bound: lowerbound,
        trigger_alert: (ratio > upperBond || ratio < lowerBound) ? ratio : undefined,
      };
    }
  }
}
