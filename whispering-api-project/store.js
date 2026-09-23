import fs from 'node:fs/promises'
import path from 'node:path'

const filename = path.join(process.cwd(), 'db.json')

const saveChanges = async (data) => {
  await fs.writeFile(filename, JSON.stringify(data, null, 2))
}

const readData = async () => {
  try {
    const data = await fs.readFile(filename, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

export const getAll = async () => {
  return await readData()
}

export const getById = async (id) => {
  const data = await readData()
  return data.find(item => item.id == id)
}

export const create = async (message) => {
  const data = await readData()
  const newItem = { id: Date.now(), message }
  const updatedData = data.concat([newItem])
  await saveChanges(updatedData)
  return newItem
}

export const updateById = async (id, message) => {
  const data = await readData()
  const newData = data.map(current => {
    if (current.id == id) {
      return { ...current, message }
    }
    return current
  })
  await saveChanges(newData)
}

export const deleteById = async (id) => {
  const data = await readData()
  const filteredData = data.filter(current => current.id != id)
  await saveChanges(filteredData)
}

export default { getAll, getById, create, updateById, deleteById }