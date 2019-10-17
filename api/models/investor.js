var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var InvestorSchema = mongoose.Schema({
    investorType: {
        colectivo: [{
            companyName: String,
            constitutionDate: String,
            socialCapital: String,
            nifNumber: String,
            companyContacts: [{
                street: String,
                postalCode: String,
                sede: String,
                distrito: String,
                geolocation: [{
                    lon: String,
                    lat: String
                }],
                socialUrl: String,
                website: String,
                banner: String,
                avatar: String
            }],
            tipoSociedade: String,
            sectorAtividade: String,
            privateProfile: [{
                CAE: String,
                juridicDefinition: String,
                activityType: String,
                state: String,
                processos: String,
                courtAction: String,
                tributarySituation: String
            }],
        }],
        privado: [{
            fullName: String,
            nifNumber: String,
            country: String,
            adress: String,
            codio_postal: String,
            distrito: String,
            estadoCivil: String,
            phone: String,
            email: String,
            displayName: String
        }]
    },
    investorNumber: {
        type: String
    }
});

var Investor = module.exports = mongoose.model('Investor', InvestorSchema);

module.exports.createInvestor = function (newInvestor, callback) {
    newInvestor.save(callback);
}

module.exports.getInvestorByUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

