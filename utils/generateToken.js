import jwt from "jsonwebtoken";

export const generateToken = (user,key,exp) => {
  return jwt.sign(user, key, {
    expiresIn: exp || "1d",
  });
};
