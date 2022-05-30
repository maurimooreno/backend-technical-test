const { Model, DataTypes, Sequelize } = require('sequelize')

const PEDIDO_TABLE = 'pedido';

const PedidoSchema = {

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
    monto: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }

}

class Pedido extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PEDIDO_TABLE,
            modelName: 'Pedido',
            timestamps: false
        }
    }
}

module.exports = { PEDIDO_TABLE, PedidoSchema, Pedido }