const { DataTypes } = require("sequelize");

const { db } = require("./../database/config");

const Repair = db.define("repairs", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },

    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        enum: ["pending", "completed", "cancelled"]
    },
 
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Repair;