const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      },
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Pendente',
      validate: {
        isIn: [['Pendente', 'Preparando', 'Em Trânsito', 'Entregue']],
      },
    },
  },
  {
    tableName: 'sales',
    timestamps: true,
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'userId',
      as: 'customer',
    });
    Sale.belongsTo(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'sellerId',
      as: 'seller',
    });
  };

  return Sale;
};

module.exports = Sale;
