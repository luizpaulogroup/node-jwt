
const jwt = require('jsonwebtoken');

const config = require('../jwt/config.json');

module.exports = async (request, response, next) => {

    try {

        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.json({ error: true, message: "Not token provide" });
        }

        const parts = authHeader.split(' ');

        if (!parts.length === 2) {
            return response.json({ error: true, message: "Token error" });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return response.json({ error: true, message: "Token malformatted" });
        }

        jwt.verify(token, config.secret, (err, decoded) => {

            if (err) {
                return response.json({ error: true, message: "Token invalid" });
            }

            request.adminId = decoded.id;

            return next();
        });

    } catch (error) {
        console.log(error.message);
    }

}