/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

interface gasInfo {
  max_gas?: number; // maximum amount of gas to consume for this call (integer)
  max_fee?: number; // maximum amount to charge for this call (integer, in ubnt)
  gas_price?: number; // maximum price to pay for gas (integer, in ubnt)
}

interface leaseDays {
  days: number; // number of days (integer)
  hours: number; // number of hours (integer)
  minutes: number; // number of minutes (integer)
  seconds: number; // number of seconds (integer)
}

export interface bluzelleInstance {
  version: () => Promise<string>;
  create: (
    key: string,
    value: Object,
    gas_info?: gasInfo,
    lease_info?: leaseDays,
  ) => Promise<any>;

  getKeys: () => Promise<string[]>;
}
