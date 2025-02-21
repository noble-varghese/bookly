import { Model, DataTypes } from 'sequelize';

export interface BaseAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseModel<T extends BaseAttributes> extends Model<T>, BaseAttributes {}

export const baseFields = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
};