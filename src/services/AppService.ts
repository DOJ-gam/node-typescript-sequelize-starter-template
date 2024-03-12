import { FindOptions, Model, ModelStatic } from "sequelize";
import ErrorResponse from "../utils/ErrorResponse";


export default class AppService<T extends Model<any, any>> {
    private model: ModelStatic<T>;
    private resource?: FindOptions<T>;

    constructor(model: ModelStatic<T>, resource?: FindOptions<T>) {
        this.model = model;
        this.resource = resource;
    }

    async create(data: any) {
        try {
            const createdData = await this.model.create(data, { ...this.resource });
            return createdData;
        } catch (error) {
            throw error;
        }
    }

    async findAll(query?: any) {
        const reqQuery = typeof query !== "object" ? {} : query
        try {
            const allData = await this.model.findAll({ where: { ...reqQuery }, ...this.resource });
            return allData;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        if (!id) throw new ErrorResponse("Error finding data, No ID provided", 404);
        try {
            const foundData = await this.model.findByPk(id, { ...this.resource });
            return foundData;
        } catch (error) {
            throw error;
        }
    }

    async update(id: any, data: Partial<any>) {
        if (!id || !data) throw new ErrorResponse("Error updating data, No ID or data provided", 404);
        try {
            const existingData = await this.model.findByPk(id);
            if (!existingData) {
                throw new ErrorResponse('Data not found', 404);
            }

            const updatedData = await this.model.update(data, { where: { id } });

            return updatedData;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: any) {
        if (!id) throw new ErrorResponse("Error deleting data, No ID provided", 404);
        try {
            const deletedData = await this.model.destroy({ where: { id } });
            if (!deletedData) {
                throw new ErrorResponse('Data not found', 404);
            }
            return { success: true, message: 'Data deleted' };
        } catch (error) {
            throw error;
        }
    }
}
