import {
  createTable,
} from './db/mysql.js'

import {
  createTableMensaje,
} from './db/sqlite.js'


try {
  await createTable()  
  await createTableMensaje()
} catch (error) {
  console.error(error.message)
}
