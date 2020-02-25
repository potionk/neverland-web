/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    writer_id: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'account',
        key: 'name'
      }
    },
    body_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bbs',
        key: 'id'
      }
    },
    contents: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    write_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'comments'
  });
};
