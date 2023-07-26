/** @format */

import { ApiError } from '../exceptions/ApiError.js';
import jwt from 'jsonwebtoken';

const checkRoleMiddleware = (role) => (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unauthorizedError());
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return next(ApiError.unauthorizedError());
    }

    const userData = jwt.verify(token, process.env.SECRET_KEY);
    if (!userData) {
      return next(ApiError.unauthorizedError());
    }
    if (userData.role !== role) {
      return next(ApiError.forbidden());
    }
    req.user = userData;
    next();
  } catch (e) {
    console.log(e);
    return next(ApiError.unauthorizedError());
  }
};

export { checkRoleMiddleware };
