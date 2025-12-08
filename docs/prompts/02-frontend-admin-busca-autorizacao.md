✅ PROMPT FINAL CONSOLIDADO – VERSÃO ATUALIZADA (Copiar e colar no arquivo)

Este é o arquivo completo, já revisado. Substitua integralmente o conteúdo atual por este.

🔻 INÍCIO DO PROMPT PARA O CODEX 🔻

Você está evoluindo o produto:

YouTube Controller – Modo Pais (Administração)
Frontend React + TypeScript + Backend Proxy Node + Express
Integração REAL com YouTube Data API v3
UX extremamente simples para pais não técnicos

Seu trabalho é implementar TODAS as funcionalidades listadas abaixo de forma consistente, segura, eficiente e com foco em usabilidade.

A aplicação deve permanecer fiel ao documento de visão:
Pais controlam tudo, crianças nunca saem da “bolha segura”.

=============================
1. BACKEND-PROXY (Node + Express)
=============================

Crie/atualize:

backend/
  package.json
  server.js
  .env


Regras:

A API Key NÃO aparece no frontend.

Backend lê YOUTUBE_API_KEY do .env.

Retorna dados já “humanizados”.

1.1 Rota: GET /api/search

Query params:

q
mode (videos|channels)
pageToken (opcional)

1.2 Modo = VIDEOS

Chamar YouTube Search API:

part=snippet
type=video
maxResults=15
q=${q}
pageToken=${pageToken}


Extrair videoId e channelId

Chamar Videos API para pegar contentDetails.duration

Converter ISO 8601 → “mm:ss”

Retorno:

{
  "mode": "videos",
  "nextPageToken": "...",
  "prevPageToken": "...",
  "items": [
    {
      "videoId": "abc123",
      "channelId": "chan456",
      "title": "Título",
      "channelTitle": "Canal",
      "thumbnailUrl": "...",
      "duration": "10:21"
    }
  ]
}

1.3 Modo = CHANNELS
type=channel
maxResults=15


Retorno:

{
  "mode": "channels",
  "nextPageToken": "...",
  "prevPageToken": "...",
  "items": [
    {
      "channelId": "chan456",
      "title": "Canal",
      "thumbnailUrl": "..."
    }
  ]
}

1.4 Regras do backend

Nunca retornar objetos brutos da API.

Nunca expor IDs diretamente ao usuário final.

Mensagens de erro amigáveis.

=============================
2. FRONTEND (React + TS)
=============================

Use o projeto já existente em:

frontend/src/


Não criar novo projeto.

Manter:

Modo Filhos inalterado

Whitelist local

Player interno seguro

Nenhum botão abre o YouTube externamente

=============================
3. TELA DE BUSCA × TELA DE CONTEÚDO LIBERADO
=============================

Após o ParentGate, Pais.tsx deve exibir duas telas separadas:

Tela 1 — Buscar Conteúdo

A tela de busca deve permitir que o responsável pesquise novos vídeos e canais de forma simples, constante e intuitiva.
A SearchBar deve permanecer fixa no topo da página (sticky), mesmo durante a rolagem.

Contém:

SearchBar (fixa / sticky no topo da tela)

Sempre visível

Permite redefinir a busca a qualquer momento

Não desaparece ao rolar a página

Lista de vídeos

Exibição vertical estilo YouTube

Thumbs menores

Textos reduzidos

Botões pequenos (UX simplificada)

Indicar quando vídeo pertence a um canal já autorizado

Se sim → desabilitar opção “Autorizar canal”

Lista de canais

Exibição vertical estilo YouTube

Thumbs menores

Botões enxutos

Paginação

Exibição de 15 vídeos por página

Botões “Página anterior” / “Próxima página”

Prévia de vídeo

Player interno integrado

Tela cheia usando fullscreen nativo do YouTube

Botões:

“Autorizar este vídeo”

“Autorizar conteúdo deste canal” (se canal não autorizado)

“Fechar”

Autorizar vídeo (quando aplicável)

Autorizar canal (quando aplicável e canal não autorizado)

Tela 2 — Conteúdo Liberado

Contém:

Lista de vídeos liberados

Lista de canais liberados

Layout idêntico ao da consulta (mesmas thumbs e tamanhos)

Checkbox por item

Remoção em lote

Opção discreta: “Remover todas as autorizações”

Exigir confirmação explícita

Remover qualquer botão de autorizar nesta tela

Exibir apenas:

“Remover selecionados”

“Remover todos”

=============================
4. COMPONENTES
=============================
4.1 SearchBar.tsx

Props:

interface SearchBarProps {
  query: string
  onQueryChange: (value: string) => void
  onSearch: () => void
  mode: 'videos' | 'channels'
  onModeChange: (m: 'videos' | 'channels') => void
}

Requisitos atualizados:

A SearchBar deve:

Permanecer sempre visível no topo da página ao rolar o conteúdo.

Utilizar posicionamento sticky:

<div className="sticky top-0 z-20 bg-white dark:bg-neutral-900 shadow-sm px-4 py-2">


Nunca desaparecer enquanto há rolagem da lista de resultados.

Ser responsiva e leve, sem ocupar altura exagerada.

Conter:

Campo de busca

Botão “Buscar”

Toggle de modo (Vídeos / Canais)

Impacto visual esperado:

O usuário pode redefinir a busca a qualquer momento, mesmo após rolar muitos vídeos.

A barra de busca funciona como “cabeçalho” fixo da página.

A experiência fica idêntica a grandes plataformas (ex: YouTube Studio, Google Fotos etc.)

4.2 AdminVideoCard.tsx

Estilo YouTube vertical:

Thumbnail menor (200px)

Título text-sm

Canal text-xs

Botões pequenos (text-xs px-2 py-1)

Regras:

Exibir:

thumbnail

título

canal

duração

Botões:

“Assistir prévia”

“Autorizar vídeo”

“Remover vídeo”

NOVO:

Se o canal do vídeo estiver autorizado, desabilitar “Autorizar Canal” e exibir rótulo “Canal já autorizado”.

4.3 AdminChannelCard.tsx

Props:

{
  channelId,
  title,
  thumbnailUrl,
  authorized,
  onAuthorizeChannel,
  onRevokeChannel
}


Layout idêntico da consulta.

4.4 AdminResultsGrid.tsx

Videos → lista vertical, não grid:

<div className="flex flex-col gap-4">


Canais → continuar grid responsivo:

grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4


Paginação abaixo.

4.5 PAGINAÇÃO

Frontend mantém:

nextPageToken
prevPageToken
currentPageToken


UI exibe botões:

“Página anterior”

“Próxima página”

Nunca mostrar tokens.

Videos exibidos por página: 15.

=============================
5. PRÉVIA DE VÍDEO – FULLSCREEN DO YOUTUBE
=============================
5.1 AdminVideoPreviewDialog.tsx

Props:

{
  isOpen,
  videoId,
  channelId,
  onAuthorizeVideo,
  onAuthorizeChannel,
  onClose,
  isVideoAuthorized,
  isChannelAuthorized
}

Botões:

“Autorizar este vídeo”

“Autorizar conteúdo deste canal”

“Fechar”

NOVO – FULLSCREEN NATIVO DO YOUTUBE

Remover o botão “Tela Cheia” que criamos anteriormente.

Usar fullscreen do próprio YouTube:

No iframe:

allow="fullscreen"
allowFullScreen


playerVars:

fs: 1


Isso habilita o botão nativo de fullscreen do YouTube.

5.2 YoutubePlayer.tsx

Iframe deve incluir:

allow="fullscreen"
allowFullScreen
src="https://www.youtube.com/embed/VIDEOID?modestbranding=1&rel=0&fs=1"

=============================
6. PAINEL PAIS — BOTÕES SEPARADOS
=============================

Adicionar:

Botão SALVAR (salva whitelist)

Botão SAIR DO MODO PAIS

Visual separado

Posição superior direita sugerida

=============================
7. TELA CONTEÚDO LIBERADO – REGRAS COMPLETAS
=============================
✔ Usar os mesmos cards da consulta
✔ Thumbs menores
✔ Sem botões de autorizar
✔ Incluir checkbox por item
✔ Botão “Remover selecionados”
✔ Botão discreto “Remover todas as autorizações”

Exigir confirmação:
“Tem certeza que deseja remover todos os vídeos e canais liberados? Esta ação não pode ser desfeita.”

=============================
8. UX PARA PAIS NÃO TÉCNICOS
=============================

Nunca mostrar:

IDs

Tokens

Termos técnicos

Frases recomendadas:

“Buscar vídeos”

“Assistir prévia”

“Vídeos liberados”

“Canais liberados”

“Remover selecionados”

“Remover todas as autorizações”

=============================
9. NO FINAL DA RESPOSTA DO CODEX (OBRIGATÓRIO)
=============================

Listar:

Arquivos criados

Arquivos modificados

Onde implementou:

Paginação (backend + frontend)

Lista vertical estilo YouTube

Thumbs reduzidas

Desabilitar autorizar canal quando já autorizado

Fullscreen nativo

Painel Pais com SALVAR e SAIR

Conteúdo Liberado com seleção em lote e remoção total

🔺 FIM DO PROMPT PARA O CODEX 🔺
✅ Pronto.