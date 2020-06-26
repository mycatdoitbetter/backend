import knex from "../database/connection";
import { Request, Response } from "express";

class ItemsController {
  async list(require: Request, response: Response) {
    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => ({
      id: item.id,
      name: item.titulo,
      url: `http://localhost:3333/uploads/${item.image}`,
    }));

    return response.json(serializedItems);
  }
}

export default new ItemsController();
