import { Router } from "express";

const routes = Router();

import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

// Items
routes.get("/items", ItemsController.list);

// Points
routes.post("/points", PointsController.create);
routes.get("/points/:id", PointsController.show);
routes.get("/points", PointsController.index);

export default routes;
