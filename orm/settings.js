const {Sequelize, DataTypes, Model} = require('sequelize')

const init = require('./init.js')
sequelize = init.connect()

class Setting extends Model {}

Setting.init(
  {
    key: {
      type: DataTypes.TEXT,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.JSON,
      defaultValue: {},
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'Setting',
    tableName: 'settings', // Our table names don't follow the sequelize convention and thus must be explicitly declared
    timestamps: false,
  },
)

// Theme
readTheme = async function () {
  try {
    const settings = await Setting.findAll({
      where: {
        key: 'theme',
      },
    })
    return settings[0]
  } catch (error) {
    console.error('Could not find theme in the database: ', error)
  }
}

updateTheme = async function (value) {
  try {
    await Setting.update(
      {value},
      {
        where: {
          key: 'theme',
        },
      },
    )
    console.log('Theme updated successfully.')
  } catch (error) {
    console.error('Error updating the theme: ', error)
  }
}

// SMTP
readSMTP = async function () {
  try {
    const smtp = await Setting.findAll({
      where: {
        key: 'smtp',
      },
    })
    return smtp[0]
  } catch (error) {
    console.error('Could not find smtp settings in the database: ', error)
  }
}

updateSMTP = async function (value) {
  try {
    await Setting.update(
      {value},
      {
        where: {
          key: 'smtp',
        },
      },
    )
    console.log('SMTP updated successfully.')
  } catch (error) {
    console.error('Error updating the SMTP: ', error)
  }
}

// Organization
readOrganization = async function () {
  try {
    const organization = await Setting.findAll({
      where: {
        key: 'organization',
      },
    })
    return organization[0]
  } catch (error) {
    console.error('Could not find organization name in the database: ', error)
  }
}

updateOrganization = async function (value) {
  try {
    await Setting.update(
      {value},
      {
        where: {
          key: 'organization',
        },
      },
    )
    console.log('Organization name updated successfully.')
  } catch (error) {
    console.error('Error updating the organization name: ', error)
  }
}

// Governance
readSelectedGovernance = async function () {
  try {
    const governance = await Setting.findAll({
      where: {
        key: 'governance',
      },
    })
    return governance[0]
  } catch (error) {
    console.error(
      'Could not find any selected governance paths in the database: ',
      error,
    )
  }
}

updateSelectedGovernance = async function (value) {
  try {
    const selectedGovernance = await Setting.update(
      {value},
      {
        where: {
          key: 'governance',
        },
      },
    )
    console.log('Selected governance path updated successfully.')
    return selectedGovernance
  } catch (error) {
    console.error('Error updating the selected governance path: ', error)
  }
}

module.exports = {
  readTheme,
  updateTheme,
  readSMTP,
  updateSMTP,
  readOrganization,
  updateOrganization,
  readSelectedGovernance,
  updateSelectedGovernance,
}
