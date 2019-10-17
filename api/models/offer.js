var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var OfferSchema = mongoose.Schema({
    offerType: {
        type: String
    },
    offeringStyleName: {
        type: String
    },
    offeringStyle: {
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
                passivo_curto_prazo: [{
                    credito_bancario_curto_prazo: String,
                    suprimentos_curto_prazo: String,
                    fornecedores_curto_prazo: String,
                    trabalhadores_curto_prazo: String,
                    administracao_curto_prazo: String,
                    impostos_curto_prazo: String,
                    outros_passivos_curto_prazo: String,
                }],
                passivo_longo_prazo: [{
                    credito_bancario_longo_prazo: String,
                    suprimentos_longo_prazo: String,
                    fornecedores_longo_prazo: String,
                    trabalhadores_longo_prazo: String,
                    administracao_longo_prazo: String,
                    impostos_longo_prazo: String,
                    outros_passivos_longo_prazo: String,
                }],
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
        }],
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
        }],
        privado: [{
                    id_privado: String
        }]
    },
    
    offerClass: {
        fusao: [{
            descricao: String,
            marketValue: String,
            modalityFuson: String,
            interventionType: String,
            transactionObject: String,
            motiv_fusao: String,
            objetivos_fusao: String,
            projectFiscal: String,
            projectFusao: String,
            protectionModal_fusao: String,
            specialPartnerOptions: String
        }],
        consorcio: [{
            descricao: String,
            marketValue: String,
            objeto: String,
            modalityCons: String,
            consulOrientFiscal: String,
            duration: String,
            activityType: String,
            activityPlace: String,
            contributionWanted: String,
            participationWinLoss: String
        }],
        aumento_capital: [{
            descricao: String,
            marketValue: String,
            modalityCapitalRaise: String,
            capitalRaiseValue: String,
            nominalValue_capRaise: String,
            newEntrance_capRaise: String,
            payMode_capRaise: String,
            emissionPrize_capRaise: String,
            emissionPrizeValue_capRaise: String,
            newEntranceDate_capRaise: String
        }],
        financiamento: [{
            descricao: String,
            marketValue: String,
            investmentType: String,
            creditValue: String,
            creditModal: String,
            returnCreditDate: String,
            interestRate: String,
            interestPeriodicity: String,
            garantias: String
        }],
        quotas: [{
            descricao: String,
            marketValue: String,
            percent: String,
            transactionCoin: String,
            aquisitionForm: String,
            payMode: String,
            contitularidade: String,
            consentSoc: String,
            rebuyOption: String,
            rebuyLimit: String,
            rebuyPercent: String
        }],
        trespasse: [{
            descricao: String,
            marketValue: String,
            transmissionMode: String,
            local: String,
            senhorioAuth: String,
            payMode: String,
            payType: String,
            clausulaNaoConcorrencia: String
        }],
        acoes: [{
            descricao: String,
            marketValue: String,
            totalAcoes: String,
            unityValue: String,
            tradeUnits: String,
            aquisitionForm: String,
            condTransmition: String,
            payMode_acoes: String,
            tipodeAcoao: String,
            circulacaoMode: String
        }],
        cessao_exploracao: [{
            descricao: String,
            marketValue: String,
            durationPayment: String,
            duratinContract: String,
            renovationMode: String,
            inventoryInclude: String,
            withWorkers: String
        }],
        ideia_negocio: [{
            descricao: String,
            stateProgressType: String,
            tradeMark: String,
            registedPatent: String,
            users: String,
            clients: String,
            vendas: String,
            investmentType: String,
            investmentMode: String,
            investmentValue: String
        }]
    },
    offerClassName: {
        type: String
    },
    offerRegion: {
        type: String
    },
    tipoSociedade: {
        type: String
    },
    setorAtividade: {
        type: String
    },
    offerValue: {
        type: String
    },
    details: [{
        logoURL: String,
        mainPicURL: String
    }],
    offer_number: {
        type: String
    },
    offerCreatedOn: {
        type: String
    },
    offerDescription: {
        type: String
    }
});

var Offer = module.exports = mongoose.model('Offer', OfferSchema);

module.exports.createOfer = function(newOffer, callback) {
    newOffer.save(callback);
}
