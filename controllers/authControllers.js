import authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const registerUser = async (req, res) => {
    const userData = await authServices.registerUser(req.body);

    res.status(201).json({
        user: { email: userData.email, subscription: userData.subscription },
    });
}

const verifyUser = async (req, res) => {
    const { verificationToken } = req.params;

    await authServices.verifyUser(verificationToken);

    res.status(200).json({ message: "Verification successful" });
};

export const resendVerificationMail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw HttpError(400, "Missing required field email");
    }

    await authServices.resendVerificationMail(email);

    res.status(200).json({ message: "Verification email sent" });
};

const loginUser = async (req, res) => {
    const userData = await authServices.loginUser(req.body);

    res.status(200).json({
        token: userData.token,
        user: { email: userData.email, subscription: userData.subscription },
    })
}

const getCurrentUser = async (req, res) => {
    const { email, subscription, avatarURL } = req.user;

    res.status(200).json({
        email,
        subscription,
        avatarURL,
    })
}

const logoutUser = async (req, res) => {
    await authServices.logoutUser(req.user);

    res.status(204).send();
};

const updateSubscriptionUser = async (req, res) => {
    const {
        user: { id: userId },
        body: { subscription },
    } = req;

    const user = await authServices.updateSubscriptionUser({ userId, subscription });
    res.status(200).json({ email: user.email, subscription: user.subscription });
};

const updateAvatar = async (req, res) => {
    const {
        file,
        user: { id: userId },
    } = req;

    const avatarURL = await authServices.updateAvatar({ userId, file });
    res.status(200).json({ avatarURL: avatarURL });
}

export default {
    registerUser: ctrlWrapper(registerUser),
    loginUser: ctrlWrapper(loginUser),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    logoutUser: ctrlWrapper(logoutUser),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyUser: ctrlWrapper(verifyUser),
    resendVerificationMail: ctrlWrapper(resendVerificationMail),
}