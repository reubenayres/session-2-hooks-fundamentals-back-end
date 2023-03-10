import { Router } from "express";
import bodyParser from "body-parser";
import { Contact } from "../models/contact";
import { Organization } from "../models/organization";

export default Router()
  .get("/", async (_req, res, next) => {
    try {
      const contacts = await Contact.findAll({
        include: { model: Organization, as: "organization" },
      });
      res.json(contacts);
    } catch (err) {
      res.status(400).json(err);
      next(err);
    }
  })
  .get("/:id", async (req, res, next) => {
    try {
      const c = await Contact.findByPk(req.params.id);
      res.json(c);
    } catch (err) {
      res.status(400).json(err);
      next(err);
    }
  })
  .post("/", bodyParser.json(), async (req, res, next) => {
    try {
      const c = await Contact.create(req.body);
      res.json(c);
    } catch (err) {
      res.status(400).json(err);
      next(err);
    }
  })
  .put("/:id", bodyParser.json(), async (req, res, next) => {
    try {
      const c = await Contact.findByPk(req.params.id);
      if (!c) res.status(404).json({ message: `Contact with id ${req.params.id} not found.` });
      else {
        await c.update(req.body);
        res.json(c);
      }
    } catch (err) {
      res.status(400).json(err);
      next(err);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const result = await Contact.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (result) res.json({ message: `Deleted contact with ID ${req.params.id}` });
      else res.status(400).json({ message: `There was no user with ID ${req.params.id}` });
    } catch (err) {
      res.status(400).json(err);
      next(err);
    }
  });
// .delete();
