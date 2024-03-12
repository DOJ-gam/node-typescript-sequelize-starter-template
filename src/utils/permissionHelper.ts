export const groupedPermissions = async (permissions: Array<{ id: number | null; name: string; description: string; parent: string }>) => {

    type ParentGroup = {
        parent: string;
        children: Array<{ id: number | null; name: string; description: string }>;
    };


    const parentGroups: ParentGroup[] = permissions.reduce((accumulator: ParentGroup[], field) => {
        const existingGroup = accumulator.find((group) => group.parent === field.parent);

        if (existingGroup) {
            existingGroup.children.push({ id: field.id, name: field.name, description: field.description });
        } else {
            accumulator.push({ parent: field.parent, children: [{ id: field.id, name: field.name, description: field.description }] });
        }

        return accumulator;
    }, []);

    // console.log(parentGroups);
    return parentGroups
}
export const groupedUserPermissions = async (permissions: any) => {
    let groupedArray: any = {};
    permissions.forEach((obj: any) => {
        let parentFields = JSON.stringify(["userId", "fullname", "id", "name", "description"].map(field => obj[field]));

        if (!groupedArray[parentFields]) {
            groupedArray[parentFields] = [];
        }

        groupedArray[parentFields].push(obj);
    });
    return groupedArray
}