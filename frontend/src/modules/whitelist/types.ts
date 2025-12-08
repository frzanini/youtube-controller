export interface AllowedVideo {
  id: string
  label: string
  channelId?: string
  channelTitle?: string
  thumbnailUrl?: string
  duration?: string
}

export interface AllowedChannel {
  id: string
  label: string
  thumbnailUrl?: string
}

export interface WhitelistConfig {
  videos: AllowedVideo[]
  channels: AllowedChannel[]
}

export interface WatchHistoryItem {
  videoId: string
  lastWatchedAt: number
}

export interface VideoInfo {
  videoId: string
  title: string
  thumbnailUrl: string
  channelTitle?: string
  duration?: string
  channelId?: string
}
