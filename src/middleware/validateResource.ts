import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {



    console.log("Body: " + JSON.stringify(req.body));
    console.log("Query: " + JSON.stringify(req.query));
    console.log("Params: " + JSON.stringify(req.params));

    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      console.log(e)
      return res.status(400).send(e.errors);
    }
  };

export default validate;
