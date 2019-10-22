var express = require("express");
var router = express.Router();
var request = require("request");
var multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/img/users_images");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
var upload = multer({ storage: storage });

router.get("/login", function(req, res, next) {
  res.render("user/signin", { layout: "forms", tittle: "Login Page" });
});

router.get("/logout", function(req, res, next) {
  res.clearCookie("id_gerado");
  res.redirect("/");
});

router.get("/register", function(req, res, next) {
  res.render("user/register", { layout: "forms", tittle: "Register Page" });
});

router.get("/nif_validation", function(req, res, next) {
  res.render("user/nifvalidation", {
    layout: "oferta_layout",
    tittle: "NIF Validation Page"
  });
});

router.get("/business", function(req, res, next) {
  res.render("user/business_company_form", {
    layout: "forms",
    tittle: "Business Page"
  });
});

router.get("/businessnovo", function(req, res, next) {
  res.render("user/business_company_form_novo", {
    layout: "forms",
    tittle: "Business Page"
  });
});

router.get("/ideia", function(req, res, next) {
  res.render("user/business_ideia_form", {
    layout: "forms",
    tittle: "Ideia Page"
  });
});

router.get("/private", function(req, res, next) {
  res.render("user/investor_private_form", {
    layout: "forms",
    tittle: "Private Page"
  });
});

router.get("/colective", function(req, res, next) {
  res.render("user/investor_colective_form", {
    layout: "forms",
    tittle: "Colective Page"
  });
});

router.get("/upgrade", function(req, res, next) {
  var id_gerado = req.cookies["id_gerado"];
  if (id_gerado != undefined) {
    request.get(
      {
        headers: { authorization: id_gerado },
        url: "http://localhost:8080/user/memberinfo/"
      },
      function(error, response, body) {
        var body2 = JSON.parse(body);
        var user = body2.user;
        res.render("user/upgrade", {
          layout: "noGraphs",
          tittle: "Upgrade Page",
          user: user
        });
      }
    );
  } else {
    res.redirect("../user/login");
  }
});

router.get("/profile/:id", function(req, res, next) {
  var id_gerado = req.cookies["id_gerado"];
  var id_profile = req.params.id;
  if (id_gerado != undefined) {
    request.get(
      {
        headers: { authorization: id_gerado, id_profile: id_profile },
        url: "http://localhost:8080/user/profile/"
      },
      function(error, response, body) {
        var body2 = JSON.parse(body);
        var profile = body2.profile;
        var user = body2.user;
        res.render("user/profile", {
          layout: "profile",
          tittle: "Profile Page",
          user: user,
          profile: profile
        });
        console.log(user);
        console.log("_________________________________________");
        console.log(profile);
      }
    );
  } else {
    res.redirect("../../user/login");
  }
});

router.get("/negociacoes", function(req, res, next) {
  var id_gerado = req.cookies["id_gerado"];
  if (id_gerado != undefined) {
    res.render("user/negociacoes", {
      layout: "negociacoes",
      tittle: "Negociacoes Page"
    });
  } else {
    res.redirect("../user/login");
  }
});

router.get("/dashboard", function(req, res, next) {
  var id_gerado = req.cookies["id_gerado"];
  if (id_gerado != undefined) {
    res.render("user/dashboard", {
      layout: "dashboard_layout",
      tittle: "Negociacoes Page"
    });
  } else {
    res.redirect("../user/login");
  }
});

router.get("/changeinfo", function(req, res, next) {
  var id_gerado = req.cookies["id_gerado"];
  if (id_gerado != undefined) {
    request.get(
      {
        headers: { authorization: id_gerado },
        url: "http://localhost:8080/user/memberinfo/"
      },
      function(error, response, body) {
        var body2 = JSON.parse(body);
        var profile = body2.profile;
        var user = body2.user;
        res.render("user/changeinfo", {
          layout: "noGraphs",
          tittle: "Profile Page",
          user: user
        });
        console.log(user);
      }
    );
  } else {
    res.redirect("../../user/login");
  }
});

router.get("/comercial", function(req, res, next) {
  res.render("user/comercial_business", {
    layout: "noGraphs",
    tittle: "Negociacoes Page"
  });
});

router.get("/comercial_teste", function(req, res, next) {
  res.render("user/comercial_business_teste", {
    layout: "noGraphs",
    tittle: "Negociacoes Page"
  });
});

router.get("/contabilidade", function(req, res, next) {
  res.render("user/contabilidade", {
    layout: "noGraphs",
    tittle: "Negociacoes Page"
  });
});

router.get("/contabilidade_teste", function(req, res, next) {
  res.render("user/contabilidade_teste", {
    layout: "noGraphs",
    tittle: "Negociacoes Page"
  });
});

router.get("/portfolio", function(req, res, next) {
	var id_gerado = req.cookies['id_gerado'];
	if (id_gerado != undefined) {
		res.render('user/portfolio', { layout: 'portfolio', tittle: 'Porfolio Page' });
	}
	else {
		res.redirect('../user/login');
	}
});

router.get("/recomendacoes", function(req, res, next) {
	var id_gerado = req.cookies['id_gerado'];
	if (id_gerado != undefined) {
		res.render('user/recomendacoes', { layout: 'noGraphs', tittle: 'Recomendacoes Page' });
	}
	else {
		res.redirect('../user/login');
	}
});

router.get("/chat", function(req, res, next) {
  res.render("user/chat", {
    layout: "chatLayout",
    tittle: "Recomendacoes Page"
  });
});

router.get("/activate/:id_gerado", function(req, res) {
  var id_gerado = req.params.id_gerado;
  var id_g = id_gerado.replace("id_gerado=", "");
  request.get(
    {
      headers: { authorization: id_g },
      url: "http://localhost:8080/user/activate"
    },
    function(error, response, body) {
      var body2 = JSON.parse(body);
      var msg = body2.msg;
      if (msg === "Welcome in the member area ") {
        res.cookie("id_gerado", id_g);
        res.redirect("../../../user/dashboard");
        console.log(msg);
      } else {
        res.redirect("/");
      }
    }
  );
});

router.post("/register", function(req, res) {
  console.log("REGISTO TESTE");
  console.log(req);
  var bodyText =
    "username=" +
    req.body.username +
    "&&password=" +
    req.body.password +
    "&&email=" +
    req.body.email;
  request.post(
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: "http://localhost:8080/user/signup",
      body: bodyText
    },
    function(error, response, body) {
      console.log(body);
    }
  );
  res.redirect("login");
});

router.post("/login", function(req, res) {
  console.log(req);
  var bodyText =
    "username=" + req.body.username + "&&password=" + req.body.password;
  request.post(
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: "http://localhost:8080/user/authenticate",
      body: bodyText
    },
    function(error, response, body) {
      var body2 = JSON.parse(body);
      var success = body2.success;
      var id_gerado = body2.id_gerado;
      if (success == true) {
        if (req.body.remember == "on") {
          res.cookie("id_gerado", id_gerado);
        } else {
          res.cookie("id_gerado", id_gerado, {
            expires: new Date(Date.now() + 3600000)
          });
        }
        res.redirect("../user/dashboard");
      } else {
        res.redirect("login");
      }
    }
  );
});

router.post("/business_company", function(req, res) {
  var id_gerado = req.cookies["id_gerado"];
  var bodyText =
    "&&nome_empresa=" +
    req.body.nome_empresa +
    "&&nif=" +
    req.body.nif +
    "&&cae=" +
    req.body.cae +
    "&&capital_social=" +
    req.body.capital_social +
    "&&date=" +
    req.body.date +
    "&&setor_atividade=" +
    req.body.setor_atividade +
    "&&tipo_sociedade=" +
    req.body.tipo_sociedade +
    "&&morada=" +
    req.body.morada +
    "&&codigo_postal=" +
    req.body.codigo_postal +
    "&&regiao=" +
    req.body.regiao +
    "&&social_url=" +
    req.body.social_url +
    "&&website=" +
    req.body.website +
    "&&tipo_atividade=" +
    req.body.tipo_atividade +
    "&&definicao_juridica=" +
    req.body.definicao_juridica +
    "&&situacao_tributaria=" +
    req.body.situacao_tributaria +
    "&&estado=" +
    req.body.estado +
    "&&acoes_tribunal=" +
    req.body.acoes_tribunal +
    "&&processos=" +
    req.body.processos +
    "&&logo_url=" +
    req.body.logo_url +
    "&&foto_url=" +
    req.body.foto_url;
  request.post(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: id_gerado
      },
      url: "http://localhost:8080/user/business",
      body: bodyText
    },
    function(error, response, body) {
      console.log(body);
    }
  );
  res.redirect("login");
});

router.post("/business_idea", function(req, res) {
  var id_gerado = req.cookies["id_gerado"];
  var bodyText =
    "&&nome_empresa=" +
    req.body.nome_empresa +
    "&&nif=" +
    req.body.nif +
    "&&cae=" +
    req.body.cae +
    "&&capital_social=" +
    req.body.capital_social +
    "&&date=" +
    req.body.date +
    "&&setor_atividade=" +
    req.body.setor_atividade +
    "&&tipo_sociedade=" +
    req.body.tipo_sociedade +
    "&&morada=" +
    req.body.morada +
    "&&codigo_postal=" +
    req.body.codigo_postal +
    "&&regiao=" +
    req.body.regiao +
    "&&social_url=" +
    req.body.social_url +
    "&&website=" +
    req.body.website +
    "&&tipo_atividade=" +
    req.body.tipo_atividade +
    "&&definicao_juridica=" +
    req.body.definicao_juridica +
    "&&situacao_tributaria=" +
    req.body.situacao_tributaria +
    "&&estado=" +
    req.body.estado +
    "&&acoes_tribunal=" +
    req.body.acoes_tribunal +
    "&&processos=" +
    req.body.processos +
    "&&logo_url=" +
    req.body.logo_url +
    "&&foto_url=" +
    req.body.foto_url;
  request.post(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: id_gerado
      },
      url: "http://localhost:8080/user/business",
      body: bodyText
    },
    function(error, response, body) {
      console.log(body);
    }
  );
  res.redirect("login");
});

router.get("/estado_conta", function(req, res, next) {
  var id_gerado = req.cookies["id_gerado"];
  request.get(
    {
      headers: { authorization: id_gerado },
      url: "http://localhost:8080/user/memberinfo"
    },
    function(error, response, body) {
      var body2 = JSON.parse(body);
      var user = body2.user;
      var account_state = user.account_state;
      if (account_state === "Created") {
        res.redirect("login");
        console.log(account_state);
      } else {
        res.redirect("/");
      }
    }
  );
});

router.get("/add_contact/:id", function(req, res, next) {
  var id_contacto = req.params.id;
  var id_gerado = req.cookies["id_gerado"];
  var bodyText = "id_contacto=" + id_contacto;
  request.post(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: id_gerado
      },
      url: "http://localhost:8080/user/add_contact",
      body: bodyText
    },
    function(error, response, body) {
      var body2 = JSON.parse(body);
      var text = body2.msg;
      if (text === "Authentication failed. Chave not found.") {
        console.log("Authentication failed. Chave not found.");
        return res.redirect("/");
      } else {
        if (text === "Authentication failed. User not found.") {
          console.log("Authentication failed. User not found.");
          return res.redirect("/");
        } else {
          if (text === "Authentication failed. User not found.") {
            console.log("Authentication failed. User not found.");
            return res.redirect("/");
          } else {
            if (text === "Product not found.") {
              console.log("Product not found.");
              return res.redirect("/");
            } else {
              return res.redirect("/user/contacts/1");
            }
          }
        }
      }
    }
  );
});

router.get("/removerContact/:id", function(req, res, next) {
  var id_contacto = req.params.id;
  var id_gerado = req.cookies["id_gerado"];
  var bodyText = "id_contacto=" + id_contacto;
  request.post(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: id_gerado
      },
      url: "http://localhost:8080/user/removerContact",
      body: bodyText
    },
    function(error, response, body) {
      var body2 = JSON.parse(body);
      var text = body2.msg;
      if (text === "Authentication failed. Chave not found.") {
        console.log("Authentication failed. Chave not found.");
        return res.redirect("/");
      } else {
        if (text === "Authentication failed. User not found.") {
          console.log("Authentication failed. User not found.");
          return res.redirect("/");
        } else {
          if (text === "Authentication failed. User not found.") {
            console.log("Authentication failed. User not found.");
            return res.redirect("/");
          } else {
            if (text === "Product not found.") {
              console.log("Product not found.");
              return res.redirect("/");
            } else {
              return res.redirect("/user/contacts/1");
            }
          }
        }
      }
    }
  );
});

router.get("/contacts/:page", function(req, res) {
  var id_gerado = req.cookies["id_gerado"];
  var page = req.params.page || 1;
  if (id_gerado != undefined) {
    request.get(
      {
        headers: { authorization: id_gerado },
        url: "http://localhost:8080/user/userContacts/" + page
      },
      function(error, response, body) {
        var body2 = JSON.parse(body);
        var contacts = body2.contacts;
        var user = body2.user;
        var pages = body2.pages;
        var arrayContacts = body2.arrayContacts;
        var arrayContacts_pendente = body2.arrayContacts_pendente;
        var number_pages = [];
        var numero_contacts = body2.numero_contacts;
        var msg = body2.msg;
        if (msg === "sucess") {
          for (var i = 1; i <= pages; i++) {
            number_pages.push([i]);
          }
          res.render("user/contacts", {
            layout: "noGraphsV2",
            tittle: "Contacts Page",
            contacts: contacts,
            pages: number_pages,
            currentPage: page,
            user: user,
            arrayContacts: arrayContacts,
            arrayContacts_pendente: arrayContacts_pendente
          });
        } else {
          res.render("user/contacts", {
            layout: "noGraphsV2",
            tittle: "Contacts Page",
            user: user
          });
        }
      }
    );
  } else {
    res.redirect("../../user/login");
  }
});

router.post("/changeinfo", upload.single("imagem"), function(req, res) {
  var id_gerado = req.cookies["id_gerado"];
  var images = req.file.filename;
  var bodyText =
    "username=" +
    req.body.username +
    "&&password=" +
    req.body.password +
    "&&email=" +
    req.body.email +
    "&&name=" +
    req.body.name +
    "&&phone=" +
    req.body.telemovel +
    "&&nif=" +
    req.body.nif +
    "&&distrito=" +
    req.body.distrito +
    "&&postal_code=" +
    req.body.postal_code +
    "&&imagem=" +
    images +
    "&&coutry=" +
    req.body.country;
  request.post(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: id_gerado
      },
      url: "http://localhost:8080/user/changeinfo",
      body: bodyText
    },
    function(error, response, body) {
      console.log(body);
    }
  );
  res.redirect("changeinfo");
});

module.exports = router;
