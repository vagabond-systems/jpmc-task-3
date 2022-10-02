import { ServerRespond } from './DataStreamer';
import './Graph.tsx';

export interface Row {
  price_abc: 'float',
  price_def: 'float',
  ratio: 'float',
  timestamp: 'date',
  upper_bound: 'float',
  lower_bound: 'float',
  trigger_alert: 'float',
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) /2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) /2;
    const ratio=priceABC/priceDEF;
    const upperBound= 1+ 0.05;
    const lowerBound= 1- 0.05;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp>serverRespond[1].timestamp ?
         serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio>upperbound || ratio<lowerbound)? ratio:undefined,
    };
 }
}
