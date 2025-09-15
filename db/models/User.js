import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegexp } from "../../constants/auth-constants.js";

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
        type: DataTypes.ENUM,
        values: ["starter", "pro", "business"], // ToDo - move
        defaultValue: "starter", // add constant
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
});

// await User.sync({ alter: true });

export default User;