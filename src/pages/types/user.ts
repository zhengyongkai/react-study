export interface user {
  accountName: string;
  birthday: string;
  gender: 0 | 1;
  hasDefaultAddr: number;
  hasPassword: number;
  hasPayPwd: number;
  headIcon: string;
  mail: string;
  mobile: string;
  nickName: string;
  thirdAccount: Array<string>;
  userId: number;
}

export interface userState {
  user: {
    userData: user;
    token: string;
  };
}

export interface loginRequestInf {
  extra: {};
  imgCode: string;
  imgKey: string;
  mobile: string;
  smsCode: string;
}

export interface cardInf {
  availableBalance: number;
  cardsCount: number;
  couponCount: number;
  deliveryOrderCount: number;
  payOrderCount: number;
  receiveGoodsCount: number;
}

export interface cardResponseInf {
  data: cardInf;
}

export interface amountInf {
  availableAmount: number;
  frozenAmount: number;
  totalAmount: number;
}

export interface amountResponseInf {
  data: amountInf;
}
