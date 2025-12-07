export interface AllowedVideo {
  id: string
  label: string
}

export interface AllowedChannel {
  id: string
  label: string
}

export interface WhitelistConfig {
  videos: AllowedVideo[]
  channels: AllowedChannel[]
}
