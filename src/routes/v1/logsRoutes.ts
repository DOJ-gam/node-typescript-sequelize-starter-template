import express from "express";
import { getAllLogs, getSingleLog } from "../../controllers/LogsController";
import queryParams from "../../middlewares/queryParams";


const logsRoutes = express.Router();


const acceptedQueries = [
    "userId",
    "httpMethod",
    "logName",
    "ipAddress",
];


logsRoutes.route("/").get(queryParams(
    acceptedQueries,
    "Logs",
), getAllLogs)
logsRoutes.route("/:id").get(getSingleLog)

export default logsRoutes;