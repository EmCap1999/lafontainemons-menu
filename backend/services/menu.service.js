import * as dbCommand from '../../db/commands/index.js'
import * as schema from '../../db/validation/index.js'

export const getAllSections = async () => {
  try {
    const sections = await dbCommand.getAllSections()
    return sections.map((section) => schema.SectionSchema.parse(section))
  } catch (error) {
    throw new Error(`Menu service - getAllSections: ${error.message}`)
  }
}

export const getSectionById = async (sectionId) => {
  try {
    const sections = await dbCommand.getSectionById(sectionId)
    return sections.map((section) => schema.SectionSchema.parse(section))
  } catch (error) {
    throw new Error(`Menu service - getSectionById: ${error.message}`)
  }
}

export const getAllSubsections = async () => {
  try {
    const subsections = await dbCommand.getAllSubsections()
    return subsections.map((subsection) =>
      schema.SubsectionSchema.parse(subsection),
    )
  } catch (error) {
    throw new Error(`Menu service - getAllSubsections: ${error.message}`)
  }
}

export const getSubsectionsBySection = async (sectionId) => {
  try {
    const subsections = await dbCommand.getSubsectionsBySection(sectionId)
    return subsections.map((subsection) =>
      schema.SubsectionSchema.parse(subsection),
    )
  } catch (error) {
    throw new Error(`Menu service - getSubsectionsBySection: ${error.message}`)
  }
}

export const getAllItems = async () => {
  try {
    const items = await dbCommand.getAllItems()
    return items.map((item) => schema.ItemSchema.parse(item))
  } catch (error) {
    throw new Error(`Menu service - getAllItems: ${error.message}`)
  }
}

export const getItemsBySection = async (sectionId) => {
  try {
    const items = await dbCommand.getItemsBySection(sectionId)
    return items.map((item) => schema.ItemSchema.parse(item))
  } catch (error) {
    throw new Error(`Menu service - getItemsBySection: ${error.message}`)
  }
}

export const getItemsBySubsection = async (subsectionId) => {
  try {
    const items = await dbCommand.getItemsBySubsection(subsectionId)
    return items.map((item) => schema.ItemSchema.parse(item))
  } catch (error) {
    throw new Error(`Menu service - getItemsBySubsection: ${error.message}`)
  }
}
