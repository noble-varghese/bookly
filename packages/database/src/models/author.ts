import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { BaseAttributes, baseFields } from "./base";

interface AuthorAttributes extends BaseAttributes {
    name: string;
    biography: string;
    bornDate: Date;
    avatarUrl: string
}

class Author extends Model<AuthorAttributes> implements AuthorAttributes {
    declare id: string;
    declare name: string;
    declare biography: string;
    declare bornDate: Date;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare avatarUrl: string;
}

Author.init({
    ...baseFields,
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bornDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'born_date'
    },
    avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'avatar_url'
    }
}, {
    sequelize
});

export { Author };
