import jwt from "jsonwebtoken";
import { envConfigs } from "./envconfig";
const secret = envConfigs.jwtsecret || "difficult_secret";
// console.log("secret", secret);
const tokenExpire:any = envConfigs.tokenexpire;
export const generateToken = (payload: { userId: string }) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: tokenExpire });
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

export const verifyToken = (token: string) => {
  try {
    if (!token.startsWith("Bearer ")) throw new Error("Invalid token");
    // const newToken =  token.slice(7)
    return jwt.verify(token.slice(7), secret);
  } catch (error: any) {
    throw new Error(`Error verifying token: ${error.message}`);
  }
};
