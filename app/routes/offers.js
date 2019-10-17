var express = require('express');
var router = express.Router();
var request = require("request");

//VER PAGINA DE REGISTAR PRODUTO
router.get('/newOffer', function(req, res) {
    res.render('forms/newOffer', { layout: 'form' });
});

router.get('/newOffer2', function(req, res) {
    res.render('forms/newOffer2');
});

router.get('/teste', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'http://localhost:8080/offer/testeoffer',
        body: '1'
    }, function(error, response, body) {
        console.log(body);
        res.render('investor_private_form');
    });
});

router.get('/offers', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    request.get({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'http://localhost:8080/offer/offers'
    }, function(error, response, body) {
        console.log(body);
        res.render('investor_private_form');
    });
});

router.get('/', function(req, res) {
    var id_gerado = req.cookies['id_gerado'];
    request.get({
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
        url: 'http://localhost:8080/offer/offers'
    }, function(error, response, body) {
        var body2 = JSON.parse(body);
        var offers = body2.offers;
        console.log(offers);
        res.render('offers', { offers: offers });
    });
});

router.get('/newSearch', function(req, res) {
    res.render('newSearch');
});

router.post('/newOffer', function(req, res) {
    var tipo_negocio = req.body.tipo_negocio;
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
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
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
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
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
                '&&payMode_capRaise=' + req.body.aumento_capital_modalidade +
                '&&emissionPrize_capRaise=' + req.body.aumento_capital_premio +
                '&&emissionPrizeValue_capRaise=' + req.body.aumento_capital_valor_premio +
                '&&newEntranceDate_capRaise=' + req.body.aumento_capital_prazo +
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
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
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
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
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
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
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
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
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
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
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
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
                '&&offerRegion=' + req.body.regiao +
                '&&setorAtividade=' + req.body.setor_atividade +
                '&&tipoSociedade=' + req.body.tipo_sociedade +
                '&&logoURL=' + req.body.logo_url +
                '&&foto_url=' + req.body.tipo_sociedade;
            console.log(bodyText);
            request.post({
                headers: { 'content-type': 'application/x-www-form-urlencoded', 'authorization': id_gerado },
                url: 'http://localhost:8080/offer/newOffer',
                body: bodyText
            }, function(error, response, body) {
                console.log(body);
                res.render('investor_private_form');
            });
            console.log("ideia_negocio");
            break;
    }
});


module.exports = router;
