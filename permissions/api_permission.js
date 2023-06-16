module.exports = {
    validateApiPermission: async (req, res, next) => {
        let api_key = req.get("api-key");
        let api_secret = req.get("api-secret");
        if (api_key && api_secret) {
            if(api_key == process.env.SERVER_API_KEY && api_secret == process.env.SERVER_API_SECRET) {
                next();
            }
            else {
                return res.json({
                    status: 401,
                    message: "Access Denied! Invalid Keys."
                });
            }
        } else {
            return res.json({
                status: 401,
                message: "Access Denied! Unauthorized Request."
            });
        }
    }
};