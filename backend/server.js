import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const API_KEY = process.env.YOUTUBE_API_KEY
const YT_BASE = 'https://www.googleapis.com/youtube/v3'

if (!API_KEY) {
  console.warn('[YouTube Controller] Defina YOUTUBE_API_KEY no arquivo .env')
}

app.use(cors())

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/search', async (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : ''
  const mode = req.query.mode === 'channels' ? 'channels' : 'videos'
  const pageToken = typeof req.query.pageToken === 'string' ? req.query.pageToken : undefined

  if (!q) {
    return res.status(400).json({ error: 'Digite algo para buscar.' })
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'Chave da API ausente no servidor.' })
  }

  try {
    if (mode === 'channels') {
      const result = await searchChannels(q, pageToken)
      return res.json(result)
    }

    const result = await searchVideos(q, pageToken)
    return res.json(result)
  } catch (error) {
    console.error('[YouTube search error]', error)
    return res.status(500).json({ error: 'Nao foi possivel buscar agora. Tente mais tarde.' })
  }
})

app.listen(PORT, () => {
  console.log(`YouTube Controller backend rodando na porta ${PORT}`)
})

// Lista videos de um canal autorizado (para a area infantil)
app.get('/api/channel-videos', async (req, res) => {
  const channelId = typeof req.query.channelId === 'string' ? req.query.channelId.trim() : ''
  const pageToken = typeof req.query.pageToken === 'string' ? req.query.pageToken : undefined
  if (!channelId) {
    return res.status(400).json({ error: 'Canal invalido.' })
  }
  if (!API_KEY) {
    return res.status(500).json({ error: 'Chave da API ausente no servidor.' })
  }
  try {
    const result = await fetchChannelVideos(channelId, pageToken)
    return res.json(result)
  } catch (error) {
    console.error('[YouTube channel videos error]', error)
    return res.status(500).json({ error: 'Nao foi possivel carregar videos do canal agora.' })
  }
})

async function searchVideos(query, pageToken) {
  const searchUrl = new URL(`${YT_BASE}/search`)
  searchUrl.searchParams.set('part', 'snippet')
  searchUrl.searchParams.set('type', 'video')
  searchUrl.searchParams.set('maxResults', '15')
  searchUrl.searchParams.set('q', query)
  if (pageToken) searchUrl.searchParams.set('pageToken', pageToken)
  searchUrl.searchParams.set('key', API_KEY)

  const searchResp = await fetch(searchUrl)
  if (!searchResp.ok) {
    throw new Error(`YouTube search failed: ${searchResp.status}`)
  }
  const searchJson = await searchResp.json()
  const items = Array.isArray(searchJson.items) ? searchJson.items : []
  const videoIds = items.map((item) => item.id?.videoId).filter(Boolean)

  let durationMap = new Map()
  if (videoIds.length > 0) {
    const detailsUrl = new URL(`${YT_BASE}/videos`)
    detailsUrl.searchParams.set('part', 'contentDetails')
    detailsUrl.searchParams.set('id', videoIds.join(','))
    detailsUrl.searchParams.set('key', API_KEY)

    const detailsResp = await fetch(detailsUrl)
    if (!detailsResp.ok) {
      throw new Error(`YouTube details failed: ${detailsResp.status}`)
    }
    const detailsJson = await detailsResp.json()
    durationMap = new Map(
      (detailsJson.items || []).map((vid) => [vid.id, parseDuration(vid.contentDetails?.duration)])
    )
  }

  return {
    mode: 'videos',
    nextPageToken: searchJson.nextPageToken || null,
    prevPageToken: searchJson.prevPageToken || null,
    items: items.map((item) => {
      const videoId = item.id?.videoId
      const snippet = item.snippet || {}
      const thumb =
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        ''
      return {
        videoId,
        channelId: snippet.channelId || '',
        title: snippet.title || 'Video sem titulo',
        channelTitle: snippet.channelTitle || 'Canal',
        thumbnailUrl: thumb,
        duration: durationMap.get(videoId) || '--:--'
      }
    })
  }
}

async function searchChannels(query, pageToken) {
  const searchUrl = new URL(`${YT_BASE}/search`)
  searchUrl.searchParams.set('part', 'snippet')
  searchUrl.searchParams.set('type', 'channel')
  searchUrl.searchParams.set('maxResults', '15')
  searchUrl.searchParams.set('q', query)
  if (pageToken) searchUrl.searchParams.set('pageToken', pageToken)
  searchUrl.searchParams.set('key', API_KEY)

  const searchResp = await fetch(searchUrl)
  if (!searchResp.ok) {
    throw new Error(`YouTube search failed: ${searchResp.status}`)
  }
  const searchJson = await searchResp.json()
  const items = Array.isArray(searchJson.items) ? searchJson.items : []

  return {
    mode: 'channels',
    nextPageToken: searchJson.nextPageToken || null,
    prevPageToken: searchJson.prevPageToken || null,
    items: items.map((item) => {
      const channelId = item.id?.channelId
      const snippet = item.snippet || {}
      const thumb =
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        ''
      return {
        channelId,
        title: snippet.title || 'Canal sem nome',
        thumbnailUrl: thumb
      }
    })
  }
}

function parseDuration(iso) {
  if (!iso || typeof iso !== 'string') return '--:--'
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '--:--'
  const hours = Number(match[1] || 0)
  const minutes = Number(match[2] || 0)
  const seconds = Number(match[3] || 0)

  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  const base = `${h > 0 ? `${h}:` : ''}${h > 0 ? String(m).padStart(2, '0') : m}:${String(s).padStart(2, '0')}`
  return base
}

async function fetchChannelVideos(channelId, pageToken) {
  const searchUrl = new URL(`${YT_BASE}/search`)
  searchUrl.searchParams.set('part', 'snippet')
  searchUrl.searchParams.set('type', 'video')
  searchUrl.searchParams.set('maxResults', '15')
  searchUrl.searchParams.set('channelId', channelId)
  searchUrl.searchParams.set('order', 'date')
  if (pageToken) searchUrl.searchParams.set('pageToken', pageToken)
  searchUrl.searchParams.set('key', API_KEY)

  const searchResp = await fetch(searchUrl)
  if (!searchResp.ok) throw new Error(`YouTube search channel failed: ${searchResp.status}`)
  const searchJson = await searchResp.json()
  const items = Array.isArray(searchJson.items) ? searchJson.items : []
  const videoIds = items.map((item) => item.id?.videoId).filter(Boolean)

  let durationMap = new Map()
  if (videoIds.length > 0) {
    const detailsUrl = new URL(`${YT_BASE}/videos`)
    detailsUrl.searchParams.set('part', 'contentDetails')
    detailsUrl.searchParams.set('id', videoIds.join(','))
    detailsUrl.searchParams.set('key', API_KEY)
    const detailsResp = await fetch(detailsUrl)
    if (detailsResp.ok) {
      const detailsJson = await detailsResp.json()
      durationMap = new Map(
        (detailsJson.items || []).map((vid) => [vid.id, parseDuration(vid.contentDetails?.duration)])
      )
    }
  }

  return {
    nextPageToken: searchJson.nextPageToken || null,
    items: items.map((item) => {
      const snippet = item.snippet || {}
      const thumb =
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        ''
      const videoId = item.id?.videoId
      return {
        videoId,
        channelId,
        title: snippet.title || 'Video do canal',
        channelTitle: snippet.channelTitle || '',
        thumbnailUrl: thumb,
        duration: durationMap.get(videoId) || '--:--'
      }
    })
  }
}
