const { Model, DataTypes, Sequelize } = require('sequelize')

const PEDIDO_TABLE = 'pedido';

const PedidoSchema = {

    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    monto: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
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