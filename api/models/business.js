var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var BusinessSchema = mongoose.Schema({
    businessType: {
        company: [{
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
            tipo_sociedade: String,
            sector_atividade: String,
            regiao: String,
            privateProfile: [{
                CAE: String,
                juridicDefinition: String,
                activityType: String,
                state: String,
                processos: String,
                courtAction: String,
                tributarySituation: String
            }],
            comercial: [{
                compras: String,
                gasto_servicos: String,
                trabalhadores: String,
                outras_despesas: String,
                total_despesas: String,
                vendas: String,
                prestacao_servicos: String,
                juros: String,
                outros_rendimentos: String,
                total_rendimentos: String,
                resultado: String
            }],
            contabilidade: [{
                inventario: String,
                adiantamento_fornecedores: String,
                outras_contas_receber: String,
                caixa: String,
                depositos_bancarios: String,
                total_ativos: String,
                capital_realizado: String,
                reservas_legais: String,
                outras_reservas: String,
                resultados_transitados: String,
                total_capital_proprio: String,
                credito_bancario: String,
                impostos: String,
                outros_passivos: String,
                suprimentos: String,
                fornecedores: String,
                trabalhadores: String,
                administracao: String,
                subtotal_medio_longo_prazo: String,
                subtotal_curto_prazo: String,
                total_passivo: String
            }]
        }],
        businessIdeia: [{
            projectName: String,
            description: String,
            sector_atividade: String,
            business_model: String,
            market_target: String,
            presentation_url: String,
            team_size: String,
            project_team: String,
            work_plan: String,
            business_plan_url: String,
            matriz_financeira_url: String,
            concorrencia: String,
            tipo_sociedade: String,
            regiao: String
        }]
    },
    businessNumber: {
        type: String
    },
    logo_url: String,
    foto_url: String
});

var Business = module.exports = mongoose.model('Business', BusinessSchema);

module.exports.createBusiness = function (newBusiness, callback) {
    newBusiness.save(callback);
}

module.exports.getBusinessByUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

