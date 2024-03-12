import {
  RequestType,
  ResponseType,
  NextType
} from "../types/types";
import { Model, Op, Sequelize } from "sequelize";

const filterParams =
  (acceptedParams: string[], model: string) =>
    (req: RequestType,
      res: ResponseType,
      next: NextType
    ) => {
      // loop through the query params and choose allowed ones
      const queryParameters: any = {};
      for (const param of acceptedParams) {
        if (req.query[param]) {
          queryParameters[param] = req.query[param];
        }
      }

      // update it to fit sequelize
      const updatedQuery: any = {};
      const entries = Object.entries(queryParameters);
      entries.forEach(([key, value]) => {
        // check if it is fullname, and return it
        if (key === "fullName") {
          updatedQuery[Op.and] = [
            Sequelize.where(
              Sequelize.fn(
                "CONCAT_WS",
                " ",
                Sequelize.col(`${model}.firstName`),
                Sequelize.fn("NULLIF", Sequelize.col(`${model}.middleName`), ""),
                Sequelize.col(`${model}.lastName`)
              ),
              { [Op.like]: `%${value}%` }
            ),
            //   {
            //     "$role.roleName$": {
            //       [Op.eq]: "admin",
            //     },
            //   },
          ];
          // } else if (key === "phone") {
          //   updatedQuery["mobileNumber"] = { [Op.like]: `%${value}%` };
        } else if (key === "role") {
          // console.log(key, value);
          // if (value) {
          //   updatedQuery[Op.and] = [
          //     Sequelize.where({
          //       "$role.name$": { [Op.like]: `%${value}%` },
          //     }),
          //   ];
          // }
        } else {
          updatedQuery[key] = { [Op.like]: `%${value}%` };
        }
      });
      //   remove fullname if it exists to avoid error
      delete updatedQuery.fullname;
      req.queryParams = updatedQuery;
      next();
    };

export default filterParams;
