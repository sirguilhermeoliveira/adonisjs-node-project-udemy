'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArquivosSchema extends Schema {
  up () {
    this.create('arquivos', (table) => {
      table.increments()
      table.integer('tarefa_id')
      .unsigned().references('id').inTable('tarefas')
      .onUpdate('CASCADE').onDelete('CASCADE')
    table.string('caminho').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('arquivos')
  }
}

module.exports = ArquivosSchema
