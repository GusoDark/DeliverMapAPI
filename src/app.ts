import express from "express";
import 'dotenv/config';
import { AppRoutes } from "./presentation/routes";
import { MongoDatabase } from "./data/init";
import { envs } from "./config/envs.plugin";
import { emailOrderRegisteredJob } from "./domain/jobs/emailRegister.jobs";
import { emailDeliveredJob } from "./domain/jobs/emailDelivered.jobs";

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async ()=> {
  await MongoDatabase.connect(
    {
      dbName:"DeliverMapAPI",
      mongoUrl:envs.MONGO_URL ?? ""
    }
  )
})();

app.listen(envs.PORT, ()=> {
  console.log("Servidor esta corriendo");
  emailOrderRegisteredJob();
  emailDeliveredJob();
});