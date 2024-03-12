import LogsService from "../services/LogsService";
import { NextType, RequestType, ResponseType } from "../types/types";
import ErrorResponse from "../utils/ErrorResponse";

const logsService = new LogsService();

export const getAllLogs = async (req: RequestType, res: ResponseType, next: NextType) => {
    try {
        const logs = await logsService.findAll(req.queryParams, req.query.page);

        if (!logs) return next(new ErrorResponse('Error getting logs', 500));

        return res.status(200).json({
            success: true,
            message: 'Logs fetched!',
            count: logs?.data?.length,
            data: logs.data,
            pagination: logs.pagination,
        });
    } catch (error) {
        return next(error);
    }
};

// @desc    Get Single Log by ID
// @route   GET /api/v1/logs/:id
// @access  Private -> admin
export const getSingleLog = async (req: RequestType, res: ResponseType, next: NextType) => {
    const { id } = req.params;
    try {
        const log = await logsService.findById(id as unknown as number);

        if (!log) return next(new ErrorResponse('Error getting log', 500));
        return res.status(200).json({
            success: true,
            message: 'Log fetched!',
            data: log,
        });
    } catch (error) {
        return next(error);
    }
};
