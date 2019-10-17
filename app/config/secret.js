module.exports = {

  database: process.env.DATABASE || 'mongodb://localhost/starter',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'secretstory',

}