import jwt from "jsonwebtoken";
import { asyncHandler } from "./async.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { User } from "../models/User.js";

// Protect routes
const userAuth = asyncHandler(async (req, res, next) => {
  if (!req.header("Authorization")) {
    return next(new ErrorResponse(req.t('login_make_sure_error'), 401));

  }
  const token = req.header("Authorization").replace("Bearer ", "");
  const userData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    _id: userData.id,
  });


  if (!user) {
    return next(new ErrorResponse(req.t('invalid_credentials_error'), 401));
  }


  req.user = user;
  next();
});


export { userAuth };
