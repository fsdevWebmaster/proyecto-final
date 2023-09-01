import jwtDecode from "jwt-decode";

export class JWTHelper {
  static decodeToken(token: string): any {
    return  jwtDecode(token);
  }
}