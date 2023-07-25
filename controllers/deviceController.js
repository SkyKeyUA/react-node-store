/** @format */

import { v4 as uuidv4 } from 'uuid';
import { Device } from '../models/models.js';
import { ApiError } from '../exceptions/ApiError.js';
import path from 'path';
import { fileURLToPath } from 'url';

class DeviceController {
  async create(req, res, next) {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuidv4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({ name, price, brandId, typeId, img: fileName });

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.massage));
    }
  }

  async getAll(req, res) {
    const types = await Device.findAll();
    return res.json(types);
  }

  async getOne(req, res) {}
}

const deviceController = new DeviceController();

export { deviceController };
