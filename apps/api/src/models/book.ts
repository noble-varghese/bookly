import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { BaseAttributes, baseFields } from "./base";
import { Author } from './author';

interface BookAttributes extends BaseAttributes {
    title: string;
    description: string;
    publishedDate: Date;
    authorId: string;
    coverUrl: string
}

class Book extends Model<BookAttributes> implements BookAttributes {
    declare id: string;
    declare title: string;
    declare publishedDate: Date;
    declare authorId: string;
    declare description: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare coverUrl: string
}

Book.init({
    ...baseFields,
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publishedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'published_date'
    },
    authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'author_id',
        references: {
            model: Author,
            key: 'id',
        },
    },
    coverUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    }
}, {sequelize});

export { Book };
