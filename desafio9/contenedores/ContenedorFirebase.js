import config from '../config.js'
import FirebaseAdmin from 'firebase-admin'
import { readFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

const cert = JSON.parse(
  await readFile(
    new URL(config.firebase.PATH, import.meta.url)
  )
)

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(cert)
})

class ContenedorFirebase {
  constructor(modelName) {    
    const db = FirebaseAdmin.firestore()
    this.query = db.collection(modelName)
  }

  listar(id) {
    return this.query.doc(id)
  }

  async listarAll() {
    const querySnapshot = await this.query.get()
    return querySnapshot.docs
  }

  async guardar(obj) {
    let id = uuidv4()
    let doc = this.query.doc(id)
    const result = await doc.create(obj)
    return result
  }

  async actualizar(elem) {
    const doc = this.query.doc(id)
    const result = await doc.update(elem)
    return result
  }

  async borrar(id) {
    const doc = this.query.doc(id)
    const result = await doc.delete()
    return result
  }

  async borrarAll() {
    const lsdoc = this.query.listDocuments()
    lsdoc.then(val => {
      val.map((val) => {
          val.delete()
      })
    })
    return 'borrados todos los documentos'
  }
}

export default ContenedorFirebase