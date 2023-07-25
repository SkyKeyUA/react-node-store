/** @format */

import { ApiError } from '../exceptions/ApiError.js';
import bcrypt from 'bcrypt';
import { Basket, User } from '../models/models.js';
import jwt from 'jsonwebtoken';

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('e-mail or password is invalid'));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        throw ApiError.badRequest(`A user with the email address ${email} already exists`);
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      const token = jwt.sign({ id: user.id, email, role }, process.env.SECRET_KEY, {
        expiresIn: '24h',
      });
      return res.json({ token });
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.massage));
    }
  }

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
