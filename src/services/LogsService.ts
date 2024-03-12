import LogsModel, { LogsModelAttributes } from "../models/Logs";
import ErrorResponse from "../utils/ErrorResponse";

export default class LogsService {
    async create(data: LogsModelAttributes) {
        try {
            const createdData = await LogsModel.create(data);
            return createdData;
        } catch (error) {
            throw error;
        }
    }

    async findAll(query?: any, currentPage?: any) {
        try {
            const ITEMS_PER_PAGE = 10;

            const page = parseInt(currentPage as string, 10) || 1;



            const queryParams = query ? query : {};

            const { count, rows: data } = await LogsModel.findAndCountAll({
                order: [["id", "DESC"]],
                where: { ...queryParams },
                limit: ITEMS_PER_PAGE,
                offset: (page - 1) * ITEMS_PER_PAGE,
            });

            const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

            const result = {
                data,
                pagination: {
                    total_records: count,
                    current_page: page,
                    total_pages: totalPages,
                    next_page: page < totalPages ? page + 1 : null,
                    prev_page: page > 1 ? page - 1 : null,
                },
            };

            return result;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        if (!id) throw new ErrorResponse('Error finding data, No ID provided', 404);
        try {
            const foundData = await LogsModel.findByPk(id);
            return foundData;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<LogsModelAttributes>) {
        if (!id || !data) throw new ErrorResponse('Error updating data. No id or data is provided', 404);

        try {
            const existingData = await LogsModel.findByPk(id);
            if (!existingData) {
                throw new ErrorResponse('Data not found', 404);
            }

            const updatedData = await existingData.update(data);
            return updatedData;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        if (!id) throw new ErrorResponse('Error deleting data. No id is provided', 404);

        try {
            const deletedData = await LogsModel.destroy({ where: { id } });
            if (!deletedData) {
                throw new ErrorResponse('Data not found', 404);
            }
            return deletedData;
        } catch (error) {
            throw error;
        }
    }
}