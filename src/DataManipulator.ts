import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bond: number,
  lower_bond: number,
  trigger_alert: number | undefined,
  
}


export class DataManipulator {
  
  static generateRow(serverResponds: ServerRespond[]) : Row {
    const priceABC = (ServerRespond[0] .top_ask.price + ServerRespond[0] .top_bid.price) / 2;
    const priceDEF = (ServerRespond[1] .top_ask.price + ServerRespond[1] .top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperbond = 1+0.05;
    const lowerbond = 1+0.05;
      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        timestamp: ServerRespond[0].timestamp > serverRespond[1] .timestamp ?
          ServerRespond[0] .timestamp :  ServerRespond[1].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
       
      };
  }
