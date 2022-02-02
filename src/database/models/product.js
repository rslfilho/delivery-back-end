const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    urlImage: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: true,
  });

  return Product;
};

module.exports = Product;
