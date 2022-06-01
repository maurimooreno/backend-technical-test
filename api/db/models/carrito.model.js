const { Model, DataTypes, Sequelize } = require('sequelize')

const CARRITO_TABLE = 'carrito';

const CarritoSchema = {

    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    productos: {
        type: DataTypes.JSON
    }

}

class Carrito extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CARRITO_TABLE,
            modelName: 'Carrito',
            timestamps: false
        }
    }
}

module.exports = { CARRITO_TABLE, CarritoSchema, Carrito }