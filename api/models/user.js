var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// set up a mongoose model
var UserSchema = new Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	phone: {
		type: String
	},
	country: {
		type: String
	},
	role: {
		type: String
	},
	accType: {
		type: String
	},
	accCreatedOn: {
		type: String
	},
	lastSignedIn: {
		type: String
	},
	lastAccIp: {
		type: String
	},
	isActive: {
		type: String
	},
	accountNumber: {
		type: String
	},
	accountPoint: {
		type: String
	},
	accountPlan: {
		type: String
	},
	jwtToken: {
		type: String
	},
	account_state: {
		type: String
	},
	id_gerado: {
		type: String
	},
	imagem: {
		type: String
	},
	nifNumber: {
		type: String
	},
	adress: {
		type: String
	},
	codigo_postal: {
		type: String
	},
	distrito: {
		type: String
	},


	accountType: String,
	accountTypeID: String
});

UserSchema.pre('save', function(next) {
	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(11, function(err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	}
	else {
		return next();
	}
});

UserSchema.methods.comparePassword = function(passw, cb) {
	bcrypt.compare(passw, this.password, function(err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);
