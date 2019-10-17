var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database'); // get db config file
var User = require('../models/user'); // get the mongoose model
var Contact = require('../models/contact'); // get the mongoose model
var Business = require('../models/business'); // get the mongoose model
var Investor = require('../models/investor'); // get the mongoose model
var Chave = require('../models/chave'); // get the mongoose model
var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');
var dateTime = require('node-datetime');
var ip = require("ip");
var nodemailer = require('nodemailer');
var randomstring = require("randomstring");
var request = require("request");
var async = require("async");
var queue = require('../node_modules/async/queue');
var ObjectID = require('mongodb').ObjectID;
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var bcrypt = require('bcryptjs');
// connect to database
/* mongoose.connect(config.database); */
var db = mongoose.connection;

// pass passport for configuration
require('../config/passport')(passport);

// bundle our routes
var router = express.Router();

/*---------------------------------------------------------------------
ROUTE PARA CRIAR UM USER (POST http://localhost:8080/api/signup)
*-------------------------------------------------------------------*/
router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass name and password.' });
  }
  else {
    var cont = db.collection("users").count(function(err, cnt) {
      var dt = dateTime.create();
      var formatted = dt.format('Y-m-d H:M:S');
      var id_gerado = randomstring.generate();
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        role: 'cliente',
        accType: 'free',
        accCreatedOn: formatted,
        lastSignedIn: '',
        lastAccIp: ip.address(),
        isActive: 'true',
        accountNumber: cnt,
        accountPoint: '',
        accountPlan: '',
        account_state: 'Created',
        id_gerado: id_gerado
      });
      var token = jwt.encode(newUser, config.secret);
      var token_uniq = jwt.encode(newUser, config.secret2);
      // save the user
      newUser.save(function(err, user) {
        if (err) {
          return res.json({ success: false, msg: 'Username already exists.' });
        }
        var newChave = new Chave({
          id_gerado: id_gerado,
          token: token,
          token_uniq: token_uniq
        });
        newChave.save(function(err, chave) {
          if (err) {
            return res.json({ success: false, msg: 'Erro ao gerar chave' });
          }
          console.log(config.email)
          console.log(config.email_password)
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.email,
              pass: config.email_password
            }
          });

          var mailOptions = {
            from: config.email,
            to: req.body.email,
            subject: 'Portfollium Confirmação de conta',
            text: 'https://portfapp-cloned-noxyo.c9users.io/user/activate/id_gerado=' + id_gerado
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            }
            else {
              console.log('Email sent: ' + info.response);
              res.json({ success: true, msg: 'Successful created new user. ' });
            }
          });
        });
      });
    });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA AUTENTICAR UM USER (POST http://localhost:8080/api/authenticate)
*-------------------------------------------------------------------*/
router.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, msg: 'Authentication failed. User not found.' });
    }
    else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var myquery = { username: req.body.username };
          var formatted = dateTime.create();
          var timeNow = formatted.format('Y-m-d H:M:S');
          var newvalues = { $set: { lastSignedIn: timeNow } };
          db.collection("users").updateOne(myquery, newvalues, function(err, rep) {
            if (err) throw err;
          });
          console.log(user.id_gerado);
          // return the information including token as JSON
          res.json({ success: true, id_gerado: user.id_gerado });
        }
        else {
          res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
          console.log("PASSWORD WRONG");
        }
      });
    }
  });
});

/*---------------------------------------------------------------------
ROUTE PARA ACEDER AS INFORMACOES RESTRITAS DE UM USER (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/
router.get('/activate', function(req, res) {
  var id_gerado = req.headers.authorization;
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (!chave) {
        res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
        console.log("Authentication failed. Wrong password.")
      }
      else {
        if (chave.token_uniq != '') {
          var decoded = jwt.decode(chave.token_uniq, config.secret2);
          if (err) {
            res.status(403).send({ success: false, msg: 'Erro no jwt' });
            console.log("Erro no jwt")
          }
          else {

            var myquery = { username: decoded.username };
            var formatted = dateTime.create();
            var timeNow = formatted.format('Y-m-d H:M:S');
            var newvalues = { $set: { account_state: 'Email_Confirmed' } };
            var id_chave = { id_gerado: id_gerado };
            var chave_uniq = { $set: { token_uniq: '' } };
            db.collection("users").updateOne(myquery, newvalues, function(err, res) {
              if (err) {
                res.status(403).send({ success: false, msg: 'Erro ao atualizar o user' });
                console.log("Erro ao atualizar o user")
              }
            });
            db.collection("chaves").updateOne(id_chave, chave_uniq, function(err, rp) {
              if (err) {
                res.status(403).send({ success: false, msg: 'Erro ao atualizar as chaves' });
                console.log("Erro ao atualizar as chaves")
              }
            });
            res.send({ success: true, msg: 'Welcome in the member area ' });
            console.log("Welcome in the member area ")
          }
        }
        else {
          res.send({ success: true, msg: 'Welcome in the member area ' });
        }
      }
    });
  }
  else {
    res.status(403).send({ success: false, msg: 'No token provided.' });
    console.log("Authentication failed. Wrong password.")
  }
});

/*---------------------------------------------------------------------
ROUTE PARA ACEDER AS INFORMACOES RESTRITAS DE UM USER (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/
router.get('/memberinfo' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
  var id_gerado = req.headers.authorization;
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            res.json({ success: true, user: user });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA ACEDER AS INFORMACOES RESTRITAS DE UM USER (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/
router.get('/profile' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
  var id_gerado = req.headers.authorization;
  var id_profile = req.headers.id_profile;
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            User.findOne({
              accountNumber: id_profile
            }, function(err, profile) {
              if (err) throw err;

              if (!profile) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
              }
              else {
                res.json({ success: true, user: user, profile: profile });
              }
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA EDITAR UM USER (POST http://localhost:8080/api/signup)
*-------------------------------------------------------------------*/
router.post('/changeinfo', function(req, res) {
  var imagem = req.body.imagem;
  var password = req.body.password;
  var password2 = req.body.password2
  if (imagem === 'undefined') {
    imagens = '';
  }
  else {
    var imagens = req.body.imagem;
  }
  var id_gerado = req.headers.authorization;
  console.log(id_gerado);
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        console.log(chave.token);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            console.log(user);
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            if (password == password2) {
              bcrypt.genSalt(11, function(err, salt) {
                if (err) {
                  return err;
                }
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                  if (err) {
                    return err;
                  }
                  req.body.password = hash;
                  var cont = db.collection("users").count(function(err, cnt) {
                    var dt = dateTime.create();
                    var formatted = dt.format('Y-m-d H:M:S');
                    var newUser = {
                      $set: {
                        password: password,
                        email: req.body.email,
                        name: req.body.name,
                        phone: req.body.phone,
                        country: req.body.country,

                        nifNumber: req.body.nifNumber,
                        address: req.body.address,
                        codigo_postal: req.body.codigo_postal,
                        distrito: req.body.distrito,
                        imagem: req.body.imagem
                      }
                    };
                    var myquery = { username: decoded.username };
                    db.collection("users").updateOne(myquery, newUser, function(err, dbb) {
                      if (err) {
                        return res.json({ success: false, msg: 'Business already exists.' });
                      }
                      else {
                        res.json({ success: true, msg: 'Welcome in the member area ' + dbb });
                      }
                    });
                  });
                });
              });
            }
          }
        });
      }
    })
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA REGISTAR INVESTIDOR PRIVADO
*-------------------------------------------------------------------*/
router.post('/investidor_privado', /* passport.authenticate('jwt', { session: false }), */ function(req, res) {
  var id_gerado = req.headers.authorization;
  console.log(id_gerado);
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;
          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            var cont = db.collection("investors").count(function(err, cnt) {
              if (err) throw err;
              var newInvestor = new Investor({
                investorType: {
                  privado: [{
                    fullName: req.body.name,
                    nifNumber: req.body.nif,
                    country: req.body.country,
                    adress: req.body.morada,
                    codio_postal: req.body.codigo_postal,
                    distrito: req.body.distrito,
                    estadoCivil: req.body.estado_civil,
                    phone: req.body.telemovel,
                    email: req.body.email,
                    displayName: req.body.nome_apresentacao
                  }],
                },
                investorNumber: cnt,
              });

              newInvestor.save(function(err) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                console.log("NEGOCIO REGISTADO");
                res.json({ success: true, msg: 'Successful created new business.' });
              });
              var myquery = { username: decoded.username }
              var newvalues = {
                $set: {
                  accountPoint: 'concluido',
                  accountType: req.body.accountType,
                  accountTypeID: cnt
                }
              };
              db.collection("users").findOneAndUpdate(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("USER ALTERADO");
              });
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA REGISTAR INVESTIDOR COLETIVO
*-------------------------------------------------------------------*/
router.post('/investidor_coletivo' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
  var id_gerado = req.headers.authorization;
  console.log(id_gerado);
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;
          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            var cont = db.collection("investors").count(function(err, cnt) {
              if (err) throw err;
              var newInvestor = new Investor({
                investorType: {
                  colectivo: [{
                    companyName: req.body.nome_empresa,
                    constitutionDate: req.body.date,
                    socialCapital: req.body.capital_social,
                    nifNumber: req.body.nif,
                    companyContacts: [{
                      street: req.body.morada,
                      postalCode: req.body.codigo_postal,
                      sede: '',
                      distrito: req.body.distrito,
                      socialUrl: req.body.social_url,
                      website: req.body.website
                    }],
                    tipoSociedade: req.body.tipo_sociedade,
                    sectorAtividade: req.body.setor_atividade,
                    privateProfile: [{
                      CAE: req.body.cae,
                      juridicDefinition: req.body.definicao_juridica,
                      activityType: req.body.tipo_atividade,
                      state: req.body.estado,
                      processos: req.body.processos,
                      courtAction: req.body.acoes_tribunal,
                      tributarySituation: req.body.situacao_tributaria
                    }],
                  }],
                },
                investorNumber: cnt,
              });

              newInvestor.save(function(err) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                console.log("NEGOCIO REGISTADO");
                res.json({ success: true, msg: 'Successful created new business.' });
              });

              var myquery = { username: decoded.username }
              var newvalues = {
                $set: {
                  email: req.body.email,
                  name: req.body.name,
                  phone: req.body.telemovel,
                  country: req.body.country,
                  accountPoint: 'concluido',
                  accountType: req.body.accountType,
                  accountTypeID: cnt
                }
              };
              db.collection("users").findOneAndUpdate(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("USER ALTERADO");
              });
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA REGISTAR BUSINESS
*-------------------------------------------------------------------*/
router.post('/business' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
  var id_gerado = req.headers.authorization;
  console.log(id_gerado);
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;
          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            var cont = db.collection("businesses").count(function(err, cnt) {
              if (err) throw err;

              var newBusiness = new Business({
                businessType: {
                  company: [{
                    companyName: req.body.nome_empresa,
                    constitutionDate: req.body.date,
                    socialCapital: req.body.capital_social,
                    nifNumber: req.body.nif,
                    companyContacts: [{
                      street: req.body.morada,
                      postalCode: req.body.codigo_postal,
                      sede: '',
                      socialUrl: req.body.social_url,
                      website: req.body.website
                    }],
                    tipo_sociedade: req.body.tipo_sociedade,
                    sector_atividade: req.body.setor_atividade,
                    regiao: req.body.regiao,
                    privateProfile: [{
                      CAE: req.body.cae,
                      juridicDefinition: req.body.definicao_juridica,
                      activityType: req.body.tipo_atividade,
                      state: req.body.estado,
                      processos: req.body.processos,
                      courtAction: req.body.acoes_tribunal,
                      tributarySituation: req.body.situacao_tributaria
                    }],
                  }],
                },
                businessNumber: cnt,
                logo_url: req.body.logo_url,
                foto_url: req.body.foto_url
              });

              newBusiness.save(function(err) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                console.log("NEGOCIO REGISTADO");
                res.json({ success: true, msg: 'Successful created new business.' });
              });

              var myquery = { username: decoded.username }
              var newvalues = {
                $set: {
                  email: req.body.email,
                  name: req.body.name,
                  phone: req.body.business_phone,
                  country: req.body.country,
                  accountPoint: 'concluido',
                  accountType: req.body.accountType,
                  accountTypeID: cnt
                }
              };
              db.collection("users").findOneAndUpdate(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("USER ALTERADO");
              });
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA REGISTAR IDEIA DE NEGOCIO 
*-------------------------------------------------------------------*/
router.post('/business_idea' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
  var id_gerado = req.headers.authorization;
  console.log(id_gerado);
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;
          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            var cont = db.collection("businesses").count(function(err, cnt) {
              if (err) throw err;

              var newBusiness = new Business({
                businessType: {
                  businessIdeia: [{
                    projectName: req.body.nome_projeto,
                    description: req.body.descricao_projeto,
                    sector_atividade: req.body.setor_atividade,
                    business_model: req.body.modelo_negocio,
                    market_target: req.body.publico_alvo,
                    presentation_url: req.body.url_apresentacao,
                    team_size: req.body.tamanho_equipa,
                    project_team: req.body.project_team,
                    work_plan: req.body.work_plan,
                    business_plan_url: req.body.url_modelo_negocio,
                    matriz_financeira_url: req.body.url_matriz_financeira,
                    concorrencia: req.body.concorrencia,
                    tipo_sociedade: req.body.tipo_sociedade,
                    regiao: req.body.regiao,
                  }],
                },
                businessNumber: cnt,
                logo_url: req.body.logo_url,
                foto_url: req.body.foto_url
              });

              newBusiness.save(function(err) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                console.log("NEGOCIO REGISTADO");
                res.json({ success: true, msg: 'Successful created new business.' });
              });

              var myquery = { username: decoded.username }
              var newvalues = {
                $set: {
                  email: req.body.email,
                  name: req.body.name,
                  phone: req.body.telemovel,
                  country: req.body.country,
                  accountPoint: 'concluido',
                  accountType: req.body.accountType,
                  accountTypeID: cnt
                }
              };
              db.collection("users").findOneAndUpdate(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("USER ALTERADO");
              });
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA VERIFICAR NIF (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/

router.post('/nifvalidation', /*passport.authenticate('jwt', { session: false }), */ function(req, res) {
  var id_gerado = req.headers.authorization;
  var accountType = req.body.accountType;
  var nif = req.body.nif;
  console.log(id_gerado);
  console.log(accountType);
  console.log(nif);
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;
          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            console.log("Validacao do NIF");
            //TIPO DE CLIENTE É INVESTIDOR PRIVADO
            if (accountType === "Investidor Privado") {
              var url = "http://www.nif.pt/?json=1&q=509442013";
              request({
                url: url,
                json: true
              }, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                  var isnif = body.nif_validation;
                  if (isnif === true) {
                    var teste = {
                      username: user.username,
                      nome: user.name,
                      email: user.email,
                      phone: user.phone,
                      country: user.country,
                      nif: nif,
                      accountType: "Investidor Privado"
                    };
                    res.json({ success: true, teste: teste });
                    /* res.render('investor_private_form', { teste: teste }); */
                  }
                  else {
                    console.log("O NIF NAO CORRESPONDE");
                    /* res.render('nifvalidation'); */
                  }
                }
              });
            }
            else {
              //TIPO DE CLIENTE É INVESTIDOR COLETIVO
              if (accountType === "Investidor Coletivo") {
                var distrito = req.body.distrito;
                var url = "http://www.nif.pt/?json=1&q=509442013";
                request({
                  url: url,
                  json: true
                }, function(error, response, body) {
                  if (!error && response.statusCode === 200) {
                    var isnif = body.nif_validation;
                    var loc = body.records["509442013"]["geo"]["region"];
                    if (isnif === true) {
                      if (loc === distrito) {
                        var teste = {
                          username: user.username,
                          nome: user.name,
                          email: user.email,
                          phone: user.phone,
                          country: user.country,
                          nif: nif,
                          accountType: "Investidor Coletivo",
                          nomeEmpresa: body.records["509442013"]["title"],
                          morada: body.records["509442013"]["address"],
                          cp1: body.records["509442013"]["pc4"],
                          cp2: body.records["509442013"]["pc3"],
                          cae: body.records["509442013"]["cae"],
                          location: body.records["509442013"]["geo"]["region"],
                          website: body.records["509442013"]["contacts"]["website"],
                          companyType: body.records["509442013"]["structure"]["nature"],
                          capitalSocial: body.records["509442013"]["structure"]["capital"]
                        };
                        console.log(teste);
                        res.json({ success: true, teste: teste });
                      }
                      else {
                        console.log("O DISTRITO NAO CORRESPONDE");
                        res.json({ success: false, msg: "O DISTRITO NAO CORRESPONDE" });
                      }
                    }
                    else {
                      console.log("O NIF NAO CORRESPONDE");
                      res.json({ success: false, msg: "O NIF NAO CORRESPONDE" });
                    }
                  }
                });
              }
              else {
                //TIPO DE CLIENTE É EMPRESA
                if (accountType === "Empresa") {
                  var distrito = req.body.distrito;
                  var url = "http://www.nif.pt/?json=1&q=509442013";
                  request({
                    url: url,
                    json: true
                  }, function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                      var isnif = body.nif_validation;
                      var loc = body.records["509442013"]["geo"]["region"];
                      if (isnif === true) {
                        if (loc === distrito) {
                          var teste = {
                            username: user.username,
                            nome: user.name,
                            email: user.email,
                            phone: user.phone,
                            country: user.country,
                            nif: nif,
                            accountType: "Empresa",
                            nomeEmpresa: body.records["509442013"]["title"],
                            morada: body.records["509442013"]["address"],
                            cp1: body.records["509442013"]["pc4"],
                            cp2: body.records["509442013"]["pc3"],
                            cae: body.records["509442013"]["cae"],
                            location: body.records["509442013"]["geo"]["region"],
                            website: body.records["509442013"]["contacts"]["website"],
                            companyType: body.records["509442013"]["structure"]["nature"],
                            capitalSocial: body.records["509442013"]["structure"]["capital"]
                          };
                          console.log(teste);
                          res.json({ success: true, teste: teste });
                        }
                        else {
                          console.log("O DISTRITO NAO CORRESPONDE");
                          res.json({ success: false, msg: "O DISTRITO NAO CORRESPONDE" });
                        }
                      }
                      else {
                        console.log("O NIF NAO CORRESPONDE");
                        res.json({ success: false, msg: "O NIF NAO CORRESPONDE" });
                      }
                    }
                  });
                }
                else {
                  //TIPO DE CLIENTE É IDEIA DE NEGOCIO
                  if (accountType === "businessIdeia") {
                    var url = "http://www.nif.pt/?json=1&q=509442013";
                    request({
                      url: url,
                      json: true
                    }, function(error, response, body) {
                      if (!error && response.statusCode === 200) {
                        var isnif = body.nif_validation;
                        if (isnif === true) {
                          var teste = {
                            username: user.username,
                            nome: user.name,
                            email: user.email,
                            phone: user.phone,
                            country: user.country,
                            nif: nif,
                            accountType: "businessIdeia"
                          };
                          console.log(teste);
                          res.json({ success: true, teste: teste });
                        }
                        else {
                          console.log("O NIF NAO CORRESPONDE");
                          res.json({ success: false, msg: "O NIF NAO CORRESPONDE" });
                        }
                      }
                    });
                  }
                  else {
                    console.log("ERRO");
                  }
                }
              }
            }
          }
        });
      }
    });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA ADICIONAR UM CONTACTO 
*-------------------------------------------------------------------*/
router.post('/add_contact', function(req, res) {
  var id_contacto = req.body.id_contacto
  var id_gerado = req.headers.authorization;
  console.log(id_gerado);
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        console.log(chave.token);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            console.log(user);
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          } {
            Contact.findOne({
              id_user: user.accountNumber,
              id_contacto: id_contacto
            }, function(err, contact) {
              if (err) throw err;

              if (contact) {
                console.log(user);
                return res.status(403).send({ success: false, msg: 'Contato ja adicionado.' });
              }
              else {
                var cont = db.collection("contact").count(function(err, cnt) {
                  User.findOne({
                    id_user: id_contacto
                  }, function(err, product) {
                    var newContact = new Contact({
                      id_user: user.accountNumber,
                      id_contacto: id_contacto,
                      estado_contato: "Pendente"
                    })
                    newContact.save(function(err, wishlist) {
                      if (err) {
                        res.json({ sucess: false })
                      }
                      else {
                        res.json({ sucess: true, msg: "Adicionado com sucesso à wishlist" })
                      }
                    });
                  })

                });
              }
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA ACEITAR UM CONTACTO 
*-------------------------------------------------------------------*/
router.post('/aceitar_contact', function(req, res) {
  var id_contacto = req.body.id_contacto
  var id_gerado = req.headers.authorization;
  console.log(id_gerado);
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        console.log(chave.token);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;

          if (!user) {
            console.log(user);
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          } {
            Contact.findOne({
              id_contacto: user.accountNumber,
              estado_contato: "Pendente"
            }, function(err, contact) {
              var newUser = {
                $set: {
                  estado_contato: "Aceitado"
                }
              };
              var myquery = { username: decoded.username };
              db.collection("users").updateOne(myquery, newUser, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  res.json({ success: true, msg: 'Welcome in the member area ' + dbb });
                }
              });
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA ACEITAR UM CONTACTO 
*-------------------------------------------------------------------*/
router.post('/removerContact', function(req, res) {
  var id_contacto = req.body.id_contacto
  console.log(id_contacto)
  var id_gerado = req.headers.authorization;
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;
          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            var cont = db.collection("contacts").count(function(err, cnt) {
              db.collection("contacts").deleteOne({
                id_contacto: id_contacto,
                id_user: user.accountNumber
              }, function(err, user) {
                if (err) throw err;
                if (!user) {
                  return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                }
                else {
                  res.json({ success: true, msg: 'Produto da wishlist apagado com sucesso' });
                }
              });
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA ACEDER AS INFORMACOES RESTRITAS DE UM DETERMINADO PRODUTO 
*-------------------------------------------------------------------*/
router.get('/userContacts/:page', function(req, res) {
  var perPage = 12
  var page = req.params.page || 1
  var arrayContacts = [];
  var arrayContacts_pendente =[];
  var id_gerado = req.headers.authorization;
  if (id_gerado) {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;

          if (!chave) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. Chave not found.' });
          }
          else {
            Contact.find({ id_user: user.accountNumber, estado_contato: "Aceitado" }).count(function(err, cnt) {
              Contact.find({ id_user: user.accountNumber, estado_contato: "Aceitado" }).skip((perPage * page) - perPage).limit(perPage).exec(function(err, contacts) {
                if (err) throw err;
                if (!Contact) {
                  return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                }
                else {
                  if (cnt === 0) {
                    return res.status(403).send({ success: false, msg: 'Sem contactos.', user: user });
                  }
                  else {
                    var addContactsToArray = async.queue(function(task, callback) {
                      User.findOne({
                        accountNumber: contacts[contact].id_contacto
                      }, function(err, contact) {
                        if (err) throw err;
                        if (!User) {
                          return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                        }
                        else {
                          arrayContacts.push(contact);
                          callback();
                        }
                      });
                    });
                    for (var contact in contacts) {
                      addContactsToArray.push(contact, function(err) {});
                    }
                    addContactsToArray.drain = function() {
                      Contact.find({ id_user: user.accountNumber, estado_contato: "Pendente" }).count(function(err, cnt_pendente) {
                        Contact.find({ id_user: user.accountNumber, estado_contato: "Pendente" }).skip((perPage * page) - perPage).limit(perPage).exec(function(err, contacts_pendente) {
                          if (err) throw err;
                          if (!Contact) {
                            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                          }
                          else {
                            if (cnt_pendente === 0) {
                              return res.status(403).send({ success: false, msg: 'Sem contactos.', user: user });
                            }
                            else {
                              var addContactsToArray = async.queue(function(task, callback) {
                                User.findOne({
                                  accountNumber: contacts_pendente[contact].id_contacto
                                }, function(err, contact) {
                                  if (err) throw err;
                                  if (!User) {
                                    return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                                  }
                                  else {
                                    arrayContacts_pendente.push(contact);
                                    callback();
                                  }
                                });
                              });
                              for (var contact in contacts_pendente) {
                                addContactsToArray.push(contact, function(err) {});
                              }
                              addContactsToArray.drain = function() {
                                console.log(arrayContacts_pendente );
                                res.json({
                                  success: true,
                                  current: page,
                                  contacts: contacts,
                                  contacts_pendente: contacts_pendente,
                                  user: user,
                                  numero_contacts: cnt,
                                  numero_contacts_pendente: cnt_pendente,
                                  pages: Math.ceil(cnt / perPage),
                                  arrayContacts: arrayContacts,
                                  arrayContacts_pendente: arrayContacts_pendente,
                                  msg: 'sucess'
                                });
                              };
                            }
                          }
                        });
                      });
                    };
                  }
                }
              });
            });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }

});

/*---------------------------------------------------------------------
ROUTE PARA ACEDER AS INFORMACOES RESTRITAS DE UM INVESTIDOR (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/
router.get('/investorInfo', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      Investor.findOne({
        investorNumber: "5"
      }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
        }
        else {
          res.json({ success: true, msg: 'Welcome in the member area ' + user });
        }
      });
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA ACEDER AS INFORMACOES RESTRITAS DE UMA EMPRESA (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/
router.get('/businessInfo', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      Business.findOne({
        businessNumber: "17"
      }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
        }
        else {
          res.json({ success: true, msg: 'Welcome in the member area ' + user });
        }
      });
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
ROUTE PARA ACEDER AS INFORMACOES RESTRITAS DE UMA EMPRESA (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/
router.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    User.find({}, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
      }
      else {
        res.json({ success: true, msg: 'Welcome in the member area ' + user });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/*---------------------------------------------------------------------
FUNCAO PARA IR BUSCAR TOKEN
*-------------------------------------------------------------------*/
getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
    else {
      return null;
    }
  }
  else {
    return null;
  }
};



module.exports = router;
