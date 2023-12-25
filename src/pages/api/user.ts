/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { BASE_URL, MAIZUO } from "../constant/baseUrl";
import { Response } from "../types";
import {
  amountInf,
  amountResponseInf,
  cardInf,
  cardResponseInf,
  loginRequestInf,
} from "../types/user";
import request from "../utils/request";

// export const getUserData = () => {
//   return request.get("/user.json");
// };

export const getUserData = () => {
  return request.get(`${BASE_URL}/user/getInfo?k=5840910`, {
    headers: {
      "X-Host": "mall.user.info.get",
      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
  });
};

export const login = (data: loginRequestInf) => {
  return request.post(`${BASE_URL}/user/login?k=5840910`, data, {
    headers: {
      "X-Host": "mall.user.sms-code-login",
      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
  });
};

export const getCardList = (): Response<cardInf> => {
  return request.get(`${BASE_URL}/user-coupon/getInfo?k=5840910`);
};

export const getCardAmount = (): Response<amountInf> => {
  return request.get(`${MAIZUO}?k=5840910`, {
    headers: {
      "X-Host": "mall.asset.balance.info",
      "X-Client-Info":
        '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481","bc":"340800"}',
    },
  });
};
