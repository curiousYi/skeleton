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

const reasonableName = /^[[a-z0-9]\-]*$/
if (!reasonableName.test(pkg.name)) {
  console.error(chalk.red(nameError))
}

pkg.isTesting = !!global.it

module.exports = {
    get name() { return pkg.name },
    get isTesting() { return !!global.it },
    get isProduction() {
        return process.env.NODE_ENV === 'production'
    },
    package: pkg,
}