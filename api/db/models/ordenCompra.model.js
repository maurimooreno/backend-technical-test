const { Model, DataTypes, Sequelize } = require('sequelize')

const ORDEN_COMPRA_TABLE = 'ordenCompra';

const OrdenCompraSchema = {

    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    distribuidor: {
        type: DataTypes.STRING
    },
    cantProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    producto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

class OrdenCompra extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDEN_COMPRA_TABLE,
            modelName: 'OrdenCompra',
            timestamps: false
        }
    }
}

module.exports = { ORDEN_COMPRA_TABLE, OrdenCompraSchema, OrdenCompra }