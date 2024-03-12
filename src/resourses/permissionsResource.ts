import { PermissionModelAttributes } from "../models/Permission";

const addPermision = (body: { data: PermissionModelAttributes[] }) => {
    return body?.data?.map((data) => ({
        name: data?.name,
        // parent: data?.parent,
        description: data?.description,
    }));

};
const updatePermision = (body: PermissionModelAttributes) => {
    return {
        name: body.name,
        description: body.description,
        // parent: body?.parent,
    };
};

export default {
    addPermision,
    updatePermision

}