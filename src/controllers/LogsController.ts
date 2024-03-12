import LogsService from "../services/LogsService";
import { NextType, RequestType, ResponseType } from "../types/types";
import ErrorResponse from "../utils/ErrorResponse";

const logsService = new LogsService();

// // @desc    Add Log
// // @route   POST /api/v1/logs
// // @access  Private -> admin
// export const createLog = async (req: RequestType, res: ResponseType, next: NextType) => {
//     const data = resource.register(req.body);

//     try {
//         const log = await logsService.create(data);

//         return res.status(201).json({
//             success: true,
//             message: 'Log Created Successfully',
//             data: log,
//         });
//     } catch (error) {
//         return next(error);
//     }
// };

// @desc    Get all Logs
// @route   GET /api/v1/logs
// @access  Private -> admin
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

// // @desc    Update Log
// // @route   PUT /api/v1/logs/:id
// // @access  Private -> admin
// export const updateLog = async (req: RequestType, res: ResponseType, next: NextType) => {
//     try {
//         const { id } = req.params;
//         const data = resource.update(req.body);

//         const log = await logsService.update(id as unknown as number, data);

//         if (!log) return next(new ErrorResponse('Error updating log', 500));
//         return res.status(200).json({
//             success: true,
//             message: 'Log Updated!',
//         });
//     } catch (error) {
//         return next(error);
//     }
// };

// // @desc    Delete Log by ID
// // @route   DELETE /api/v1/logs/:id
// // @access  Private -> admin
// export const deleteLog = async (req: RequestType, res: ResponseType, next: NextType) => {
//     const { id } = req.params;
//     try {
//         const log = await logsService.delete(id as unknown as number);

//         if (!log) return next(new ErrorResponse('Error Deleting log', 500));
//         return res.status(200).json({
//             success: true,
//             message: 'Log Deleted!',
//         });
//     } catch (error) {
//         return next(error);
//     }
// };
