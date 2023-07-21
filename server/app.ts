import axios from "axios";
import express, { Express, Request, Response } from "express";

// This express server is used to fetch data from api and act as a middleware to access the api with CORS security and send data to the browser
const app: Express = express();

app.get("/api", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server API");
});

app.get("/api/countries", (req: Request, res: Response) => {
  axios
    .get("https://test-services.interact.technology/rest/refdata/countries")
    .then(({ data }) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

app.get("/api/professions", (req: Request, res: Response) => {
  axios
    .get("https://test-services.interact.technology/rest/refdata/professions")
    .then(({ data }) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

app.get("/api/specialties", (req: Request, res: Response) => {
  const professionId = (req.query.professionId as string) || "";

  if (professionId) {
    axios
      .get(
        `https://test-services.interact.technology/rest/refdata/specialties?professionId=${professionId}`
      )
      .then(({ data }) => res.json(data))
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      });
  } else {
    res.json([]);
  }
});

if (process.env.NODE_ENV === "production")
  app.listen(3002, () => console.log("Started"));

export default app;
