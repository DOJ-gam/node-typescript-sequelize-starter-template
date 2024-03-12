import ErrorResponse from "./ErrorResponse";

const requoredFieldsValidator = (data: any, fieldsToExclude?: string[]) => {


    const requiredFields = getKeysFromObject(data)

    // Filter out fields with a type of boolean
    const nonBooleanFields = requiredFields.filter((field: any) => typeof data[field] !== 'boolean');

    // Exclude specified fields from validation
    let fieldsToValidate;

    if (fieldsToExclude && fieldsToExclude.length > 0) {

        fieldsToValidate = fieldsToExclude
            ? nonBooleanFields.filter((field: any) => !fieldsToExclude.includes(field))
            : nonBooleanFields;
    } else {
        fieldsToValidate = nonBooleanFields;
    }

    const missingFields = fieldsToValidate.filter((field: any) => !data[field]);
    // const missingFields = requiredFields.filter((field: any) => !data[field]);

    if (missingFields.length > 0) {
        const missingFieldsList = missingFields.join(", ");
        throw new ErrorResponse(`Missing required fields: ${missingFieldsList}`, 400);
    }
};

const getKeysFromObject = (obj: any) => Object.keys(obj);

export default requoredFieldsValidator 