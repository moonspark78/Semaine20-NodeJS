import fs from 'node:fs/promises'
import path from 'node:path'


const dbPath = path.join(process.cwd(), 'db.json')


export const resetDatabase = async () => {
  try {
    await fs.writeFile(dbPath, JSON.stringify([], null, 2))
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de la base de test :", error)
  }
}