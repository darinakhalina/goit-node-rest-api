import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegexp } from "../../constants/auth-constants.js";
import { defaultSubscription, subscriptionTypes } from "../../constants/subscription-constants.js";

const User = sequelize.define("user", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: emailRegexp,
        },
        unique: {
            args: true,
            msg: "Email in use"
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscription: {
        type: DataTypes.ENUM(...subscriptionTypes),
        defaultValue: defaultSubscription,
    },
    avatarURL: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationToken: {
        type: DataTypes.STRING,
    },
});

export default User;