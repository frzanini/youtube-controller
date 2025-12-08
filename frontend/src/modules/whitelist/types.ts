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
