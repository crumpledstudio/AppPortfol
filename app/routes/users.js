var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var db = mongoose.connection;
var dateTime = require('node-datetime');
var request = require("request");
var multer = require('multer');
var path = require('path');
var breadcrumbs = require('express-seo-breadcrumbs');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/img/')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
var upload = multer({ storage: storage });
/* ------------------------------------------------------ GETS's ------------------------------------------------- */

// REGISTER PAGE RENDER
router.get('/register', function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	}
	else {
		res.render('forms/register');
	}
});

router.get('/logout', function(req, res) {
	res.clearCookie('id_gerado');
	res.redirect('login');
});

// TESTE DE CHAMADA DA API USANDO O TOKEN DO JWTS
/* router.get('/teste', function (req, res) {
	/* var options = { 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YWM3ZTE1ZjQxYjcwZTY4MTkyN2Q5MzgiLCJ1c2VybmFtZSI6ImFmb25zb19jb3N0YTIyIiwicGFzc3dvcmQiOiIkMmEkMTAkR1c0bGJmUVB6R3Z6emxLTVcxMFoyLjE5Vm9VY3c3VmdtYmRRUUdhbUV6WGFVQk9vWEtPUUsiLCJlbWFpbCI6ImFmb25zb0Bob3RtYWlsLmNvbTIiLCJuYW1lIjoiYWZvbnNvY29zdGEyMiIsInBob25lIjoiMiIsImNvdW50cnkiOiJwb3J0dWdhbDIiLCJyb2xlIjoiY2xpZW50ZSIsImFjY1R5cGUiOiIiLCJhY2NDcmVhdGVkT24iOiIyMDE4LTA0LTA2IDIyOjA2OjM5IiwibGFzdFNpZ25lZEluIjoiMjAxOC0wNC0wNiAyMjowNzowNiIsImxhc3RBY2NJcCI6IjE5Mi4xNjguMjA3LjEiLCJpc0FjdGl2ZSI6InRydWUiLCJhY2NvdW50TnVtYmVyIjoiMiIsImFjY291bnRQb2ludCI6ImVzY29saGFfY29udGEiLCJhY2NvdW50UGxhbiI6IiIsIl9fdiI6MCwiand0VG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKZmFXUWlPaUkxWVdNM1pURTFaalF4WWpjd1pUWTRNVGt5TjJRNU16Z2lMQ0oxYzJWeWJtRnRaU0k2SW1GbWIyNXpiMTlqYjNOMFlUSXlJaXdpY0dGemMzZHZjbVFpT2lJa01tRWtNVEFrUjFjMGJHSm1VVkI2UjNaNmVteExUVmN4TUZveUxqRTVWbTlWWTNjM1ZtZHRZbVJSVVVkaGJVVjZXR0ZWUWs5dldFdFBVVXNpTENKbGJXRnBiQ0k2SW1GbWIyNXpiMEJvYjNSdFlXbHNMbU52YlRJaUxDSnVZVzFsSWpvaVlXWnZibk52WTI5emRHRXlNaUlzSW5Cb2IyNWxJam9pTWlJc0ltTnZkVzUwY25raU9pSndiM0owZFdkaGJESWlMQ0p5YjJ4bElqb2lZMnhwWlc1MFpTSXNJbUZqWTFSNWNHVWlPaUlpTENKaFkyTkRjbVZoZEdWa1QyNGlPaUl5TURFNExUQTBMVEEySURJeU9qQTJPak01SWl3aWJHRnpkRk5wWjI1bFpFbHVJam9pSWl3aWJHRnpkRUZqWTBsd0lqb2lNVGt5TGpFMk9DNHlNRGN1TVNJc0ltbHpRV04wYVhabElqb2lkSEoxWlNJc0ltRmpZMjkxYm5ST2RXMWlaWElpT2lJeUlpd2lZV05qYjNWdWRGQnZhVzUwSWpvaVpYTmpiMnhvWVY5amIyNTBZU0lzSW1GalkyOTFiblJRYkdGdUlqb2lJaXdpWDE5Mklqb3dmUS5INExyRGVzZXhTUUd5UGpYWFFzQUdWRWZBbU5BeWRhckpNVjQwWXhEY3ZRIn0.dLC8KGT-2GHTENWRDs6OngooCQc3c5_yv4IcZXvKFoE' };
	request.get('http://localhost:8080/user/memberinfo', options, function (err, res, body) {
		console.log(res);
	}); */
/*request.get({
	headers: { 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YWM3ZTE1ZjQxYjcwZTY4MTkyN2Q5MzgiLCJ1c2VybmFtZSI6ImFmb25zb19jb3N0YTIyIiwicGFzc3dvcmQiOiIkMmEkMTAkR1c0bGJmUVB6R3Z6emxLTVcxMFoyLjE5Vm9VY3c3VmdtYmRRUUdhbUV6WGFVQk9vWEtPUUsiLCJlbWFpbCI6ImFmb25zb0Bob3RtYWlsLmNvbTIiLCJuYW1lIjoiYWZvbnNvY29zdGEyMiIsInBob25lIjoiMiIsImNvdW50cnkiOiJwb3J0dWdhbDIiLCJyb2xlIjoiY2xpZW50ZSIsImFjY1R5cGUiOiIiLCJhY2NDcmVhdGVkT24iOiIyMDE4LTA0LTA2IDIyOjA2OjM5IiwibGFzdFNpZ25lZEluIjoiMjAxOC0wNC0wNiAyMjowNzowNiIsImxhc3RBY2NJcCI6IjE5Mi4xNjguMjA3LjEiLCJpc0FjdGl2ZSI6InRydWUiLCJhY2NvdW50TnVtYmVyIjoiMiIsImFjY291bnRQb2ludCI6ImVzY29saGFfY29udGEiLCJhY2NvdW50UGxhbiI6IiIsIl9fdiI6MCwiand0VG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKZmFXUWlPaUkxWVdNM1pURTFaalF4WWpjd1pUWTRNVGt5TjJRNU16Z2lMQ0oxYzJWeWJtRnRaU0k2SW1GbWIyNXpiMTlqYjNOMFlUSXlJaXdpY0dGemMzZHZjbVFpT2lJa01tRWtNVEFrUjFjMGJHSm1VVkI2UjNaNmVteExUVmN4TUZveUxqRTVWbTlWWTNjM1ZtZHRZbVJSVVVkaGJVVjZXR0ZWUWs5dldFdFBVVXNpTENKbGJXRnBiQ0k2SW1GbWIyNXpiMEJvYjNSdFlXbHNMbU52YlRJaUxDSnVZVzFsSWpvaVlXWnZibk52WTI5emRHRXlNaUlzSW5Cb2IyNWxJam9pTWlJc0ltTnZkVzUwY25raU9pSndiM0owZFdkaGJESWlMQ0p5YjJ4bElqb2lZMnhwWlc1MFpTSXNJbUZqWTFSNWNHVWlPaUlpTENKaFkyTkRjbVZoZEdWa1QyNGlPaUl5TURFNExUQTBMVEEySURJeU9qQTJPak01SWl3aWJHRnpkRk5wWjI1bFpFbHVJam9pSWl3aWJHRnpkRUZqWTBsd0lqb2lNVGt5TGpFMk9DNHlNRGN1TVNJc0ltbHpRV04wYVhabElqb2lkSEoxWlNJc0ltRmpZMjkxYm5ST2RXMWlaWElpT2lJeUlpd2lZV05qYjNWdWRGQnZhVzUwSWpvaVpYTmpiMnhvWVY5amIyNTBZU0lzSW1GalkyOTFiblJRYkdGdUlqb2lJaXdpWDE5Mklqb3dmUS5INExyRGVzZXhTUUd5UGpYWFFzQUdWRWZBbU5BeWRhckpNVjQwWXhEY3ZRIn0.dLC8KGT-2GHTENWRDs6OngooCQc3c5_yv4IcZXvKFoE' },
	url: 'http://localhost:8080/user/memberinfo'
}, function (error, response, body) {
	console.log(body);
});
res.redirect("/");
}); */


// INDEX PAGE RENDER
router.get('/', function(req, res) {
	res.render('dashboard');
});

// ESCOLHA DE CONTA PAGE RENDER
router.get('/escolha_conta', function(req, res) {
	if (req.isAuthenticated()) {
		res.render('escolha_conta');
	}
	else {
		res.render('login');
	}
});

// NIF VALIDATION PAGE RENDER
router.get('/nifvalidation', function(req, res) {
	res.render('nifvalidation');
});

router.get('/comercial_business', function(req, res) {
	res.render('comercial_business');
});

// FREE ACCOUNT REGISTER PAGE RENDER
router.get('/free', function(req, res) {
	if (req.isAuthenticated()) {
		res.render('nifvalidation', { conta: "free" });
	}
	else {
		res.render('login');
	}
});

// STANDARD ACCOUNT REGISTER PAGE RENDER
router.get('/standard', function(req, res) {
	if (req.isAuthenticated()) {
		res.render('nifvalidation', { conta: "standard" });
	}
	else {
		res.render('login');
	}
});

// PREMIUM ACCOUNT REGISTER PAGE RENDER
router.get('/premium', function(req, res) {
	if (req.isAuthenticated()) {
		res.render('nifvalidation', { conta: "premium" });
	}
	else {
		res.render('login');
	}
});

// INFORMACAÇÃO DE USER
router.get('/memberinfo', function(req, res) {
	var id_gerado = req.cookies['id_gerado'];
	request.get({
		headers: { 'authorization': id_gerado },
		url: 'http://localhost:8080/user/memberinfo',
	}, function(error, response, body) {
		res.render('login', { user: body });
	});
});

/* // BUSINESS IDEIA FORM PAGE RENDER
router.get('/business_ideia_form', function (req, res) {
	if (req.isAuthenticated()) {
		res.render('business_ideia_form');
	} else {
		res.render('login');
	}
}); */

// INFORMATION PAGE RENDER
/* router.get('/premium', function (req, res) {
	if (req.isAuthenticated()) {
		res.render('nifvalidation', { conta: "premium" });
	} else {
		res.render('login');
	}
}); */



/* ------------------------------------------------------ POST's ------------------------------------------------- */

// POST DO FORM DE REGISTO
router.post('/register', function(req, res) {
	var bodyText = 'username=' + req.body.username + '&&password=' + req.body.password + '&&email=' +
		req.body.email + '&&name=' + req.body.name + '&&phone=' +
		req.body.telemovel + '&&coutry=' + req.body.country;
	request.post({
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		url: 'http://localhost:8080/user/signup',
		body: bodyText
	}, function(error, response, body) {
		console.log(body);
	});
	res.redirect("login");
	/* var cont = db.collection("users").count(function (err, cnt) {
		if (err) throw err;
		var name = req.body.name;
		var telemovel = req.body.phone;
		var pais = req.body.country;
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;
		var dt = dateTime.create();
		var formatted = dt.format('Y-m-d H:M:S');

		// Validation
		req.checkBody('phone', 'Phone is required').notEmpty();
		req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not valid').isEmail();
		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

		var errors = req.validationErrors();

		if (errors) {
			res.render('register', {
				errors: errors
			});
		} else {
			var newUser = new User({
				name: name,
				email: email,
				username: username,
				password: password,
				phone: telemovel,
				country: pais,
				role: 'cliente',
				accType: '',
				accCreatedOn: formatted,
				lastSignedIn: '',
				lastAccIp: ip.address(),
				isActive: 'true',
				accountNumber: cnt,
				accountPoint: 'escolha_conta',
				accountPlan: ''
			});

			User.createUser(newUser, function (err, user) {
				if (err) throw err;
				console.log(user);
			});

			req.flash('success_msg', 'You are registered and can now login');

			res.redirect('/users/escolha_conta');

		}
	}); */
});

router.post('/escolha_conta', function(req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/users/escolha_conta')
	}
	else {
		res.render('register');
	}
});


router.post('/free', function(req, res) {
	if (req.isAuthenticated()) {
		var nifTeste = req.body.nifT;
		console.log(nifTeste);
		res.render('escolha_conta');
	}
	else {
		res.render('register');
	}
});

router.post('/nifvalidation', function(req, res) {
	var id_gerado = req.cookies['id_gerado'];
	var tipo_cliente = req.body.tipo_cliente;
	var tipo_investidor = req.body.tipo_investidor;
	//TIPO DE CLIENTE É INVESTIDOR PRIVADO
	if (tipo_investidor === "private") {
		var nif = req.body.nif_privado;
		var bodyText = 'accountType=Investidor Privado' + '&&nif=' + nif;
		request.post({
			headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
			url: 'http://localhost:8080/user/nifvalidation',
			body: bodyText
		}, function(error, response, body) {
			var body2 = JSON.parse(body);
			var user = body2.teste;
			var nome = user.nome;
			console.log(user);
			console.log(nome);
			res.render('investor_private_form', { user: user });
		});
	}
	else {
		//TIPO DE CLIENTE É INVESTIDOR COLETIVO
		if (tipo_investidor === "colective") {
			var nif = req.body.nif_colective;
			var cidade = req.body.distrito_colective;
			var bodyText = 'accountType=Investidor Coletivo' + '&&nif=' + nif + '&&distrito=' + cidade;
			request.post({
				headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
				url: 'http://localhost:8080/user/nifvalidation',
				body: bodyText
			}, function(error, response, body) {
				var body2 = JSON.parse(body);
				var user = body2.teste;
				res.render('investor_colective_form', { user: user });
			});
		}
		else {
			//TIPO DE CLIENTE É EMPRESA
			if (tipo_cliente === "business") {
				var nif = req.body.business_nif;
				var cidade = req.body.distrito_business;
				var bodyText = 'accountType=Empresa' + '&&nif=' + nif + '&&distrito=' + cidade;
				request.post({
					headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
					url: 'http://localhost:8080/user/nifvalidation',
					body: bodyText
				}, function(error, response, body) {
					var body2 = JSON.parse(body);
					var user = body2.teste;
					res.render('business_company_form', { user: user });
				});
			}
			else {
				//TIPO DE CLIENTE É IDEIA DE NEGOCIO
				if (tipo_cliente === "business_ideia") {
					var nif = req.body.nif_business_idea;
					var bodyText = 'accountType=businessIdeia' + '&&nif=' + nif;
					request.post({
						headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
						url: 'http://localhost:8080/user/nifvalidation',
						body: bodyText
					}, function(error, response, body) {
						var body2 = JSON.parse(body);
						var user = body2.teste;
						res.render('business_ideia_form', { user: user });
					});
				}
				else {
					console.log("ERRO");
				}
			}
		}
	}
});

// POST DO FORM DE REGISTO DE INVESTIDOR PRIVADO
router.post('/investidor_privado', function(req, res) {
	var id_gerado = req.cookies['id_gerado'];
	var bodyText = 'accountType=Investidor Privado' + '&&nif=' + req.body.nif + '&&name=' + req.body.name + '&&username=' + req.body.username + '&&nome_apresentacao=' + req.body.nome_apresentacao +
		'&&telemovel=' + req.body.telemovel + '&&email=' + req.body.email + '&&country=' + req.body.country + '&&morada=' + req.body.morada + '&&codigo_postal=' + req.body.codigo_postal + '&&distrito=' + req.body.distrito +
		'&&date=' + req.body.date + '&&estado_civil=' + req.body.estado_civil;
	console.log(bodyText);
	request.post({
		headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
		url: 'http://localhost:8080/user/investidor_privado',
		body: bodyText
	}, function(error, response, body) {
		console.log(body);
		res.render('investor_private_form');
	});
});


// POST DO FORM DE REGISTO DE INVESTIDOR COLETIVO
router.post('/investidor_coletivo', function(req, res) {
	var id_gerado = req.cookies['id_gerado'];
	var bodyText = 'accountType=Investidor Coletivo' +
		'&&nif=' + req.body.nif + 
		'&&name=' + req.body.name + 
		'&&username=' + req.body.username +
		'&&telemovel=' + req.body.telemovel + 
		'&&email=' + req.body.email + 
		'&&country=' + req.body.country + 
		'&&nome_empresa=' + req.body.nome_empresa + 
		'&&cae=' + req.body.cae + 
		'&&capital_social=' + req.body.capital_social +
		'&&date=' + req.body.date + 
		'&&setor_atividade=' + req.body.setor_atividade + 
		'&&tipo_sociedade=' + req.body.tipo_sociedade +
		'&&morada=' + req.body.morada + 
		'&&codigo_postal=' + req.body.codigo_postal + 
		'&&distrito=' + req.body.distrito + 
		'&&social_url=' + req.body.social_url + 
		'&&website=' + req.body.website + 
		'&&tipo_atividade=' + req.body.tipo_atividade + 
		'&&definicao_juridica=' + req.body.definicao_juridica + 
		'&&situacao_tributaria=' + req.body.situacao_tributaria +
		'&&estado=' + req.body.estado + 
		'&&acoes_tribunal=' + req.body.acoes_tribunal + 
		'&&processos=' + req.body.processos;
	console.log(bodyText);
	request.post({
		headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
		url: 'http://localhost:8080/user/investidor_coletivo',
		body: bodyText
	}, function(error, response, body) {
		console.log(body);
		res.render('investor_colective_form');
	});
});

// POST DO FORM DE REGISTO DE NEGOCIO
router.post('/business', function(req, res) {
	var id_gerado = req.cookies['id_gerado'];
	var bodyText = 'accountType=company' + '&&nif=' + req.body.nif + '&&name=' + req.body.name + '&&username=' + req.body.username +
		'&&telemovel=' + req.body.telemovel + '&&email=' + req.body.email + '&&country=' + req.body.country + '&&nome_empresa=' +
		req.body.nome_empresa + '&&cae=' + req.body.cae + '&&capital_social=' + req.body.capital_social +
		'&&date=' + req.body.date + '&&setor_atividade=' + req.body.setor_atividade + '&&tipo_sociedade=' + req.body.tipo_sociedade +
		'&&morada=' + req.body.morada + '&&codigo_postal=' + req.body.codigo_postal + '&&social_url=' +
		req.body.social_url + '&&website=' + req.body.website + '&&tipo_atividade=' + req.body.tipo_atividade + '&&definicao_juridica=' +
		req.body.definicao_juridica + '&&situacao_tributaria=' + req.body.situacao_tributaria +
		'&&estado=' + req.body.estado + '&&acoes_tribunal=' + req.body.acoes_tribunal + '&&processos=' + req.body.processos +
		'&&logo_url=' + req.body.logo_url + '&&foto_url=' + req.body.foto_url + '&&regiao=' + req.body.regiao;
	console.log(bodyText);
	request.post({
		headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
		url: 'http://localhost:8080/user/business',
		body: bodyText
	}, function(error, response, body) {
		console.log(body);
		res.render('investor_colective_form');
	});
});

// POST DO FORM DE REGISTO DE IDEIA DE NEGOCIO
router.post('/business_idea', function(req, res) {
	var id_gerado = req.cookies['id_gerado'];
	var bodyText = 'accountType=businessIdeia' + '&&nif=' + req.body.nif + '&&name=' + req.body.name + '&&username=' + req.body.username +
		'&&telemovel=' + req.body.telemovel + '&&email=' + req.body.email + '&&country=' + req.body.country + '&&nome_projeto=' +
		req.body.nome_projeto + '&&nome_apresentacao=' + req.body.nome_apresentacao + '&&setor_atividade=' + req.body.setor_atividade +
		'&&tamanho_equipa=' + req.body.tamanho_equipa + '&&descricao_projeto=' + req.body.descricao_projeto +
		'&&modelo_negocio=' + req.body.modelo_negocio + '&&publico_alvo=' + req.body.publico_alvo +
		'&&concorrencia=' + req.body.concorrencia + '&&url_apresentacao=' + req.body.url_apresentacao +
		'&&url_modelo_negocio=' + req.body.url_modelo_negocio + '&&url_matriz_financeira=' + req.body.url_matriz_financeira +
		'&&project_team=' + req.body.project_team + '&&work_plan=' + req.body.work_plan +
		'&&logo_url=' + req.body.logo_url + '&&foto_url=' + req.body.foto_url +
		'&&regiao=' + req.body.regiao + '&&tipo_sociedade=' + req.body.tipo_sociedade;
	console.log(bodyText);
	request.post({
		headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
		url: 'http://localhost:8080/user/business_idea',
		body: bodyText
	}, function(error, response, body) {
		console.log(body);
		res.render('investor_colective_form');
	});
});

//LOGIN
/* router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	}); */

// LOGIN 
router.post('/login', function(req, res, next) {
	/* passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err); }
		// Redirect if it fails
		if (!user) { return res.redirect('/users/login'); }
		req.logIn(user, function (err) {
			if (err) { return next(err); }
			// Redirect if it succeeds
			if (user.accountPoint === "escolha_conta") {
				return res.redirect('/users/escolha_conta');
			} else {
				return res.redirect('/');
			}
		});
	})(req, res, next); */
	var bodyText = 'username=' + req.body.username + '&&password=' + req.body.password;
	request.post({
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		url: 'http://localhost:8080/user/authenticate',
		body: bodyText
	}, function(error, response, body) {
		console.log(body);
		var body2 = JSON.parse(body);
		var id_gerado = body2.id_gerado;
		if (req.body.remember == "on") {
			res.cookie('id_gerado', id_gerado);
		}
		else {
			res.cookie('id_gerado', id_gerado, { expires: new Date(Date.now() + 3600000) });
		}
		res.redirect('/users/login');
	});
});

// PASSAPORT LOGIN
passport.use(new LocalStrategy(
	function(username, password, done) {
		User.getUserByUsername(username, function(err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function(err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				}
				else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
	var myquery = { username: user.username };
	var formatted = dateTime.create();
	var timeNow = formatted.format('Y-m-d H:M:S');
	var newvalues = { $set: { lastSignedIn: timeNow } };
	db.collection("users").updateOne(myquery, newvalues, function(err, res) {
		if (err) throw err;
		console.log(myquery);
		console.log(newvalues);
	});
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});

module.exports = router;
