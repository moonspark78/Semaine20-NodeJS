import fs from 'node:fs/promises'
import path from 'node:path'

// Chemin vers le fichier db.json à la racine du projet
const dbPath = path.join(process.cwd(), 'db.json')

/**
 * Réinitialise le fichier db.json avec un tableau vide (ou des données de test)
 */
export const resetDatabase = async () => {
  try {
    await fs.writeFile(dbPath, JSON.stringify([], null, 2))
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de la base de test :", error)
  }
}