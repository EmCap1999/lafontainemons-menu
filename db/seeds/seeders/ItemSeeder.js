import { createItem } from '../../commands/index.js'
import { getSectionByName } from '../../commands/index.js'
import { getSubsectionByNameAndSection } from '../../commands/index.js'
import { ItemSchema } from '../../validation/index.js'
import { itemsData } from '../data/items.data.js'
import { logWithTime } from '../utils/seeder.utils.js'

export const runItemSeeding = async () => {
  logWithTime('Seeding items...')

  const seededItems = []

  for (const itemData of itemsData) {
    try {
      const [parentSection] = await getSectionByName(itemData.sectionName)
      if (!parentSection) {
        throw new Error(`Parent section '${itemData.sectionName}' not found`)
      }

      let subsectionId = null
      if (itemData.subsectionName) {
        const [subsection] = await getSubsectionByNameAndSection(
          itemData.subsectionName,
          parentSection.sectionId,
        )
        if (!subsection) {
          throw new Error(
            `Subsection '${itemData.subsectionName}' not found in section '${itemData.sectionName}'`,
          )
        }
        subsectionId = subsection.subsectionId
      }

      const dataToInsert = {
        sectionId: parentSection.sectionId,
        subsectionId,
        name: itemData.name,
        description: itemData.description || null,
        origin: itemData.origin || null,
        capacity: itemData.capacity || null,
        unit: itemData.unit || null,
        price: itemData.price,
        isAvailable: itemData.isAvailable ?? true,
        picture: itemData.picture || null,
        displayOrder: itemData.displayOrder || 0,
      }

      const validatedData = ItemSchema.omit({
        itemId: true,
        createdAt: true,
        updatedAt: true,
      }).parse(dataToInsert)

      const [item] = await createItem(validatedData)
      seededItems.push(item)

      const subsectionInfo = itemData.subsectionName
        ? ` (${itemData.subsectionName})`
        : ''
      console.log(`Item: ${item.name} - ${parentSection.name}${subsectionInfo}`)
    } catch (error) {
      console.error(`Failed to seed item: ${itemData.name}`, error)
      throw error
    }
  }

  logWithTime(`Seeded ${seededItems.length} items`)
  return seededItems
}
