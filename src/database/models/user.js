const md5 = require('md5');

const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isLength: {
          min: 12,
          max: undefined,
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        notEmpty: true,
        isMD5: true,
      },
      set(value) {
        this.setDataValue('password', md5(value));
      },
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['customer', 'seller', 'administrator']],
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'userId',
      as: 'userOrders',
    });
    User.hasMany(models.Sale, {
      foreignKey: 'sellerId',
      as: 'userSales',
    });
  };

  return User;
};

module.exports = User;
