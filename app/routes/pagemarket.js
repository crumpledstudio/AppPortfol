var express = require('express');
var router = express.Router();
var request = require("request");

/**
router.get('/', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        request.get({
            headers: { 'authorization': id_gerado },
            url: 'https://portapi-afonsoocosta53.c9users.io/offer/offers',
        }, function(error, response, body) {
            var body2 = JSON.parse(body);
            var products = body2.offers;
            var primeira_fila = [];
            var segunda_fila = [];
            var terceira_fila = [];
            primeira_fila.push(products[0]);
            primeira_fila.push(products[1]);
            primeira_fila.push(products[2]);
            primeira_fila.push(products[3]);
            segunda_fila.push(products[4]);
            segunda_fila.push(products[5]);
            segunda_fila.push(products[6]);
            segunda_fila.push(products[7]);
            terceira_fila.push(products[8]);
            terceira_fila.push(products[9]);
            terceira_fila.push(products[10]);
            terceira_fila.push(products[11]);
            res.render('pages/page-market', {
                primeira_fila: primeira_fila,
                segunda_fila: segunda_fila,
                terceira_fila: terceira_fila,
                layout: 'noGraphs',
                page: '2'
            });
            console.log("OLA");
        });
    }
    else {
        res.redirect('../user/login');
    }
});
*/
router.get('/', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    var offerClassName = req.query.offerClassName
    var tipoSociedade = req.query.tipoSociedade
    var setorAtividade = req.query.setorAtividade
    var offerRegion = req.query.offerRegion
    var offerValue = req.query.offerValue;
    if (id_gerado != undefined) {
        request.get({
            headers: { 'authorization': id_gerado },
        	url: 'https://localhost:8080/offer/searchOffer?offerClassName=' + offerClassName + '&tipoSociedade=' + tipoSociedade +
				'&setorAtividade=' + setorAtividade + '&offerValue=' + offerValue + '&offerRegion=' + offerRegion,
            }, function(error, response, body) {
            var body2 = JSON.parse(body);
            var products = body2.offers;
            var primeira_fila = [];
            var segunda_fila = [];
            var terceira_fila = [];
            primeira_fila.push(products[0]);
            primeira_fila.push(products[1]);
            primeira_fila.push(products[2]);
            primeira_fila.push(products[3]);
            segunda_fila.push(products[4]);
            segunda_fila.push(products[5]);
            segunda_fila.push(products[6]);
            segunda_fila.push(products[7]);
            terceira_fila.push(products[8]);
            terceira_fila.push(products[9]);
            terceira_fila.push(products[10]);
            terceira_fila.push(products[11]);
            res.render('pages/page-market', {
                primeira_fila: primeira_fila,
                segunda_fila: segunda_fila,
                terceira_fila: terceira_fila,
                layout: 'noGraphs',
                page: '2'
            });
            console.log("OLA");
        });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/teste', function(req, res, next) {
    console.log("TESTE")
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        request.get({
            headers: { 'authorization': id_gerado },
            url: 'https://portapi-afonsoocosta53.c9users.io/offer/offers',
        }, function(error, response, body) {
            var body2 = JSON.parse(body);
            var products = body2.offers;
            var primeira_fila = [];
            var segunda_fila = [];
            var terceira_fila = [];
            primeira_fila.push(products[0]);
            primeira_fila.push(products[1]);
            primeira_fila.push(products[2]);
            primeira_fila.push(products[3]);
            segunda_fila.push(products[4]);
            segunda_fila.push(products[5]);
            segunda_fila.push(products[6]);
            segunda_fila.push(products[7]);
            terceira_fila.push(products[8]);
            terceira_fila.push(products[9]);
            terceira_fila.push(products[10]);
            terceira_fila.push(products[11]);
            res.render('pages/page-market2', {
                primeira_fila: primeira_fila,
                segunda_fila: segunda_fila,
                terceira_fila: terceira_fila,
                layout: 'noGraphs',
                page: '2'
            });
        });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/newOffer', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        res.render('user/newOffer', { layout: 'noGraphs', tittle: 'Negociacoes Page' });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/escolha_oferta', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        res.render('user/escolha_oferta', { layout: 'oferta_layout', tittle: 'Tipo de Oferta' });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/teste_empresa', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        res.render('user/teste_empresa', { layout: 'oferta_layout', tittle: 'Tipo de Oferta' });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/investidor_coletivo', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        res.render('user/investidor_coletivo', { layout: 'oferta_layout', tittle: 'Tipo de Oferta' });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/nif_empresa', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        res.render('user/nif_empresa', { layout: 'oferta_layout', tittle: 'Tipo de Oferta' });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/nif_coletivo', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        res.render('user/nif_coletivo', { layout: 'oferta_layout', tittle: 'Tipo de Oferta' });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/investidor_privado', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        res.render('user/teste_privado', { layout: 'oferta_layout', tittle: 'Tipo de Oferta' });
    }
    else {
        res.redirect('../user/login');
    }
});

router.get('/ideia_negocio', function(req, res, next) {
    var id_gerado = req.cookies['id_gerado'];
    if (id_gerado != undefined) {
        res.render('user/teste_ideia', { layout: 'oferta_layout', tittle: 'Tipo de Oferta' });
    }
    else {
        res.redirect('../user/login');
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
            url: 'https://portapi-afonsoocosta53.c9users.io/user/nifvalidation',
            body: bodyText
        }, function(error, response, body) {
            var body2 = JSON.parse(body);
            var user = body2.teste;
            var nome = user.nome;
            console.log(user);
            console.log(nome);
            res.render('user/investor_private_form', { user: user, layout: 'forms', tittle: 'Private Page' });
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
                url: 'https://portapi-afonsoocosta53.c9users.io/user/nifvalidation',
                body: bodyText
            }, function(error, response, body) {
                var body2 = JSON.parse(body);
                var user = body2.teste;
                res.render('user/investor_colective_form', { user: user, layout: 'forms', tittle: 'Private Page' });
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
                    url: 'https://portapi-afonsoocosta53.c9users.io/user/nifvalidation',
                    body: bodyText
                }, function(error, response, body) {
                    var body2 = JSON.parse(body);
                    var user = body2.teste;
                    res.render('user/business_company_form_novo', { user: user, layout: 'forms', tittle: 'Private Page' });
                });
            }
            else {
                //TIPO DE CLIENTE É IDEIA DE NEGOCIO
                if (tipo_cliente === "business_ideia") {
                    var nif = req.body.nif_business_idea;
                    var bodyText = 'accountType=businessIdeia' + '&&nif=' + nif;
                    request.post({
                        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                        url: 'https://portapi-afonsoocosta53.c9users.io/user/nifvalidation',
                        body: bodyText
                    }, function(error, response, body) {
                        var body2 = JSON.parse(body);
                        var user = body2.teste;
                        res.render('user/business_ideia_form', { user: user, layout: 'forms', tittle: 'Private Page' });
                    });
                }
                else {
                    console.log("TESTE ERRO");
                    res.render('user/nifvalidation', { layout: 'forms', tittle: 'NIF Validation Page' });
                }
            }
        }
    }
});

router.post('/nifvalidation_coletivo', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    var nif = req.body.business_nif;
    var cidade = req.body.distrito_business;
    var bodyText = 'accountType=Investidor Coletivo' + '&&nif=' + nif + '&&distrito=' + cidade;
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'https://portapi-afonsoocosta53.c9users.io/user/nifvalidation',
        body: bodyText
    }, function(error, response, body) {
        var body2 = JSON.parse(body);
        var user = body2.teste;
        res.render('user/teste_coletivo', { user: user, layout: 'oferta_layout', tittle: 'Private Page' });
    });
});

router.post('/nifvalidation_empresa', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    var nif = req.body.business_nif;
    var cidade = req.body.distrito_business;
    var bodyText = 'accountType=Empresa' + '&&nif=' + nif + '&&distrito=' + cidade;
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'https://portapi-afonsoocosta53.c9users.io/user/nifvalidation',
        body: bodyText
    }, function(error, response, body) {
        var body2 = JSON.parse(body);
        var user = body2.teste;
        res.render('user/teste_empresa', { user: user, layout: 'oferta_layout', tittle: 'Private Page' });
    });
});


router.post('/oferta_coletivo', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    var bodyText = '';
    var tipo_negocio = req.body.tipo_negocio;
    switch (req.body.tipo_negocio) {
        case "Fusão":
            console.log("fusao");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=Fusão' +
                '&&descricao=' + req.body.fusao_descricao +
                '&&marketValue=' + req.body.fusao_valor_mercado +
                '&&modalityFuson=' + req.body.fusao_modalidade +
                '&&interventionType=' + req.body.fusao_modo_intervencao +
                '&&transactionObject=' + req.body.fusao_objeto +
                '&&motiv_fusao=' + req.body.fusao_motivos +
                '&&objetivos_fusao=' + req.body.fusao_objetivos +
                '&&projectFiscal=' + req.body.fusao_fiscalizacao +
                '&&projectFusao=' + req.body.fusao_projeto +
                '&&protectionModal_fusao=' + req.body.fusao_protecao_credores +
                '&&specialPartnerOptions=' + req.body.fusao_direitos +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
        case "Consórcio":
            console.log("Consórcio");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=Consórcio' +
                '&&descricao=' + req.body.consorcio_descricao +
                '&&marketValue=' + req.body.consorcio_valor_mercado +
                '&&objeto=' + req.body.consorcio_objeto +
                '&&modalityCons=' + req.body.consorcio_modalidade +
                '&&consulOrientFiscal=' + req.body.consorcio_conselho +
                '&&duration=' + req.body.consorcio_duracao +
                '&&activityType=' + req.body.consorcio_natureza +
                '&&activityPlace=' + req.body.consorcio_local +
                '&&contributionWanted=' + req.body.consorcio_contribuicao +
                '&&participationWinLoss=' + req.body.consorcio_participacao +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
        case "Aumento de Capital":
            console.log("Aumento de Capital");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=Aumento de Capital' +
                '&&descricao=' + req.body.aumento_capital_descricao +
                '&&marketValue=' + req.body.aumento_capital_valor_mercado +
                '&&modalityCapitalRaise=' + req.body.aumento_capital_modalidade +
                '&&capitalRaiseValue=' + req.body.aumento_capital_montante +
                '&&nominalValue_capRaise=' + req.body.aumento_capital_montante_nominal +
                '&&newEntrance_capRaise=' + req.body.aumento_capital_natureza +
                '&&payMode_capRaise=' + req.body.aumento_capital_modalidade +
                '&&emissionPrize_capRaise=' + req.body.aumento_capital_premio +
                '&&emissionPrizeValue_capRaise=' + req.body.aumento_capital_valor_premio +
                '&&newEntranceDate_capRaise=' + req.body.aumento_capital_prazo +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
        case "Financiamento":
            console.log("Financiamento");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=Financiamento' +
                '&&descricao=' + req.body.financiamento_descricao +
                '&&marketValue=' + req.body.financiamento_valor_mercado +
                '&&investmentType=' + req.body.financiamento_tipo +
                '&&creditValue=' + req.body.financiamento_valor +
                '&&creditModal=' + req.body.financiamento_modalidade +
                '&&interestRate=' + req.body.financiamento_taxa_juros +
                '&&interestPeriodicity=' + req.body.financiamento_periocidade_juros +
                '&&garantias=' + req.body.financiamento_garantias +
                '&&returnCreditDate=' + req.body.financiamento_prazo +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
        case "Quotas":
            console.log("Quotas");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=Quotas' +
                '&&descricao=' + req.body.quotas_descricao +
                '&&marketValue=' + req.body.quotas_valor +
                '&&percent=' + req.body.quotas_percentagem +
                '&&transactionCoin=' + req.body.quotas_moeda +
                '&&aquisitionForm=' + req.body.quotas_forma_aquisicao +
                '&&payMode=' + req.body.quotas_modalidade_pagamento +
                '&&contitularidade=' + req.body.quotas_contitularidade +
                '&&consentSoc=' + req.body.quotas_consentimento +
                '&&rebuyOption=' + req.body.quotas_opcao_recompra +
                '&&rebuyPercent=' + req.body.quotas_percentagem_recompra +
                '&&rebuyLimit=' + req.body.quotas_limite_recompra +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
        case "Trespasse":
            console.log("Trespasse");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=Trespasse' +
                '&&descricao=' + req.body.trespasse_descricao +
                '&&marketValue=' + req.body.trespasse_valor_mercado +
                '&&transmissionMode=' + req.body.trespasse_modalidade +
                '&&local=' + req.body.trespasse_local +
                '&&senhorioAuth=' + req.body.trespasse_senhorio +
                '&&payMode=' + req.body.trespasse_modalidade_pagamento +
                '&&payType=' + req.body.trespasse_forma_pagamento +
                '&&clausulaNaoConcorrencia=' + req.body.trespasse_clausula +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
        case "Ações":
            console.log("Ações");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=Ações' +
                '&&descricao=' + req.body.acoes_descricao +
                '&&marketValue=' + req.body.acoes_valor +
                '&&totalAcoes=' + req.body.acoes_totalidade +
                '&&unityValue=' + req.body.acoes_valor_unidade +
                '&&tradeUnits=' + req.body.acoes_unidades +
                '&&aquisitionForm=' + req.body.acoes_forma_aquisicao +
                '&&condTransmition=' + req.body.acoes_transmissao_condicionada +
                '&&payMode_acoes=' + req.body.acoes_modalidade_pagamento +
                '&&tipodeAcoao=' + req.body.acoes_tipo_acao +
                '&&circulacaoMode=' + req.body.acoes_forma_circulacao +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
        case "Cessão de Exploração":
            console.log("Cessão de Exploração");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=Cessão de Exploração' +
                '&&descricao=' + req.body.cessao_descricao +
                '&&marketValue=' + req.body.cessao_valor_mercado +
                '&&durationPayment=' + req.body.cessao_periodicidade +
                '&&durationContract=' + req.body.cessao_duracao +
                '&&renovationMode=' + req.body.cessao_renovacao +
                '&&inventoryInclude=' + req.body.cessao_inventario +
                '&&withWorkers=' + req.body.cessao_trabalhadores +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
        case "ideia_negocio":
            console.log("ideia_negocio");
            var bodyText = 'offeringStyleName=Investidor Coletivo&&' +
                'offerType=Compra&&' +
                'offerClass=ideia_negocio' +
                '&&descricao=' + req.body.ideia_negocio_descricao +
                '&&stateProgressType=' + req.body.ideia_negocio_estado +
                '&&tradeMark=' + req.body.ideia_negocio_marca_registada +
                '&&registedPatent=' + req.body.ideia_negocio_patente +
                '&&users=' + req.body.ideia_negocio_utilizadores +
                '&&clients=' + req.body.ideia_negocio_clientes +
                '&&vendas=' + req.body.ideia_negocio_vendas +
                '&&investmentType=' + req.body.ideia_negocio_tipo +
                '&&investmentMode=' + req.body.ideia_negocio_forma +
                '&&investmentValue=' + req.body.ideia_negocio_valor_investimento +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&definicao_juridica=' + req.body.definicao_juridica;
            break;
    }
    console.log(bodyText);
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
        body: bodyText
    }, function(error, response, body) {
        var body2 = JSON.parse(body);
        var user = body2.teste;
        res.render('user/teste_coletivo', { user: user, layout: 'oferta_layout', tittle: 'Private Page' });
    });
});

router.post('/oferta_empresa', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    var bodyText = '';
    var tipo_negocio = req.body.tipo_negocio;
    switch (req.body.tipo_negocio) {
        case "Fusão":
            console.log("fusao");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=Fusão' +
                '&&descricao=' + req.body.fusao_descricao +
                '&&marketValue=' + req.body.fusao_valor_mercado +
                '&&modalityFuson=' + req.body.fusao_modalidade +
                '&&interventionType=' + req.body.fusao_modo_intervencao +
                '&&transactionObject=' + req.body.fusao_objeto +
                '&&motiv_fusao=' + req.body.fusao_motivos +
                '&&objetivos_fusao=' + req.body.fusao_objetivos +
                '&&projectFiscal=' + req.body.fusao_fiscalizacao +
                '&&projectFusao=' + req.body.fusao_projeto +
                '&&protectionModal_fusao=' + req.body.fusao_protecao_credores +
                '&&specialPartnerOptions=' + req.body.fusao_direitos +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
        case "Consórcio":
            console.log("Consórcio");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=Consórcio' +
                '&&descricao=' + req.body.consorcio_descricao +
                '&&marketValue=' + req.body.consorcio_valor_mercado +
                '&&objeto=' + req.body.consorcio_objeto +
                '&&modalityCons=' + req.body.consorcio_modalidade +
                '&&consulOrientFiscal=' + req.body.consorcio_conselho +
                '&&duration=' + req.body.consorcio_duracao +
                '&&activityType=' + req.body.consorcio_natureza +
                '&&activityPlace=' + req.body.consorcio_local +
                '&&contributionWanted=' + req.body.consorcio_contribuicao +
                '&&participationWinLoss=' + req.body.consorcio_participacao +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
        case "Aumento de Capital":
            console.log("Aumento de Capital");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=Aumento de Capital' +
                '&&descricao=' + req.body.aumento_capital_descricao +
                '&&marketValue=' + req.body.aumento_capital_valor_mercado +
                '&&modalityCapitalRaise=' + req.body.aumento_capital_modalidade +
                '&&capitalRaiseValue=' + req.body.aumento_capital_montante +
                '&&nominalValue_capRaise=' + req.body.aumento_capital_montante_nominal +
                '&&newEntrance_capRaise=' + req.body.aumento_capital_natureza +
                '&&payMode_capRaise=' + req.body.aumento_capital_modalidade +
                '&&emissionPrize_capRaise=' + req.body.aumento_capital_premio +
                '&&emissionPrizeValue_capRaise=' + req.body.aumento_capital_valor_premio +
                '&&newEntranceDate_capRaise=' + req.body.aumento_capital_prazo +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
        case "Financiamento":
            console.log("Financiamento");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=Financiamento' +
                '&&descricao=' + req.body.financiamento_descricao +
                '&&marketValue=' + req.body.financiamento_valor_mercado +
                '&&investmentType=' + req.body.financiamento_tipo +
                '&&creditValue=' + req.body.financiamento_valor +
                '&&creditModal=' + req.body.financiamento_modalidade +
                '&&interestRate=' + req.body.financiamento_taxa_juros +
                '&&interestPeriodicity=' + req.body.financiamento_periocidade_juros +
                '&&garantias=' + req.body.financiamento_garantias +
                '&&returnCreditDate=' + req.body.financiamento_prazo +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
        case "Quotas":
            console.log("Quotas");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=Quotas' +
                '&&descricao=' + req.body.quotas_descricao +
                '&&marketValue=' + req.body.quotas_valor +
                '&&percent=' + req.body.quotas_percentagem +
                '&&transactionCoin=' + req.body.quotas_moeda +
                '&&aquisitionForm=' + req.body.quotas_forma_aquisicao +
                '&&payMode=' + req.body.quotas_modalidade_pagamento +
                '&&contitularidade=' + req.body.quotas_contitularidade +
                '&&consentSoc=' + req.body.quotas_consentimento +
                '&&rebuyOption=' + req.body.quotas_opcao_recompra +
                '&&rebuyPercent=' + req.body.quotas_percentagem_recompra +
                '&&rebuyLimit=' + req.body.quotas_limite_recompra +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
        case "Trespasse":
            console.log("Trespasse");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=Trespasse' +
                '&&descricao=' + req.body.trespasse_descricao +
                '&&marketValue=' + req.body.trespasse_valor_mercado +
                '&&transmissionMode=' + req.body.trespasse_modalidade +
                '&&local=' + req.body.trespasse_local +
                '&&senhorioAuth=' + req.body.trespasse_senhorio +
                '&&payMode=' + req.body.trespasse_modalidade_pagamento +
                '&&payType=' + req.body.trespasse_forma_pagamento +
                '&&clausulaNaoConcorrencia=' + req.body.trespasse_clausula +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
        case "Ações":
            console.log("Ações");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=Ações' +
                '&&descricao=' + req.body.acoes_descricao +
                '&&marketValue=' + req.body.acoes_valor +
                '&&totalAcoes=' + req.body.acoes_totalidade +
                '&&unityValue=' + req.body.acoes_valor_unidade +
                '&&tradeUnits=' + req.body.acoes_unidades +
                '&&aquisitionForm=' + req.body.acoes_forma_aquisicao +
                '&&condTransmition=' + req.body.acoes_transmissao_condicionada +
                '&&payMode_acoes=' + req.body.acoes_modalidade_pagamento +
                '&&tipodeAcoao=' + req.body.acoes_tipo_acao +
                '&&circulacaoMode=' + req.body.acoes_forma_circulacao +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
        case "Cessão de Exploração":
            console.log("Cessão de Exploração");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=Cessão de Exploração' +
                '&&descricao=' + req.body.cessao_descricao +
                '&&marketValue=' + req.body.cessao_valor_mercado +
                '&&durationPayment=' + req.body.cessao_periodicidade +
                '&&durationContract=' + req.body.cessao_duracao +
                '&&renovationMode=' + req.body.cessao_renovacao +
                '&&inventoryInclude=' + req.body.cessao_inventario +
                '&&withWorkers=' + req.body.cessao_trabalhadores +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
        case "ideia_negocio":
            console.log("ideia_negocio");
            var bodyText = 'offeringStyleName=Empresa&&' +
                'offerType=Venda&&' +
                'offerClass=ideia_negocio' +
                '&&descricao=' + req.body.ideia_negocio_descricao +
                '&&stateProgressType=' + req.body.ideia_negocio_estado +
                '&&tradeMark=' + req.body.ideia_negocio_marca_registada +
                '&&registedPatent=' + req.body.ideia_negocio_patente +
                '&&users=' + req.body.ideia_negocio_utilizadores +
                '&&clients=' + req.body.ideia_negocio_clientes +
                '&&vendas=' + req.body.ideia_negocio_vendas +
                '&&investmentType=' + req.body.ideia_negocio_tipo +
                '&&investmentMode=' + req.body.ideia_negocio_forma +
                '&&investmentValue=' + req.body.ideia_negocio_valor_investimento +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade +
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
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&morada=' + req.body.morada +
                '&&codigo_postal=' + req.body.codigo_postal +
                '&&distrito=' + req.body.distrito +
                '&&social_url=' + req.body.social_url +
                '&&website=' + req.body.website +
                '&&tipo_atividade=' + req.body.tipo_atividade +
                '&&definicao_juridica=' + req.body.definicao_juridica +
                '&&state=' + req.body.estado +
                '&&processos=' + req.body.processos +
                '&&courtAction=' + req.body.acoes_tribunal +
                '&&tributarySituation=' + req.body.situacao_tributaria +
                '&&compras=' + req.body.compras +
                '&&gasto_servicos=' + req.body.servicos +
                '&&gastos_trabalhadores=' + req.body.gastos_trabalhadores +
                '&&outras_despesas=' + req.body.outros_gastos +
                '&&vendas=' + req.body.vendas +
                '&&prestacao_servicos=' + req.body.prestacao_servicos +
                '&&juros=' + req.body.juros +
                '&&outros_rendimentos=' + req.body.outros_rendimentos +
                '&&inventario=' + req.body.inventario +
                '&&adiantamento_fornecedores=' + req.body.adiantamento_fornecedores +
                '&&outras_contas_receber=' + req.body.outras_contas_receber +
                '&&caixa=' + req.body.caixa +
                '&&depositos_bancarios=' + req.body.depositos_bancarios +
                '&&capital_realizado=' + req.body.capital_realizado +
                '&&reservas_legais=' + req.body.reservas_legais +
                '&&outras_reservas=' + req.body.outras_reservas +
                '&&resultados_transitados=' + req.body.resultados_transitados +
                '&&credito_bancario=' + req.body.credito_bancario +
                '&&impostos=' + req.body.impostos +
                '&&outros_passivos=' + req.body.outros_passivos +
                '&&suprimentos=' + req.body.suprimentos +
                '&&fornecedores=' + req.body.fornecedores +
                '&&trabalhadores=' + req.body.trabalhadores +
                '&&administracao=' + req.body.administracao;
            break;
    }
    console.log(bodyText);
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
        body: bodyText
    }, function(error, response, body) {
        var body2 = JSON.parse(body);
        var user = body2.teste;
        res.render('user/teste_coletivo', { user: user, layout: 'oferta_layout', tittle: 'Private Page' });
    });
});

router.post('/oferta_privado', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    var bodyText = '';
    var tipo_negocio = req.body.tipo_negocio;
    switch (req.body.tipo_negocio) {
        case "Fusão":
            console.log("fusao");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=Fusão' +
                '&&descricao=' + req.body.fusao_descricao +
                '&&marketValue=' + req.body.fusao_valor_mercado +
                '&&modalityFuson=' + req.body.fusao_modalidade +
                '&&interventionType=' + req.body.fusao_modo_intervencao +
                '&&transactionObject=' + req.body.fusao_objeto +
                '&&motiv_fusao=' + req.body.fusao_motivos +
                '&&objetivos_fusao=' + req.body.fusao_objetivos +
                '&&projectFiscal=' + req.body.fusao_fiscalizacao +
                '&&projectFusao=' + req.body.fusao_projeto +
                '&&protectionModal_fusao=' + req.body.fusao_protecao_credores +
                '&&specialPartnerOptions=' + req.body.fusao_direitos +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
        case "Consórcio":
            console.log("Consórcio");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=Consórcio' +
                '&&descricao=' + req.body.consorcio_descricao +
                '&&marketValue=' + req.body.consorcio_valor_mercado +
                '&&objeto=' + req.body.consorcio_objeto +
                '&&modalityCons=' + req.body.consorcio_modalidade +
                '&&consulOrientFiscal=' + req.body.consorcio_conselho +
                '&&duration=' + req.body.consorcio_duracao +
                '&&activityType=' + req.body.consorcio_natureza +
                '&&activityPlace=' + req.body.consorcio_local +
                '&&contributionWanted=' + req.body.consorcio_contribuicao +
                '&&participationWinLoss=' + req.body.consorcio_participacao +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
        case "Aumento de Capital":
            console.log("Aumento de Capital");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=Aumento de Capital' +
                '&&descricao=' + req.body.aumento_capital_descricao +
                '&&marketValue=' + req.body.aumento_capital_valor_mercado +
                '&&modalityCapitalRaise=' + req.body.aumento_capital_modalidade +
                '&&capitalRaiseValue=' + req.body.aumento_capital_montante +
                '&&nominalValue_capRaise=' + req.body.aumento_capital_montante_nominal +
                '&&newEntrance_capRaise=' + req.body.aumento_capital_natureza +
                '&&payMode_capRaise=' + req.body.aumento_capital_modalidade +
                '&&emissionPrize_capRaise=' + req.body.aumento_capital_premio +
                '&&emissionPrizeValue_capRaise=' + req.body.aumento_capital_valor_premio +
                '&&newEntranceDate_capRaise=' + req.body.aumento_capital_prazo +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
        case "Financiamento":
            console.log("Financiamento");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=Financiamento' +
                '&&descricao=' + req.body.financiamento_descricao +
                '&&marketValue=' + req.body.financiamento_valor_mercado +
                '&&investmentType=' + req.body.financiamento_tipo +
                '&&creditValue=' + req.body.financiamento_valor +
                '&&creditModal=' + req.body.financiamento_modalidade +
                '&&interestRate=' + req.body.financiamento_taxa_juros +
                '&&interestPeriodicity=' + req.body.financiamento_periocidade_juros +
                '&&garantias=' + req.body.financiamento_garantias +
                '&&returnCreditDate=' + req.body.financiamento_prazo +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
        case "Quotas":
            console.log("Quotas");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=Quotas' +
                '&&descricao=' + req.body.quotas_descricao +
                '&&marketValue=' + req.body.quotas_valor +
                '&&percent=' + req.body.quotas_percentagem +
                '&&transactionCoin=' + req.body.quotas_moeda +
                '&&aquisitionForm=' + req.body.quotas_forma_aquisicao +
                '&&payMode=' + req.body.quotas_modalidade_pagamento +
                '&&contitularidade=' + req.body.quotas_contitularidade +
                '&&consentSoc=' + req.body.quotas_consentimento +
                '&&rebuyOption=' + req.body.quotas_opcao_recompra +
                '&&rebuyPercent=' + req.body.quotas_percentagem_recompra +
                '&&rebuyLimit=' + req.body.quotas_limite_recompra +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
        case "Trespasse":
            console.log("Trespasse");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=Trespasse' +
                '&&descricao=' + req.body.trespasse_descricao +
                '&&marketValue=' + req.body.trespasse_valor_mercado +
                '&&transmissionMode=' + req.body.trespasse_modalidade +
                '&&local=' + req.body.trespasse_local +
                '&&senhorioAuth=' + req.body.trespasse_senhorio +
                '&&payMode=' + req.body.trespasse_modalidade_pagamento +
                '&&payType=' + req.body.trespasse_forma_pagamento +
                '&&clausulaNaoConcorrencia=' + req.body.trespasse_clausula +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
        case "Ações":
            console.log("Ações");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=Ações' +
                '&&descricao=' + req.body.acoes_descricao +
                '&&marketValue=' + req.body.acoes_valor +
                '&&totalAcoes=' + req.body.acoes_totalidade +
                '&&unityValue=' + req.body.acoes_valor_unidade +
                '&&tradeUnits=' + req.body.acoes_unidades +
                '&&aquisitionForm=' + req.body.acoes_forma_aquisicao +
                '&&condTransmition=' + req.body.acoes_transmissao_condicionada +
                '&&payMode_acoes=' + req.body.acoes_modalidade_pagamento +
                '&&tipodeAcoao=' + req.body.acoes_tipo_acao +
                '&&circulacaoMode=' + req.body.acoes_forma_circulacao +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
        case "Cessão de Exploração":
            console.log("Cessão de Exploração");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=Cessão de Exploração' +
                '&&descricao=' + req.body.cessao_descricao +
                '&&marketValue=' + req.body.cessao_valor_mercado +
                '&&durationPayment=' + req.body.cessao_periodicidade +
                '&&durationContract=' + req.body.cessao_duracao +
                '&&renovationMode=' + req.body.cessao_renovacao +
                '&&inventoryInclude=' + req.body.cessao_inventario +
                '&&withWorkers=' + req.body.cessao_trabalhadores +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
        case "ideia_negocio":
            console.log("ideia_negocio");
            var bodyText = 'offeringStyleName=Privado&&' +
                'offerType=Venda&&' +
                'offerClass=ideia_negocio' +
                '&&descricao=' + req.body.ideia_negocio_descricao +
                '&&stateProgressType=' + req.body.ideia_negocio_estado +
                '&&tradeMark=' + req.body.ideia_negocio_marca_registada +
                '&&registedPatent=' + req.body.ideia_negocio_patente +
                '&&users=' + req.body.ideia_negocio_utilizadores +
                '&&clients=' + req.body.ideia_negocio_clientes +
                '&&vendas=' + req.body.ideia_negocio_vendas +
                '&&investmentType=' + req.body.ideia_negocio_tipo +
                '&&investmentMode=' + req.body.ideia_negocio_forma +
                '&&investmentValue=' + req.body.ideia_negocio_valor_investimento +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setor_atividade_oferta=' + req.body.setor_atividade_oferta +
                '&&tipo_sociedade_oferta=' + req.body.tipo_sociedade_oferta;
            break;
    }
    console.log(bodyText);
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
        body: bodyText
    }, function(error, response, body) {
        var body2 = JSON.parse(body);
        var user = body2.teste;
        res.render('user/teste_coletivo', { user: user, layout: 'oferta_layout', tittle: 'Private Page' });
    });
});

router.post('/oferta_ideia', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    var bodyText = 'accountType=Investidor Coletivo';
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'https://portapi-afonsoocosta53.c9users.io/user/nifvalidation',
        body: bodyText
    }, function(error, response, body) {
        var body2 = JSON.parse(body);
        var user = body2.teste;
        res.render('user/teste_coletivo', { user: user, layout: 'oferta_layout', tittle: 'Private Page' });
    });
});

router.get('/:id', function(req, res, next) {
    res.render('user/oferta', { layout: 'oferta_layout', tittle: 'Porfolio Page' });
});

router.post('/newOffer', function(req, res) {
    console.log("CHEGUEI")
    var tipo_negocio = req.body.tipo_negocio;
    console.log(req.body.tipo_negocio)
    switch (req.body.tipo_negocio) {
        case "fusao":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=fusao' +
                '&&descricao=' + req.body.fusao_descricao +
                '&&marketValue=' + req.body.fusao_valor_mercado +
                '&&modalityFuson=' + req.body.fusao_modalidade +
                '&&interventionType=' + req.body.fusao_modo_intervencao +
                '&&transactionObject=' + req.body.fusao_objeto +
                '&&motiv_fusao=' + req.body.fusao_motivos +
                '&&objetivos_fusao=' + req.body.fusao_objetivos +
                '&&projectFiscal=' + req.body.fusao_fiscalizacao +
                '&&projectFusao=' + req.body.fusao_projeto +
                '&&protectionModal_fusao=' + req.body.fusao_protecao_credores +
                '&&specialPartnerOptions=' + req.body.fusao_direitos +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("fusao");
            break;
        case "consorcio":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=consorcio' +
                '&&descricao=' + req.body.consorcio_descricao +
                '&&marketValue=' + req.body.consorcio_valor_mercado +
                '&&objeto=' + req.body.consorcio_objeto +
                '&&modalityCons=' + req.body.consorcio_modalidade +
                '&&consulOrientFiscal=' + req.body.consorcio_conselho +
                '&&duration=' + req.body.consorcio_duracao +
                '&&activityType=' + req.body.consorcio_natureza +
                '&&activityPlace=' + req.body.consorcio_local +
                '&&contributionWanted=' + req.body.consorcio_contribuicao +
                '&&participationWinLoss=' + req.body.consorcio_participacao +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("consorcio");
            break;
        case "aumento_capital":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=aumento_capital' +
                '&&descricao=' + req.body.aumento_capital_descricao +
                '&&marketValue=' + req.body.aumento_capital_valor_mercado +
                '&&modalityCapitalRaise=' + req.body.aumento_capital_modalidade +
                '&&capitalRaiseValue=' + req.body.aumento_capital_montante +
                '&&nominalValue_capRaise=' + req.body.aumento_capital_montante_nominal +
                '&&newEntrance_capRaise=' + req.body.aumento_capital_natureza +
                '&&payMode_capRaise=' + req.body.aumento_capital_modalidade_pagamento +
                '&&emissionPrize_capRaise=' + req.body.aumento_capital_premio +
                '&&emissionPrizeValue_capRaise=' + req.body.aumento_capital_valor_premio +
                '&&newEntranceDate_capRaise=' + req.body.aumento_capital_prazo +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("aumento_capital");
            break;
        case "financiamento":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=financiamento' +
                '&&descricao=' + req.body.financiamento_descricao +
                '&&marketValue=' + req.body.financiamento_valor_mercado +
                '&&investmentType=' + req.body.financiamento_tipo +
                '&&creditValue=' + req.body.financiamento_valor +
                '&&creditModal=' + req.body.financiamento_modalidade +
                '&&interestRate=' + req.body.financiamento_taxa_juros +
                '&&interestPeriodicity=' + req.body.financiamento_periocidade_juros +
                '&&garantias=' + req.body.financiamento_garantias +
                '&&returnCreditDate=' + req.body.financiamento_prazo +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("financiamento");
            break;
        case "quotas":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=quotas' +
                '&&descricao=' + req.body.quotas_descricao +
                '&&marketValue=' + req.body.quotas_valor +
                '&&percent=' + req.body.quotas_percentagem +
                '&&transactionCoin=' + req.body.quotas_moeda +
                '&&aquisitionForm=' + req.body.quotas_forma_aquisicao +
                '&&payMode=' + req.body.quotas_modalidade_pagamento +
                '&&contitularidade=' + req.body.quotas_contitularidade +
                '&&consentSoc=' + req.body.quotas_consentimento +
                '&&rebuyOption=' + req.body.quotas_opcao_recompra +
                '&&rebuyPercent=' + req.body.quotas_percentagem_recompra +
                '&&rebuyLimit=' + req.body.quotas_limite_recompra +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("quotas");
            break;
        case "trespasse":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=trespasse' +
                '&&descricao=' + req.body.trespasse_descricao +
                '&&marketValue=' + req.body.trespasse_valor_mercado +
                '&&transmissionMode=' + req.body.trespasse_modalidade +
                '&&local=' + req.body.trespasse_local +
                '&&senhorioAuth=' + req.body.trespasse_senhorio +
                '&&payMode=' + req.body.trespasse_modalidade_pagamento +
                '&&payType=' + req.body.trespasse_forma_pagamento +
                '&&clausulaNaoConcorrencia=' + req.body.trespasse_clausula +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("trespasse");
            break;
        case "acoes":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=acoes' +
                '&&descricao=' + req.body.acoes_descricao +
                '&&marketValue=' + req.body.acoes_valor +
                '&&totalAcoes=' + req.body.acoes_totalidade +
                '&&unityValue=' + req.body.acoes_valor_unidade +
                '&&tradeUnits=' + req.body.acoes_unidades +
                '&&aquisitionForm=' + req.body.acoes_forma_aquisicao +
                '&&condTransmition=' + req.body.acoes_transmissao_condicionada +
                '&&payMode_acoes=' + req.body.acoes_modalidade_pagamento +
                '&&tipodeAcoao=' + req.body.acoes_tipo_acao +
                '&&circulacaoMode=' + req.body.acoes_forma_circulacao +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("acoes");
            break;
        case "cessao_exploracao":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=cessao_exploracao' +
                '&&descricao=' + req.body.cessao_descricao +
                '&&marketValue=' + req.body.cessao_valor_mercado +
                '&&durationPayment=' + req.body.cessao_periodicidade +
                '&&durationContract=' + req.body.cessao_duracao +
                '&&renovationMode=' + req.body.cessao_renovacao +
                '&&inventoryInclude=' + req.body.cessao_inventario +
                '&&withWorkers=' + req.body.cessao_trabalhadores +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("cessao_exploracao");
            break;
        case "ideia_negocio":
            var id_gerado = req.cookies['id_gerado'];
            var bodyText = 'offerType=Venda&&' +
                'offerClass=ideia_negocio' +
                '&&descricao=' + req.body.ideia_negocio_descricao +
                '&&stateProgressType=' + req.body.ideia_negocio_estado +
                '&&tradeMark=' + req.body.ideia_negocio_marca_registada +
                '&&registedPatent=' + req.body.ideia_negocio_patente +
                '&&users=' + req.body.ideia_negocio_utilizadores +
                '&&clients=' + req.body.ideia_negocio_clientes +
                '&&vendas=' + req.body.ideia_negocio_vendas +
                '&&investmentType=' + req.body.ideia_negocio_tipo +
                '&&investmentMode=' + req.body.ideia_negocio_forma +
                '&&investmentValue=' + req.body.ideia_negocio_valor_investimento +
                '&&offerRegion=' + req.body.offer_regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.foto_url;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'https://portapi-afonsoocosta53.c9users.io/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                var body2 = JSON.parse(body);
                var newOffer = body2.newOffer;
                res.redirect('../market/' + newOffer.offer_number);
            });
            console.log("ideia_negocio");
            break;
    }
});


module.exports = router;
