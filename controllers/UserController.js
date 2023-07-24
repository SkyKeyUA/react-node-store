/** @format */

import { ApiError } from '../exceptions/ApiError.js';

class UserController {
  async registration(req, res) {}

  async login(req, res, next) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("id isn't found"));
    }
    res.json(id);
  }
}

const userController = new UserController();

export { userController };
