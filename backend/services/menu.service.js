import {
  itemCommands,
  sectionCommands,
  subsectionCommands,
} from '../../db/commands/index.js'

export const getAllSections = async () => {
  return await sectionCommands.getAllSections()
}

export const getSectionById = async (id) => {
  return await sectionCommands.getSectionById(id)
}

export const getAllSubsections = async () => {
  return await subsectionCommands.getAllSubsections()
}

export const getSubsectionsBySection = async (sectionId) => {
  return await subsectionCommands.getSubsectionsBySection(sectionId)
}

export const getAllItems = async () => {
  return await itemCommands.getAllItems()
}

export const getItemsBySection = async (sectionId) => {
  return await itemCommands.getItemsBySection(sectionId)
}

export const getItemsBySubsection = async (subsectionId) => {
  return await itemCommands.getItemsBySubsection(subsectionId)
}
