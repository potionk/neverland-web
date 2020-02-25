/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('free_comments', {
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
        model: 'free_bbs',
        key: 'id'
      }
    },
    contents: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    write_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'free_comments'
  });
};
