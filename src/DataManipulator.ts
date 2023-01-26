import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
    const abc = serverResponds[0]
    const def = serverResponds[1]

    const price_abc = (abc.top_ask.price + abc.top_bid.price) / 2
    const price_def = (def.top_ask.price + def.top_bid.price) / 2
    const ratio = price_abc / price_def
    const timestamp = (abc.timestamp > def.timestamp ? abc.timestamp : def.timestamp)
    const lower_bound = 0.9
    const upper_bound = 1.1
    const trigger = (ratio > upper_bound || ratio < lower_bound ? ratio : undefined)

    return {
      price_abc,
      price_def,
      ratio,
      timestamp,
      upper_bound,
      lower_bound,
      trigger
    }
  }
}
