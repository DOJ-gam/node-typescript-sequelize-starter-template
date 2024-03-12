import LogsService from "../services/LogsService"
import { RequestType } from "../types/types"
import { getCurrentDateAndTime } from "./dateHelper"
import getClientIp from "./getClientIp"
const logsService = new LogsService()

export const logNames = {
    registerUser: "Register User",
    createUser: "Create User",
    getAllUsers: "Get All Users",
    getSingleUser: "Get Single User",
    updateUser: "Update User",
    deleteUser: "Delete User",
    loginUser: "Login User",
    verifyUser: "Verify User",
}
type LoggerPrams = { req: RequestType, logName: string, message?: string | unknown, status: "Success" | "Error", httpMethod: "POST" | "GET" | "PUT" | "DELETE" }
const logger = async ({ req, logName, httpMethod, message = "Success", status }: LoggerPrams) => {

    try {
        const clientIp = getClientIp(req)
        const timestamp = getCurrentDateAndTime()
        const user = req.auth;
        const logDetails = `User:[${user?.fullName}],HTTP Method:[${httpMethod}],Action:[${logName}],Status:[${status}],IP Address:[${clientIp}],User Id:[${user?.id}],Phone Number:[${user?.phone}],Timestamp:[${timestamp}],Message:[${message}]
                          `
        // handle log
        await logsService.create({ httpMethod, logName, logDetails, userId: user?.id, ipAddress: clientIp, timestamp })
    } catch (error) {
        throw error
    }


}

export default logger