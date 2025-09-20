import authServices from "../services/authServices.js";

const registerUser = async (req, res) => {
    const userData = await authServices.registerUser(req.body);

    res.status(201).json({
        user: { email: userData.email, subscription: userData.subscription },
    });
}

const loginUser = async (req, res) => {
    const userData = await authServices.loginUser(req.body);

    res.status(200).json({
        token: userData.token,
        user: { email: userData.email, subscription: userData.subscription },
    })
}

const getCurrentUser = async (req, res) => {
    const { email, subscription } = req.user;

    res.status(200).json({
        email: email,
        subscription: subscription
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

export default {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    updateSubscriptionUser,
}