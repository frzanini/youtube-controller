import { WhitelistConfig, WatchHistoryItem, VideoInfo } from './types'

const STORAGE_KEY = 'ytc:whitelist'
const HISTORY_KEY = 'ytc:history'

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

export function loadHistory(): WatchHistoryItem[] {
  if (typeof localStorage === 'undefined') return []
  const saved = localStorage.getItem(HISTORY_KEY)
  if (!saved) return []
  try {
    const parsed = JSON.parse(saved) as WatchHistoryItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveHistory(history: WatchHistoryItem[]): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export async function mergeVideosFromWhitelist(config: WhitelistConfig): Promise<VideoInfo[]> {
  const videos = config.videos.map<VideoInfo>((video) => ({
    videoId: video.id,
    title: video.label,
    thumbnailUrl: video.thumbnailUrl || 'https://via.placeholder.com/200x112.png?text=Video',
    channelTitle: video.channelTitle,
    duration: video.duration,
    channelId: video.channelId
  }))

  const channelVideos = await fetchVideosForChannels(config.channels)

  // Evitar duplicados por videoId
  const seen = new Set<string>()
  const merged: VideoInfo[] = []
  ;[...videos, ...channelVideos].forEach((v) => {
    if (v.videoId && !seen.has(v.videoId)) {
      seen.add(v.videoId)
      merged.push(v)
    }
  })
  return merged
}

async function fetchVideosForChannels(channels: { id: string; label: string }[]): Promise<VideoInfo[]> {
  if (typeof fetch === 'undefined') return []
  const results: VideoInfo[] = []
  for (const channel of channels) {
    let pageToken: string | null | undefined = undefined
    let pagesFetched = 0
    const MAX_PAGES = 1
    try {
      while (pagesFetched < MAX_PAGES) {
        const resp = await fetch(
          `/api/channel-videos?channelId=${encodeURIComponent(channel.id)}${pageToken ? `&pageToken=${pageToken}` : ''}`
        )
        if (!resp.ok) break
        const data = (await resp.json()) as { items?: any[]; nextPageToken?: string | null }
        if (!data.items || data.items.length === 0) break
        data.items.forEach((item) => {
          results.push({
            videoId: item.videoId,
            title: item.title,
            thumbnailUrl: item.thumbnailUrl || 'https://via.placeholder.com/200x112.png?text=Video',
            channelTitle: item.channelTitle,
            duration: item.duration,
            channelId: item.channelId
          })
        })
        pageToken = data.nextPageToken || null
        pagesFetched += 1
        if (!pageToken) break
      }
    } catch (error) {
      console.error('Erro ao carregar videos do canal', channel.id, error)
    }
  }
  return results
}
