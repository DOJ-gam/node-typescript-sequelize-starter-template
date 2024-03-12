
// Function to extract the client's IP address from the request
const getClientIp = (req: any) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
        const forwardedIps = forwarded.split(",").map((ip: any) => ip.trim());
        return forwardedIps[0];
    }
    return req.connection.remoteAddress;
};

export default getClientIp