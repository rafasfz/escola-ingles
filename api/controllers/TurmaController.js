const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {
  static async pegaTodasAsTurmas(req, res){
    try {
      const { data_inicial, data_final } = req.query
      const where = {}
      data_inicial || data_final ? where.data_incio = {} : null
      data_inicial ? where.data_incio[Op.gte] = data_inicial : null
      data_final ? where.data_incio[Op.lte] = data_final : null
      console.log(data_inicial, data_final)
      const todasAsTurmas = await database.Turmas.findAll({where})
      return res.status(200).json(todasAsTurmas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params
    try {
      const umaTurma = await database.Turmas.findOne( { 
        where: { 
          id: Number(id) 
        }
      })
      return res.status(200).json(umaTurma)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await database.Turmas.update(novasInfos, { where: { id: Number(id) }})
      const turmaAtualizada = await database.Turmas.findOne( { where: { id: Number(id) }})
      return res.status(200).json(turmaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params
    try {
      await database.Turmas.destroy({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

    static async pegaTurmasLotadas(req, res) {
      const lotacaoTurma = 2
      try {
          const turmasLotadas = await database.Matriculas.findAndCountAll({
            where: {
                status: 'confirmado'
            },
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
          const quantidadeTurmasLotadas = turmasLotadas.count
          return res.status(200).json(quantidadeTurmasLotadas)
      } catch (err) {
          return res.status(500).json(error.message)
      }
  }

}

module.exports = TurmaController