'use strict'

const debug = require('debug')('oauth')
const Sequelize = require('sequelize')
const db = require('APP/db')

const OAuth = db.define('oauths', {
  uid: Sequelize.STRING,
  provider: Sequelize.STRING,

  // OAuth v2 fields
  accessToken: Sequelize.STRING,
  refreshToken: Sequelize.STRING,

  // OAuth v1 fields
  token: Sequelize.STRING,
  tokenSecret: Sequelize.STRING,

  profileJSON: Sequelize.JSON,
}, {
	indexes: [{fields: ['uid'], unique: true,}],
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }    
  }
})

OAuth.V2 = (accessToken, refreshToken, profile, done) =>
  this.findOrCreate({
    where: {
      provider: profile.provider,
      uid: profile.id,
    }})
    .then(oauth => {
      debug('provider:%s will log in user:{name=%s uid=%s}',
        profile.provider,
        profile.displayName,
        token.uid)
        oauth.profileJson = profile
        return db.Promise.props({
          oauth,
          user: token.getUser(),
          _saveProfile: oauth.save(),
        })
    })
    .then(({ oauth, user }) => user ||
      User.create({
        name: profile.displayName,        
      }).then(user => db.Promise.props({
        user,
        _setOauthUser: oauth.setUser(user)
      }))
    )
    .then(({ user }) => done(null, user))
    .catch(done)

OAuth.setupStrategy =
({
    provider,
    strategy,
    config,
    oauth=OAuth.V2,
    passport 
}) => {      
const undefinedKeys = Object.keys(config)
    .map(k => config[k])
    .filter(value => typeof value === 'undefined')
if (undefinedKeys.length) {
undefinedKeys.forEach(key =>
    debug('provider:%s: needs environment var %s', provider, key))
debug('provider:%s will not initialize', provider)
return
}

debug('initializing provider:%s', provider)
passport.use(new strategy(config, oauth))
}

module.exports = OAuth 