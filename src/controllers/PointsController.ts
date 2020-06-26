import knex from "../database/connection";

import { Request, Response } from "express";
class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedId = await knex("points").insert(point);

    const point_id = insertedId[0];
    const pointsItems = items.map((item_id: any) => ({
      item_id,
      point_id,
    }));

    await knex("point_items").insert(pointsItems);

    return response.json({ id: point_id, ...point });
  }

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItem = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const point = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItem)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return response.json(point);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found" });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id);

    return response.json({ point, items });
  }
}

export default new PointsController();
