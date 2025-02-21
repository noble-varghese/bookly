import mongoose from "mongoose";
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { BaseAttributes, baseFields } from "./base";

export interface UserAttributes extends BaseAttributes {
  name: string;
  email: string;
}

export interface UserModel extends Model<UserAttributes> {}

export const User = sequelize.define<UserModel>('User', {
  ...baseFields,
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

// MongoDB schemas using Mongoose
export const BookSchema = new mongoose.Schema({
});