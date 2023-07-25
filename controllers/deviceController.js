/** @format */

import { v4 as uuidv4 } from 'uuid';
import { Device, DeviceInfo } from '../models/models.js';
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

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          }),
        );
      }

      return res.json(device);
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.massage));
    }
  }

  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 8;
      let offset = page * limit - limit;
      let devices;
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset });
      }
      return res.json(devices);
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.massage));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return res.json(device);
  }
}

const deviceController = new DeviceController();

export { deviceController };
