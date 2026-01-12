import { resolve } from 'node:path'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

import _collections from '../collections/index'
// const CONTENT_CWD = resolve(process.cwd(), '../content')
const CONTENT_CWD = resolve(process.cwd(), '_myData/content')


type SourceEntry = string | Record<string, any>
type SourceInput = SourceEntry | SourceEntry[]

const normalizeEntry = (entry: SourceEntry) => {
  if (typeof entry === 'string') {
    return { include: entry, cwd: CONTENT_CWD }
  }

  return { ...entry, cwd: entry.cwd ?? CONTENT_CWD }
}

export const getPath = (...segments: string[]) => {
  if (!segments.length) {
    return CONTENT_CWD
  }

  return resolve(CONTENT_CWD, ...segments)
}

export const withContentCwd = (source?: SourceInput) => {
  if (!source) {
    return source
  }

  if (Array.isArray(source)) {
    return source.map(normalizeEntry)
  }

  return normalizeEntry(source)
}

const createCollection = (collection: Parameters<typeof defineCollection>[0]) =>
  defineCollection({
    ...collection,
    source: withContentCwd(collection.source)
  })

const do1 = () => {
  return Object.fromEntries(Object.entries(
    _collections).map(([key, value]) => [key, createCollection(value)])
  )
}

export default defineContentConfig({
  collections: do1(_collections)
})
