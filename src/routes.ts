import { Express, Request, Response } from "express";
import { createContactHandler, deleteContactHandler, getContactHandler, getContactListHandler, updateContactHandler } from "./controller/contact.controller";
import {   createUserSessionHandler, getUserSessionsHandler, deleteSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createContactSchema, deleteContactSchema, getContactSchema, editContactSchema } from "./schema/contact.shema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/register", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);
  

  app.get("/api/contact-list", requireUser, getContactListHandler);

  app.post(
    "/api/add",
    [requireUser, validateResource(createContactSchema)],
    createContactHandler
  );

  app.get("/api/edit", requireUser, getContactHandler);

  app.put(
    "/api/edit",
    [requireUser, validateResource(editContactSchema)],
    updateContactHandler
  );

  app.delete(
    "/api/delete/:id",
    [requireUser, validateResource(deleteContactSchema)],
    deleteContactHandler
  );
}

export default routes;
