/*
 * @Description:
 * @Version: 1.0
 * @Autor: yanxin
 * @Date: 2019-12-16 21:10:33
 * @LastEditors: yanxin
 * @LastEditTime: 2020-12-23 15:31:23
 */
import Cookies from "js-cookie";

export const TokenKey = "rhpass-web-token";

export function getToken(): string {
  return Cookies.get(TokenKey);
}

export function setToken(token: string): boolean {
  return Cookies.set(TokenKey, token, { expires: 1 });
}

export function removeToken(): boolean {
  return Cookies.remove(TokenKey);
}
