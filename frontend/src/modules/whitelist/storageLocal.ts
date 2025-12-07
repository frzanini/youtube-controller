import { WhitelistConfig } from './types'

const STORAGE_KEY = 'ytc:whitelist'

const defaultConfig: WhitelistConfig = {
  videos: [],
  channels: []
}

export function loadWhitelist(): WhitelistConfig {
  if (typeof localStorage === 'undefined') return defaultConfig
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return defaultConfig

  try {
    const parsed = JSON.parse(saved) as Partial<WhitelistConfig>
    return {
      videos: parsed.videos ?? [],
      channels: parsed.channels ?? []
    }
  } catch {
    return defaultConfig
  }
}

export function saveWhitelist(config: WhitelistConfig): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}
