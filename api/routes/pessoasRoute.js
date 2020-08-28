const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router

.get('/pessoas', PessoaController.pegaPessoasAtivas)
.get('/pessoas/todas', PessoaController.pegaTodasAsPessoas)
.get('/pessoas/:id', PessoaController.pegaUmaPessoa)

.post('/pessoas', PessoaController.criaPessoa)
.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

.put('/pessoas/:id', PessoaController.atualizaPessoa)

.delete('/pessoas/:id', PessoaController.apagaPessoa)

.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)

.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)

.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)

.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

module.exports = router