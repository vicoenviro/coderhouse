import knex from 'knex'
const options = {
  client: 'sqlite3',
  connection: {
    filename: './ecommerce.sqlite'
  },
}

export async function createTableMensaje() {
  const knexInstance = knex(options)
  try {
    const exist = await knexInstance.schema.hasTable('mensajes')
    if(exist) {
      console.log('La tabla mensajes ya existe.')
      return
    }
    await knexInstance.schema.createTable('mensajes', (table) => {
      table.increments('id').notNullable()      
      table.string('correo', 20).notNullable()
      table.string('mensaje', 25).notNullable()
      table.datetime('fecha').notNullable()
      table.primary('id')
    })
    console.log('Tabla mensajes creada.')
  } catch (error) {
    console.error(error.message)
    throw error
  } finally {
    knexInstance.destroy()
  }
}

export async function insertMensajes(mensajes) {
  const knexInstance = knex(options)
  try {
    await knexInstance('mensajes').insert(mensajes)
    console.log('mensajes creados con exito')
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    knexInstance.destroy()
  }
}

export async function getMensajes() {
  const knexInstance = knex(options)
  try {
    const rows = await knexInstance('mensajes').select('*')
    console.log('mensajes encontrados:', rows.length)
    return rows
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    knexInstance.destroy()
  }
}

export async function updateMensajes(data, conditons) {
  const knexInstance = knex(options)
  try {
    await knexInstance('mensajes').update(data).where(conditons)
    console.log('mensajes editados')
  } catch (error) {
    console.error(error.message)
    throw error
  } finally {
    knexInstance.destroy()
  }
}

export async function deleteMensajes(conditions) {
  const knexInstance = knex(options)
  try {
    if (conditions) {
      await knexInstance.from('mensajes').del().where(conditions)
    } else {
      await knexInstance.from('mensajes').del()
    }
    console.log('mensajes eliminados')
  } catch (error) {
    console.error(error.message)
    throw error
  } finally {
    knexInstance.destroy()
  }
}