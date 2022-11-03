import { ServerRespond } from './DataStreamer';

export interface Row {
  stock: string,
  top_ask_price: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]):Row {
    const priceABC = (serverRespond[0].top_ask_price + serverReaspond[0].top_bid_price)/2;
    const priceDEF = (serverRespond[1].top_ask_price + serverReaspond[1].top_bid_price)/2;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 + 0.05;
    return {
      price_abc:priceABC,
      price_def:priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: ( ratio > upperBound || ratio < lowerBound) ? ratio:undefined,
      };
  }
}
