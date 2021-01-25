'use strict'

const Arquivo = use('App/Models/Arquivo')
const Tarefa = use('App/Models/Tarefa')

const Helpers = use('Helpers')

class ArquivoController {
    async create({ params, request, response }) {
        try{

            const tarefa = await Tarefa.findOrFail(params.id)

            const arquivos = request.file('file', {
                size: '1mb'
            })

            await arquivos.moveAll(Helpers.tmpPath('arquivos'), file => ({
                name: `${Date.now()}-${file.clientName}`
            }))

            if(!arquivos.movedAll()){
                return arquivos.errors()
            }

/*             await Promise.all(
                arquivos
                .movedList()
                .map(item => Arquivo.create({ tarefa_id: tarefa.id, caminho: item.fileName}))
            ) */
            await Promise.all(
                arquivos
                .movedList()
                .map(item => tarefa.arquivos().create({ caminho: item.fileName}))
            )

            return response.status(200).send({message: 'Arquivos inseridos com sucesso.'})

        } catch{
            return response.status(500).send({erro: `Ocorreu um erro no upload!`})
        }
    }
}

module.exports = ArquivoController
