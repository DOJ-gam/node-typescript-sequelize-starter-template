import express from "express";
import { getAllLogs, getSingleLog } from "../../controllers/LogsController";
import filterParams from "../../middlewares/filterParams";


const logsRoutes = express.Router();


const acceptedQueries = [
    "userId",
    "httpMethod",
    "logName",
    "ipAddress",
];


logsRoutes.route("/").get(filterParams(
    acceptedQueries,
    "Logs",
), getAllLogs)
logsRoutes.route("/:id").get(getSingleLog)

export default logsRoutes;