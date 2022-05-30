const { Model, DataTypes, Sequelize } = require('sequelize')

const PRODUCTO_TABLE = 'producto';

const ProductoSchema = {

    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    isbn: {
        type: DataTypes.STRING,
        unique: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING
    },
    editorial: {
        type: DataTypes.STRING
    },
    cantExistente: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

class Producto extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCTO_TABLE,
            modelName: 'Producto',
            timestamps: false
        }
    }
}

module.exports = { PRODUCTO_TABLE, ProductoSchema, Producto }