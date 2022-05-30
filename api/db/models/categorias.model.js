const { Model, DataTypes, Sequelize } = require('sequelize')

const CATEGORIA_TABLE = 'categoria';

const CategoriaSchema = {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}

class Categoria extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORIA_TABLE,
            modelName: 'Categoria',
            timestamps: false
        }
    }
}

module.exports = { CATEGORIA_TABLE, CategoriaSchema, Categoria }