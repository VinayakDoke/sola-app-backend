import jsonwebtoken from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

const refreshToken = async (req, res, token, refresh_token) => {
  try {
    const { exp } = jsonwebtoken.decode(refresh_token);
    if (exp && exp > Math.floor(Date.now() / 1000)) {
      const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: true
      });

      const decodedRefreshToken = jsonwebtoken.verify(
        refresh_token,
        process.env.JWT_REFRESH_SECRET
      );

    //   const is_valid = await authService.is_valid_token(
    //     decodedRefreshToken.session_id
    //   );

      if (decodedToken.username === decodedRefreshToken.username ) {
        const result = generateToken(
              jwtContent,
              process.env.JWT_SECRET,
              process.env.JWT_EXPIRES_IN
            )
        if (result["success"]) {
          res.cookie("access_token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 1 * 60 * 60 * 1000 // 1 hour
          });
          req.cookies.access_token = result.token;
          delete result.token;
          delete result.refresh_token;
        }
        req.user = decodedToken;
        return true; // Indicating that the token refresh was successful
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

const verifyToken = async (req, res, next) => {
  const token =  req?.cookies?.access_token;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
      return next();
    } catch (error) {
        // If token is expired, try to refresh
      const refresh_token =  req?.cookies?.refresh_token;
      if (refresh_token) {
        const isRefreshed = await refreshToken(req, res, token, refresh_token);
        if (isRefreshed) {
          return next();
        }
      }
      return res.status(401).send({
        msg: "Token Verification Failed or Missing Token outer::" + error,
        status: 401
      });
    }
  } else {
    return res.status(401).send({
      msg: "Missing Token",
      status: 401
    });
  }
};

export { verifyToken };
