const { Model, DataTypes, Sequelize } = require('sequelize')

const USUARIO_TABLE = 'usuario';

const UsuarioSchema = {

    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: "https://img2.freepng.es/20180204/fie/kisspng-scalable-vector-graphics-avatar-learning-icon-customer-login-avatar-5a77d3354ef990.2480330215178022933235.jpg"
    }
}

class Usuario extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USUARIO_TABLE,
            modelName: 'Usuario',
            timestamps: false
        }
    }
}

module.exports = { USUARIO_TABLE, UsuarioSchema, Usuario }