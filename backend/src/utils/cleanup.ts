import { readdirSync, statSync, rmSync } from 'fs'
import { join } from 'path'

const MEDIA_DIR = join(process.cwd(), 'media')
const MAX_AGE_MS = 60 * 60 * 1000 // 1 hour

export function cleanupOldFiles() {
  try {
    const now = Date.now()

    const dirs = readdirSync(MEDIA_DIR)

    let cleanedCount = 0

    for (const dir of dirs) {
      const dirPath = join(MEDIA_DIR, dir)
      const stats = statSync(dirPath)

      if (stats.isDirectory()) {
        const age = now - stats.mtimeMs

        if (age > MAX_AGE_MS) {
          rmSync(dirPath, { recursive: true, force: true })
          cleanedCount++
        }
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} old media directories`)
    }
  } catch (error) {
    console.error('Error during cleanup:', error)
  }
}
