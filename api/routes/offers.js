var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database'); // get db config file
var Offer = require('../models/offer'); // get the mongoose model
var User = require('../models/user'); // get the mongoose model
var Chave = require('../models/chave'); // get the mongoose model
var Business = require('../models/business'); // get the mongoose model
var port = process.env.PORT || 8080;
var jwt = require('jwt-simple');
var dateTime = require('node-datetime');
var ip = require("ip");
// connect to database

var db = mongoose.connection;

// pass passport for configuration
require('../config/passport')(passport);

// bundle our routes
var router = express.Router();

/*---------------------------------------------------------------------
ROUTE PARA REGISTAR OFERTAS
*-------------------------------------------------------------------*/
router.post('/newOffer' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
  console.log("NEW OFFER")
  var id_gerado = req.headers.authorization;
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  var offeringStyleName = req.body.offeringStyleName;
  console.log(offeringStyleName)
  console.log(req.body.offerClass)
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
            return res.status(403).send({ success: false, msg: 'Authentication failed. Userssssss not found.' });
          }
          else {
            var accountType = user.accountType;
            var accountTypeID = user.accountTypeID;
            var cont = db.collection("offers").count(function(err, cnt) {
              if (err) throw err;
              var tipo_negocio = req.body.offerClass;
              switch (offeringStyleName) {
                //
                // Investidor Coletivo
                //
                case 'Investidor Coletivo':
                  console.log('Investidor Coletivo')
                  switch (tipo_negocio) {
                    case "Fusão":
                      console.log("Fusao");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          fusao: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            modalityFuson: req.body.modalityFuson,
                            interventionType: req.body.interventionType,
                            transactionObject: req.body.transactionObject,
                            motiv_fusao: req.body.motiv_fusao,
                            objetivos_fusao: req.body.objetivos_fusao,
                            projectFiscal: req.body.projectFiscal,
                            projectFusao: req.body.projectFusao,
                            protectionModal_fusao: req.body.protectionModal_fusao,
                            specialPartnerOptions: req.body.specialPartnerOptions
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      console.log(newOffer);
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Consórcio":
                      console.log("Consórcio");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          consorcio: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            objeto: req.body.objeto,
                            modalityCons: req.body.modalityCons,
                            consulOrientFiscal: req.body.consulOrientFiscal,
                            duration: req.body.duration,
                            activityType: req.body.activityType,
                            activityPlace: req.body.activityPlace,
                            contributionWanted: req.body.contributionWanted,
                            participationWinLoss: req.body.participationWinLoss
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Aumento de Capital":
                      console.log("Aumento de Capital");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          aumento_capital: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            modalityCapitalRaise: req.body.modalityCapitalRaise,
                            capitalRaiseValue: req.body.capitalRaiseValue,
                            nominalValue_capRaise: req.body.nominalValue_capRaise,
                            newEntrance_capRaise: req.body.newEntrance_capRaise,
                            payMode_capRaise: req.body.payMode_capRaise,
                            emissionPrize_capRaise: req.body.emissionPrize_capRaise,
                            emissionPrizeValue_capRaise: req.body.emissionPrizeValue_capRaise,
                            newEntranceDate_capRaise: req.body.newEntranceDate_capRaise
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Financiamento":
                      console.log("Financiamento");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          financiamento: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            investmentType: req.body.investmentType,
                            creditValue: req.body.creditValue,
                            creditModal: req.body.creditModal,
                            returnCreditDate: req.body.returnCreditDate,
                            interestRate: req.body.interestRate,
                            interestPeriodicity: req.body.interestPeriodicity,
                            garantias: req.body.garantias
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Quotas":
                      console.log("Quotas");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          quotas: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            percent: req.body.percent,
                            transactionCoin: req.body.transactionCoin,
                            aquisitionForm: req.body.aquisitionForm,
                            payMode: req.body.payMode,
                            contitularidade: req.body.contitularidade,
                            consentSoc: req.body.consentSoc,
                            rebuyOption: req.body.rebuyOption,
                            rebuyLimit: req.body.rebuyPercent,
                            rebuyPercent: req.body.rebuyLimit
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Trespasse":
                      console.log("Trespasse");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          trespasse: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            transmissionMode: req.body.transmissionMode,
                            local: req.body.local,
                            senhorioAuth: req.body.senhorioAuth,
                            payMode: req.body.payMode,
                            payType: req.body.payType,
                            clausulaNaoConcorrencia: req.body.clausulaNaoConcorrencia
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Ações":
                      console.log("Ações");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          acoes: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            totalAcoes: req.body.totalAcoes,
                            unityValue: req.body.unityValue,
                            tradeUnits: req.body.tradeUnits,
                            aquisitionForm: req.body.aquisitionForm,
                            condTransmition: req.body.condTransmition,
                            payMode_acoes: req.body.payMode_acoes,
                            tipodeAcoao: req.body.tipodeAcoao,
                            circulacaoMode: req.body.circulacaoMode
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Cessão de Exploração":
                      console.log("Cessão de Exploração");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          cessao_exploracao: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            durationPayment: req.body.durationPayment,
                            duratinContract: req.body.durationContract,
                            renovationMode: req.body.renovationMode,
                            inventoryInclude: req.body.inventoryInclude,
                            withWorkers: req.body.withWorkers
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "ideia_negocio":
                      console.log("ideia_negocio");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          ideia_negocio: [{
                            descricao: req.body.descricao,
                            stateProgressType: req.body.stateProgressType,
                            tradeMark: req.body.tradeMark,
                            registedPatent: req.body.registedPatent,
                            users: req.body.users,
                            clients: req.body.clients,
                            vendas: req.body.vendas,
                            investmentType: req.body.investmentType,
                            investmentMode: req.body.investmentMode,
                            investmentValue: req.body.investmentValue
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          colectivo: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                            }],
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                  }
                  break;
                  //
                  // Empresa
                  //
                case 'Empresa':

                  //Passico curtou ou longo prazo
                  var credito_bancario_curto_prazo = 0;
                  var credito_bancario_longo_prazo = 0;
                  var suprimentos_curto_prazo = 0;
                  var suprimentos_longo_prazo = 0;
                  var fornecedores_curto_prazo = 0;
                  var fornecedores_longo_prazo = 0;
                  var trabalhadores_curto_prazo = 0;
                  var trabalhadores_longo_prazo = 0;
                  var administracao_curto_prazo = 0;
                  var administracao_longo_prazo = 0;
                  var impostos_curto_prazo = 0;
                  var impostos_longo_prazo = 0;
                  var outros_passivos_curto_prazo = 0;
                  var outros_passivos_longo_prazo = 0;

                  if (req.body.credito_bancario_duracao == "curto_prazo") {
                    credito_bancario_curto_prazo = req.body.credito_bancario;
                    credito_bancario_longo_prazo = 0;
                  }
                  else {
                    credito_bancario_curto_prazo = 0;
                    credito_bancario_longo_prazo = req.body.credito_bancario;
                  }
                  if (req.body.suprimentos_duracao == "curto_prazo") {
                    suprimentos_curto_prazo = req.body.suprimentos;
                    suprimentos_longo_prazo = 0;
                  }
                  else {
                    suprimentos_curto_prazo = 0;
                    suprimentos_longo_prazo = req.body.suprimentos;
                  }

                  if (req.body.fornecedores_duracao == "curto_prazo") {
                    fornecedores_curto_prazo = req.body.fornecedores;
                    fornecedores_longo_prazo = 0;
                  }
                  else {
                    fornecedores_curto_prazo = 0;
                    fornecedores_longo_prazo = req.body.fornecedores;
                  }
                  if (req.body.trabalhadores_duracao == "curto_prazo") {
                    trabalhadores_curto_prazo = req.body.trabalhadores;
                    trabalhadores_longo_prazo = 0;
                  }
                  else {
                    trabalhadores_curto_prazo = 0;
                    trabalhadores_longo_prazo = req.body.trabalhadores;;
                  }
                  if (req.body.administracao_duracao == "curto_prazo") {
                    administracao_curto_prazo = req.body.administracao;
                    administracao_longo_prazo = 0;
                  }
                  else {
                    administracao_curto_prazo = 0;
                    administracao_longo_prazo = req.body.administracao;;
                  }
                  if (req.body.impostos_duracao == "curto_prazo") {
                    impostos_curto_prazo = req.body.impostos;
                    impostos_longo_prazo = 0;
                  }
                  else {
                    impostos_curto_prazo = 0;
                    impostos_longo_prazo = req.body.impostos;
                  }
                  if (req.body.outros_passivos_duracao == "curto_prazo") {
                    outros_passivos_curto_prazo = req.body.outros_passivos;
                    outros_passivos_longo_prazo = 0;
                  }
                  else {
                    outros_passivos_curto_prazo = 0;
                    outros_passivos_longo_prazo = req.body.outros_passivos;
                  }
                  console.log('Empresa')
                  switch (tipo_negocio) {
                    case "Fusão":
                      console.log("Fusao");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          fusao: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            modalityFuson: req.body.modalityFuson,
                            interventionType: req.body.interventionType,
                            transactionObject: req.body.transactionObject,
                            motiv_fusao: req.body.motiv_fusao,
                            objetivos_fusao: req.body.objetivos_fusao,
                            projectFiscal: req.body.projectFiscal,
                            projectFusao: req.body.projectFusao,
                            protectionModal_fusao: req.body.protectionModal_fusao,
                            specialPartnerOptions: req.body.specialPartnerOptions
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedoresreq.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      console.log(newOffer);
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Consórcio":
                      console.log("Consórcio");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          consorcio: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            objeto: req.body.objeto,
                            modalityCons: req.body.modalityCons,
                            consulOrientFiscal: req.body.consulOrientFiscal,
                            duration: req.body.duration,
                            activityType: req.body.activityType,
                            activityPlace: req.body.activityPlace,
                            contributionWanted: req.body.contributionWanted,
                            participationWinLoss: req.body.participationWinLoss
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedoresreq.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Aumento de Capital":
                      console.log("Aumento de Capital");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          aumento_capital: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            modalityCapitalRaise: req.body.modalityCapitalRaise,
                            capitalRaiseValue: req.body.capitalRaiseValue,
                            nominalValue_capRaise: req.body.nominalValue_capRaise,
                            newEntrance_capRaise: req.body.newEntrance_capRaise,
                            payMode_capRaise: req.body.payMode_capRaise,
                            emissionPrize_capRaise: req.body.emissionPrize_capRaise,
                            emissionPrizeValue_capRaise: req.body.emissionPrizeValue_capRaise,
                            newEntranceDate_capRaise: req.body.newEntranceDate_capRaise
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedoresreq.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Financiamento":
                      console.log("Financiamento");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          financiamento: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            investmentType: req.body.investmentType,
                            creditValue: req.body.creditValue,
                            creditModal: req.body.creditModal,
                            returnCreditDate: req.body.returnCreditDate,
                            interestRate: req.body.interestRate,
                            interestPeriodicity: req.body.interestPeriodicity,
                            garantias: req.body.garantias
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedores + req.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Quotas":
                      console.log("Quotas");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          quotas: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            percent: req.body.percent,
                            transactionCoin: req.body.transactionCoin,
                            aquisitionForm: req.body.aquisitionForm,
                            payMode: req.body.payMode,
                            contitularidade: req.body.contitularidade,
                            consentSoc: req.body.consentSoc,
                            rebuyOption: req.body.rebuyOption,
                            rebuyLimit: req.body.rebuyPercent,
                            rebuyPercent: req.body.rebuyLimit
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedoresreq.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Trespasse":
                      console.log("Trespasse");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          trespasse: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            transmissionMode: req.body.transmissionMode,
                            local: req.body.local,
                            senhorioAuth: req.body.senhorioAuth,
                            payMode: req.body.payMode,
                            payType: req.body.payType,
                            clausulaNaoConcorrencia: req.body.clausulaNaoConcorrencia
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedoresreq.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Ações":
                      console.log("Ações");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          acoes: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            totalAcoes: req.body.totalAcoes,
                            unityValue: req.body.unityValue,
                            tradeUnits: req.body.tradeUnits,
                            aquisitionForm: req.body.aquisitionForm,
                            condTransmition: req.body.condTransmition,
                            payMode_acoes: req.body.payMode_acoes,
                            tipodeAcoao: req.body.tipodeAcoao,
                            circulacaoMode: req.body.circulacaoMode
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedoresreq.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Cessão de Exploração":
                      console.log("Cessão de Exploração");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          cessao_exploracao: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            durationPayment: req.body.durationPayment,
                            duratinContract: req.body.durationContract,
                            renovationMode: req.body.renovationMode,
                            inventoryInclude: req.body.inventoryInclude,
                            withWorkers: req.body.withWorkers
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedoresreq.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "ideia_negocio":
                      console.log("ideia_negocio");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          ideia_negocio: [{
                            descricao: req.body.descricao,
                            stateProgressType: req.body.stateProgressType,
                            tradeMark: req.body.tradeMark,
                            registedPatent: req.body.registedPatent,
                            users: req.body.users,
                            clients: req.body.clients,
                            vendas: req.body.vendas,
                            investmentType: req.body.investmentType,
                            investmentMode: req.body.investmentMode,
                            investmentValue: req.body.investmentValue
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          company: [{
                            companyName: req.body.nome_empresa,
                            constitutionDate: req.body.date,
                            socialCapital: req.body.capital_social,
                            nifNumber: req.body.nif,
                            companyContacts: [{
                              street: req.body.morada,
                              postalCode: req.body.codigo_postal,
                              country: req.body.country,
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
                              state: req.body.state,
                              processos: req.body.processos,
                              courtAction: req.body.courtAction,
                              tributarySituation: req.body.tributarySituation
                            }],
                            comercial: [{
                              compras: req.body.compras,
                              gasto_servicos: req.body.gasto_servicos,
                              trabalhadores: req.body.gastos_trabalhadores,
                              outras_despesas: req.body.outras_despesas,
                              total_despesas: req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas,
                              vendas: req.body.vendas,
                              prestacao_servicos: req.body.prestacao_servicos,
                              juros: req.body.juros,
                              outros_rendimentos: req.body.outros_rendimentos,
                              total_rendimentos: req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos,
                              resultado: (req.body.vendas + req.body.prestacao_servicos + req.body.juros + req.body.outros_rendimentos) - (req.body.compras + req.body.gastos_trabalhadores + req.body.outras_despesas)
                            }],
                            contabilidade: [{
                              inventario: req.body.inventario,
                              adiantamento_fornecedores: req.body.adiantamento_fornecedores,
                              outras_contas_receber: req.body.outras_contas_receber,
                              caixa: req.body.caixa,
                              depositos_bancarios: req.body.depositos_bancarios,
                              total_ativos: req.body.inventario + req.body.caixa + req.body.depositos_bancarios + req.body.adiantamento_fornecedoresreq.body.outras_contas_receber,
                              capital_realizado: req.body.capital_realizado,
                              reservas_legais: req.body.reservas_legais,
                              outras_reservas: req.body.outras_reservas,
                              resultados_transitados: req.body.resultados_transitados,
                              total_capital_proprio: req.body.capital_realizado + req.body.reservas_legais + req.body.resultados_transitados + req.body.outras_reservas,

                              passivo_curto_prazo: [{
                                credito_bancario_curto_prazo: credito_bancario_curto_prazo,
                                suprimentos_curto_prazo: suprimentos_curto_prazo,
                                fornecedores_curto_prazo: fornecedores_curto_prazo,
                                trabalhadores_curto_prazo: trabalhadores_curto_prazo,
                                administracao_curto_prazo: administracao_curto_prazo,
                                impostos_curto_prazo: impostos_curto_prazo,
                                outros_passivos_curto_prazo: outros_passivos_curto_prazo,
                              }],
                              passivo_longo_prazo: [{
                                credito_bancario_longo_prazo: credito_bancario_longo_prazo,
                                suprimentos_longo_prazo: suprimentos_longo_prazo,
                                fornecedores_longo_prazo: fornecedores_longo_prazo,
                                trabalhadores_longo_prazo: trabalhadores_longo_prazo,
                                administracao_longo_prazo: administracao_longo_prazo,
                                impostos_longo_prazo: impostos_longo_prazo,
                                outros_passivos_longo_prazo: outros_passivos_longo_prazo,
                              }],
                              subtotal_medio_longo_prazo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo,
                              subtotal_curto_prazo: credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo,
                              total_passivo: credito_bancario_longo_prazo + suprimentos_longo_prazo + fornecedores_longo_prazo + trabalhadores_longo_prazo + administracao_longo_prazo + impostos_longo_prazo + outros_passivos_longo_prazo + credito_bancario_curto_prazo + suprimentos_curto_prazo + fornecedores_curto_prazo + trabalhadores_curto_prazo + administracao_curto_prazo + impostos_curto_prazo + outros_passivos_curto_prazo
                            }]
                          }],
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                  }
                  break;
                  //
                  // Ideia de negocio
                  //
                case 'Ideia':
                  console.log('Business Ideia')
                  var newOffer = new Offer({
                    businessIdeia: [{
                      projectName: req.body.projectName,
                      description: req.body.description,
                      sector_atividade: req.body.sector_atividade,
                      business_model: req.body.business_model,
                      market_target: req.body.market_target,
                      presentation_url: req.body.presentation_url,
                      team_size: req.body.team_size,
                      project_team: req.body.project_team,
                      work_plan: req.body.work_plan,
                      business_plan_url: req.body.business_plan_url,
                      matriz_financeira_url: req.body.matriz_financeira_url,
                      concorrencia: req.body.concorrencia,
                      tipo_sociedade: req.body.tipo_sociedade,
                      regiao: req.body.regiao
                    }],
                    colectivo: [{
                      companyName: req.body.companyName,
                      constitutionDate: req.body.constitutionDate,
                      socialCapital: req.body.socialCapital,
                      nifNumber: req.body.nifNumber,
                      companyContacts: [{
                        street: req.body.street,
                        postalCode: req.body.postalCode,
                        sede: req.body.sede,
                        distrito: req.body.distrito,
                        socialUrl: req.body.socialUrl,
                        website: req.body.website,
                        banner: req.body.banner,
                        avatar: req.body.avatar
                      }],
                      tipo_sociedade: req.body.tipo_sociedade,
                      sector_atividade: req.body.sector_atividade,
                      regiao: req.body.regiao,
                      privateProfile: [{
                        CAE: req.body.CAE,
                        juridicDefinition: req.body.juridicDefinition,
                        activityType: req.body.activityType,
                        state: req.body.state,
                        processos: req.body.processos,
                        courtAction: req.body.courtAction,
                        tributarySituation: req.body.tributarySituation
                      }],
                    }],
                    privado: [{
                      fullName: req.body.fullName,
                      nifNumber: req.body.nifNumber,
                      country: req.body.country,
                      adress: req.body.adress,
                      codio_postal: req.body.codio_postal,
                      distrito: req.body.distrito,
                      estadoCivil: req.body.estadoCivil,
                      phone: req.body.phone,
                      email: req.body.email,
                      displayName: req.body.displayName0
                    }]
                  });
                  console.log(newOffer);
                  newOffer.save(function(err) {
                    if (err) {
                      return res.json({ success: false, msg: 'Business already exists.' });
                    }
                    console.log("NEGOCIO REGISTADO");
                    res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                  });
                  break;
                  //
                  // Privado
                  //
                case 'Privado':
                  console.log('Privado')
                  switch (tipo_negocio) {
                    case "Fusão":
                      console.log("Fusao");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          fusao: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            modalityFuson: req.body.modalityFuson,
                            interventionType: req.body.interventionType,
                            transactionObject: req.body.transactionObject,
                            motiv_fusao: req.body.motiv_fusao,
                            objetivos_fusao: req.body.objetivos_fusao,
                            projectFiscal: req.body.projectFiscal,
                            projectFusao: req.body.projectFusao,
                            protectionModal_fusao: req.body.protectionModal_fusao,
                            specialPartnerOptions: req.body.specialPartnerOptions
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      console.log(newOffer);
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Consórcio":
                      console.log("Consórcio");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          consorcio: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            objeto: req.body.objeto,
                            modalityCons: req.body.modalityCons,
                            consulOrientFiscal: req.body.consulOrientFiscal,
                            duration: req.body.duration,
                            activityType: req.body.activityType,
                            activityPlace: req.body.activityPlace,
                            contributionWanted: req.body.contributionWanted,
                            participationWinLoss: req.body.participationWinLoss
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Aumento de Capital":
                      console.log("Aumento de Capital");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          aumento_capital: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            modalityCapitalRaise: req.body.modalityCapitalRaise,
                            capitalRaiseValue: req.body.capitalRaiseValue,
                            nominalValue_capRaise: req.body.nominalValue_capRaise,
                            newEntrance_capRaise: req.body.newEntrance_capRaise,
                            payMode_capRaise: req.body.payMode_capRaise,
                            emissionPrize_capRaise: req.body.emissionPrize_capRaise,
                            emissionPrizeValue_capRaise: req.body.emissionPrizeValue_capRaise,
                            newEntranceDate_capRaise: req.body.newEntranceDate_capRaise
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Financiamento":
                      console.log("Financiamento");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          financiamento: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            investmentType: req.body.investmentType,
                            creditValue: req.body.creditValue,
                            creditModal: req.body.creditModal,
                            returnCreditDate: req.body.returnCreditDate,
                            interestRate: req.body.interestRate,
                            interestPeriodicity: req.body.interestPeriodicity,
                            garantias: req.body.garantias
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Quotas":
                      console.log("Quotas");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          quotas: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            percent: req.body.percent,
                            transactionCoin: req.body.transactionCoin,
                            aquisitionForm: req.body.aquisitionForm,
                            payMode: req.body.payMode,
                            contitularidade: req.body.contitularidade,
                            consentSoc: req.body.consentSoc,
                            rebuyOption: req.body.rebuyOption,
                            rebuyLimit: req.body.rebuyPercent,
                            rebuyPercent: req.body.rebuyLimit
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Trespasse":
                      console.log("Trespasse");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          trespasse: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            transmissionMode: req.body.transmissionMode,
                            local: req.body.local,
                            senhorioAuth: req.body.senhorioAuth,
                            payMode: req.body.payMode,
                            payType: req.body.payType,
                            clausulaNaoConcorrencia: req.body.clausulaNaoConcorrencia
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Ações":
                      console.log("Ações");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          acoes: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            totalAcoes: req.body.totalAcoes,
                            unityValue: req.body.unityValue,
                            tradeUnits: req.body.tradeUnits,
                            aquisitionForm: req.body.aquisitionForm,
                            condTransmition: req.body.condTransmition,
                            payMode_acoes: req.body.payMode_acoes,
                            tipodeAcoao: req.body.tipodeAcoao,
                            circulacaoMode: req.body.circulacaoMode
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "Cessão de Exploração":
                      console.log("Cessão de Exploração");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          cessao_exploracao: [{
                            descricao: req.body.descricao,
                            marketValue: req.body.marketValue,
                            durationPayment: req.body.durationPayment,
                            duratinContract: req.body.durationContract,
                            renovationMode: req.body.renovationMode,
                            inventoryInclude: req.body.inventoryInclude,
                            withWorkers: req.body.withWorkers
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                    case "ideia_negocio":
                      console.log("ideia_negocio");
                      var newOffer = new Offer({
                        offerType: req.body.offerType,
                        offerClass: {
                          ideia_negocio: [{
                            descricao: req.body.descricao,
                            stateProgressType: req.body.stateProgressType,
                            tradeMark: req.body.tradeMark,
                            registedPatent: req.body.registedPatent,
                            users: req.body.users,
                            clients: req.body.clients,
                            vendas: req.body.vendas,
                            investmentType: req.body.investmentType,
                            investmentMode: req.body.investmentMode,
                            investmentValue: req.body.investmentValue
                          }]
                        },
                        offerDescription: req.body.descricao,
                        offerClassName: req.body.offerClass,
                        offeringStyleName: req.body.offeringStyleName,
                        offeringStyle: {
                          privado: [{
                            fullName: req.body.fullName,
                            nifNumber: req.body.nifNumber,
                            country: req.body.country,
                            adress: req.body.adress,
                            codio_postal: req.body.codio_postal,
                            distrito: req.body.distrito,
                            estadoCivil: req.body.estadoCivil,
                            phone: req.body.phone,
                            email: req.body.email,
                            displayName: req.body.displayName
                          }]
                        },
                        offerRegion: req.body.offerRegion,
                        tipoSociedade: req.body.tipo_sociedade_oferta,
                        setorAtividade: req.body.setor_atividade_oferta,
                        offerCreatedOn: formatted,
                        offerValue: req.body.marketValue,
                        details: [{
                          logoURL: req.body.logoURL,
                          mainPicURL: req.body.foto_url
                        }],
                        offer_number: cnt,
                      });
                      newOffer.save(function(err) {
                        if (err) {
                          return res.json({ success: false, msg: 'Business already exists.' });
                        }
                        console.log("NEGOCIO REGISTADO");
                        res.json({ success: true, msg: 'Successful created new business.', newOffer: newOffer });
                      });
                      break;
                  }
                  break;


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


router.post('/testeoffer', function(req, res) {
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
            var accountType = user.accountType;
            var accountTypeID = user.accountTypeID;
            Business.findOne({
              businessNumber: accountTypeID
            }, function(err, business) {
              if (err) throw err;
              if (!business) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
              }
              else {
                console.log(business);
                var businessUser = business.businessType[accountType];
                var logoURL = business.logo_url;
                var fotoURL = business.foto_url;
                var regiao = businessUser[0].regiao;
                var tipoSociedade = businessUser[0].tipo_sociedade;
                var setorAtividade = businessUser[0].sector_atividade;
                res.json({ success: true });
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
ROUTE PARA ACEDER A TODAS AS OFERTAS (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/
router.get('/offers' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
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
        Offer.find({}, function(err, offers) {
          if (err) throw err;

          if (!offers) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. offer not found.' });
          }
          else {
            res.json({ success: true, offers: offers });
          }
        });
      }
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

/****************************************
 * Aceder á lista de ofertas
 *  versão sem controle de id_gerado
 *  versão alterada 16-10-2019 *
 */
router.get('/offers', function(req, res) {
  console.log("pedir lista de ofertas");
  Offer.find({}, function(err, offers) {
    if (err) throw err;
    else {
      res.json({ success: true, offers: offers });
    }
  });
});



/*---------------------------------------------------------------------
ROUTE PARA ACEDER AS INFORMACOES RESTRITAS DE UMA OFERTA (GET http://localhost:8080/api/memberinfo)
*-------------------------------------------------------------------*/
router.get('/offer' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
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
        Offer.find({
          offer_number: req.headers.id_oferta
        }, function(err, offer) {
          console.log(offer);
          if (err) throw err;

          if (!offer) {
            return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
          }
          else {
            res.json({ success: true, msg: 'Welcome in the member area ' + offer });
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
ROUTE PARA EDITAR UMA OFERTA
*-------------------------------------------------------------------*/
router.post('/editOffer' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
      }
      else {
        var cont = db.collection("investors").count(function(err, cnt) {
          if (err) throw err;

          var tipo_listagem = req.body.tipo_submit;
          var tipo_negocio = req.body.tipo_negocio;
          switch (req.body.tipo_negocio) {
            case "fusao":
              console.log("fusao");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    fusao: [{
                      descricao: req.body.fusao_descricao,
                      marketValue: req.body.fusao_valor_mercado,
                      modalityFuson: req.body.fusao_modalidade,
                      interventionType: req.body.fusao_modo_intervencao,
                      transactionObject: req.body.fusao_objeto,
                      motiv_fusao: req.body.fusao_motivos,
                      objetivos_fusao: req.body.fusao_objetivos,
                      projectFiscal: req.body.fusao_fiscalizacao,
                      projectFusao: req.body.fusao_projeto,
                      protectionModal_fusao: req.body.fusao_protecao_credores,
                      specialPartnerOptions: req.body.fusao_direitos
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '1',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              console.log(newOffer);
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
            case "consorcio":
              console.log("consorcio");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    consorcio: [{
                      descricao: req.body.consorcio_descricao,
                      marketValue: req.body.consorcio_valor_mercado,
                      objeto: req.body.consorcio_objeto,
                      modalityCons: req.body.consorcio_modalidade,
                      consulOrientFiscal: req.body.consorcio_conselho,
                      duration: req.body.consorcio_duracao,
                      activityType: req.body.consorcio_natureza,
                      activityPlace: req.body.consorcio_local,
                      contributionWanted: req.body.consorcio_contribuicao,
                      participationWinLoss: req.body.consorcio_participacao
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '0',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
            case "aumento_capital":
              console.log("aumento_capital");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    aumento_capital: [{
                      descricao: req.body.aumento_capital_descricao,
                      marketValue: req.body.aumento_capital_valor_mercado,
                      modalityCapitalRaise: req.body.aumento_capital_modalidade,
                      capitalRaiseValue: req.body.aumento_capital_montante,
                      nominalValue_capRaise: req.body.aumento_capital_montante_nominal,
                      newEntrance_capRaise: req.body.aumento_capital_natureza,
                      payMode_capRaise: req.body.aumento_capital_modalidade,
                      emissionPrize_capRaise: req.body.aumento_capital_premio,
                      emissionPrizeValue_capRaise: req.body.aumento_capital_valor_premio,
                      newEntranceDate_capRaise: req.body.aumento_capital_prazo
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '0',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
            case "financiamento":
              console.log("financiamento");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    financiamento: [{
                      descricao: req.body.financiamento_descricao,
                      marketValue: req.body.financiamento_valor_mercado,
                      investmentType: req.body.financiamento_tipo,
                      creditValue: req.body.financiamento_valor,
                      creditModal: req.body.financiamento_modalidade,
                      returnCreditDate: req.body.financiamento_prazo,
                      interestRate: req.body.financiamento_taxa_juros,
                      interestPeriodicity: req.body.financiamento_periocidade_juros,
                      garantias: req.body.financiamento_garantias
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '0',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
            case "quotas":
              console.log("quotas");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    quotas: [{
                      descricao: req.body.quotas_descricao,
                      marketValue: req.body.quotas_valor,
                      percent: req.body.quotas_percentagem,
                      transactionCoin: req.body.quotas_moeda,
                      aquisitionForm: req.body.quotas_forma_aquisicao,
                      payMode: req.body.quotas_modalidade_pagamento,
                      contitularidade: req.body.quotas_contitularidade,
                      consentSoc: req.body.quotas_consentimento,
                      rebuyOption: req.body.quotas_opcao_recompra,
                      rebuyLimit: req.body.quotas_limite_recompra,
                      rebuyPercent: req.body.quotas_percentagem_recompra
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '0',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
            case "trespasse":
              console.log("trespasse");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    trespasse: [{
                      descricao: req.body.trespasse_descricao,
                      marketValue: req.body.trespasse_valor_mercado,
                      transmissionMode: req.body.trespasse_modalidade,
                      local: req.body.trespasse_local,
                      senhorioAuth: req.body.trespasse_senhorio,
                      payMode: req.body.trespasse_modalidade_pagamento,
                      payType: req.body.trespasse_forma_pagamento,
                      clausulaNaoConcorrencia: req.body.trespasse_clausula
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '0',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
            case "acoes":
              console.log("acoes");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    acoes: [{
                      descricao: req.body.acoes_descricao,
                      marketValue: req.body.acoes_valor,
                      totalAcoes: req.body.acoes_totalidade,
                      unityValue: req.body.acoes_valor_unidade,
                      tradeUnits: req.body.acoes_unidades,
                      aquisitionForm: req.body.acoes_forma_aquisicao,
                      condTransmition: req.body.acoes_transmissao_condicionada,
                      payMode_acoes: req.body.acoes_modalidade_pagamento,
                      tipodeAcoao: req.body.acoes_tipo_acao,
                      circulacaoMode: req.body.acoes_forma_circulacao
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '0',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
            case "cessao_exploracao":
              console.log("cessao_exploracao");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    cessao_exploracao: [{
                      descricao: req.body.cessao_descricao,
                      marketValue: req.body.cessao_valor_mercado,
                      durationPayment: req.body.cessao_periodicidade,
                      duratinContract: req.body.cessao_duracao,
                      renovationMode: req.body.cessao_renovacao,
                      inventoryInclude: req.body.cessao_inventario,
                      withWorkers: req.body.cessao_trabalhadores
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '0',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
            case "ideia_negocio":
              console.log("ideia_negocio");
              var newOffer = {
                $set: {
                  offerType: req.body.tipo_submit,
                  offerClass: {
                    ideia_negocio: [{
                      descricao: req.body.ideia_negocio_descricao,
                      stateProgressType: req.body.ideia_negocio_estado,
                      tradeMark: req.body.ideia_negocio_marca_registada,
                      registedPatent: req.body.ideia_negocio_patente,
                      users: req.body.ideia_negocio_utilizadores,
                      clients: req.body.ideia_negocio_clientes,
                      vendas: req.body.ideia_negocio_vendas,
                      investmentType: req.body.ideia_negocio_tipo,
                      investmentMode: req.body.ideia_negocio_forma,
                      investmentValue: req.body.ideia_negocio_valor_investimento
                    }]
                  },
                  offerRegion: req.body.offer_regiao,
                  tipoSociedade: req.body.tipo_atividade,
                  setorAtividade: req.body.setor_atividade,
                  offerValue: '0',
                  details: [{
                    logoURL: req.body.offer_logo_url,
                    mainPicURL: req.body.offer_foto_url
                  }],
                  offer_number: '0',
                }
              };
              var myquery = { offerType: "oferta" };
              db.collection("offers").updateOne(myquery, newOffer, function(err, dbb) {
                if (err) {
                  return res.json({ success: false, msg: 'Business already exists.' });
                }
                else {
                  console.log(myquery);
                  console.log(newOffer);
                  res.json({ success: true, msg: 'Successful created new business.' });
                }
              });
              break;
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
ROUTE PARA ACEDER APAGAR UMA OFERTA (GET http://localhost:8080/api/memberinfo)


----ALTERAR----- NAO ACABADO

*-------------------------------------------------------------------*/
router.get('/offerDelete' /* , passport.authenticate('jwt', { session: false }) */ , function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    db.collection("offers").deleteOne({
      offerType: req.headers.oferta
    }, function(err, user) {
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
ROUTE PARA ACEDER AS INFORMACOES DE TODOS OS PRODUTOS
*-------------------------------------------------------------------*/
router.get('/searchOffer', function(req, res) {
  var id_gerado = req.headers.authorization;
  var perPage = 12
  var page = req.params.page || 1
  var offerClassName = req.query.offerClassName
  var tipoSociedade = req.query.tipoSociedade
  var setorAtividade = req.query.setorAtividade
  var offerRegion = req.query.offerRegion
  var offerValue = req.query.offerValue;
  console.log(req.query.offerClassName)
  if (offerClassName === undefined || offerClassName === "" || offerClassName === "undefined") {
    offerClassName = { $regex: /.*/ };
  }
  else if (offerClassName === "fusao") {
    offerClassName = "Fusão";
  }
  else if (offerClassName === "consorcio") {
    offerClassName = "Consórcio";
  }
  else if (offerClassName === "trespasse") {
    offerClassName = "Trespasse";
  }
  else if (offerClassName === "quotas") {
    offerClassName = "Quotas";
  }
  else if (offerClassName === "aumento_cap") {
    offerClassName = "Aumento de Capital";
  }
  else if (offerClassName === "cessao") {
    offerClassName = "Cessão de Exploração";
  }
  else if (offerClassName === "accoes") {
    offerClassName = "Acções";
  }
  else if (offerClassName === "credito") {
    offerClassName = "Crédito";
  }
  if (offerRegion === undefined || offerRegion === "" || offerRegion === "undefined") {
    offerRegion = { $regex: /.*/ };
  }
  else {
    var local = 'active';
    var filtrosativos = 'active';
  }
  if (tipoSociedade === undefined || tipoSociedade === "" || tipoSociedade === "undefined") {
    tipoSociedade = { $regex: /.*/ };
  }
  if (offerValue === "1k_20k") {
    offerValue = "€1.000 - 20.000";
  }
  else if (offerValue === "20k_100k") {
    offerValue = "€20.000 - 100.000";
  }
  else if (offerValue === "100k_500k") {
    offerValue = "€100.000 - 500.000";
  }
  else if (offerValue === "500k_1M") {
    offerValue = "€500.000 - 2.000.000";
  }
  else if (offerValue === "2M_10M") {
    offerValue = "€2.000.000 - 10.000.000";

  }
  else if (offerValue === "plus_10M") {
    offerValue = "+ €10.000.000";
  }
  else if (offerValue === undefined|| offerValue === "" || offerValue === "undefined") {
    offerValue = { $regex: /.*/ };
  }
  if (setorAtividade === undefined|| setorAtividade === "" || setorAtividade === "undefined") {
    setorAtividade = { $regex: /.*/ };
  }
  console.log(offerClassName, tipoSociedade, setorAtividade, offerValue, offerRegion)

  if (id_gerado === undefined) {
    Offer.find({ offerClassName: offerClassName, tipoSociedade: tipoSociedade, setorAtividade: setorAtividade, offerValue: offerValue, offerRegion: offerRegion }).count(function(err, cnt) {
      Offer.find({ offerClassName: offerClassName, tipoSociedade: tipoSociedade, setorAtividade: setorAtividade, offerValue: offerValue, offerRegion: offerRegion }).exec(function(err, offers) {
        if (err) throw err;
        if (!offers) {
          return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
        }
        else {
          res.json({
            success: true,
            offers: offers,
            number_offers: cnt,
            pages: Math.ceil(cnt / perPage),
            current: page,
            offerClassName: offerClassName,
            tipoSociedade: tipoSociedade,
            filtrosativos: filtrosativos,
            setorAtividade: setorAtividade,
            offerRegion: offerRegion,
            offerValue: offerValue
          });
        }
      });
    });
  }
  else {
    Chave.findOne({
      id_gerado: id_gerado
    }, function(err, chave) {
      if (err) throw err;
      if (!chave) {
        return res.status(403).send({ success: false, msg: 'ERRO CHAVE' });
      }
      else {
        var decoded = jwt.decode(chave.token, config.secret);
        User.findOne({
          username: decoded.username
        }, function(err, user) {
          if (err) throw err;
          if (!user) {
            return res.status(403).send({ success: false, msg: 'ERRO USER' });
          }
          else {
            Offer.find({ offerClassName: offerClassName, tipoSociedade: tipoSociedade, setorAtividade: setorAtividade, offerValue: offerValue, offerRegion: offerRegion }).count(function(err, cnt) {
              Offer.find({ offerClassName: offerClassName, tipoSociedade: tipoSociedade, setorAtividade: setorAtividade, offerValue: offerValue, offerRegion: offerRegion }).exec(function(err, offers) {
                if (err) throw err;
                if (!offers) {
                  return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                }
                else {
                  res.json({
                    success: true,
                    offers: offers,
                    number_offers: cnt,
                    pages: Math.ceil(cnt / perPage),
                    current: page,
                    offerClassName: offerClassName,
                    tipoSociedade: tipoSociedade,
                    filtrosativos: filtrosativos,
                    setorAtividade: setorAtividade,
                    offerRegion: offerRegion,
                    offerValue: offerValue

                  });
                }
              });
            });
          }
        });
      }
    });
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
