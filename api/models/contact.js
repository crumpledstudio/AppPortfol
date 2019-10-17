var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var ContactSchema = mongoose.Schema({
    id_user: {
        type: String
    },
    id_contacto: {
        type: String
    },
    estado_contato: {
        type: String
    }
});

var Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.createContact = function(newContact, callback) {
    newContact.save(callback);
}
