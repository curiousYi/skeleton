'use strict'
const chalk = require('chalk')
const pkg = require('./package.json')

const nameError =
`*******************************************************************
 You need to give your app a name.
 The package name
    ${pkg.name}
isn't valid. Please change it in ${__dirname}/package.json
********************************************************************`

const legalName = /^[\w\-]+$/
if (!legalName.test(pkg.name)) {
  console.error(chalk.red(nameError))
}

module.exports = pkg 