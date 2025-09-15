import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";

import authServices from "../services/authServices.js";

const authenticate = async (req, res, next) => {
    const authorization = req.get("Authorization");
    if (!authorization) {
        throw HttpError(401, "Not authorized");
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
        throw HttpError(401, "Not authorized");
    }

    const { payload, error } = verifyToken(token);
    if (error) {
        throw HttpError(401, "Not authorized");
    }

    const user = await authServices.findUser({ id: payload.id });
    if (!user || !user.token || user.token !== token) {
        throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
};

export default authenticate;
