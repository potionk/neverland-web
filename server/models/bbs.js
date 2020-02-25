/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bbs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    contents: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    writer_id: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'account',
        key: 'name'
      }
    },
    write_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    class: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'free'
    },
    views: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'bbs'
  });
};
