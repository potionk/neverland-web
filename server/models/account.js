/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    phone_num: {
      type: DataTypes.STRING(13),
      allowNull: true
    }
  }, {
    tableName: 'account'
  });
};
