🎯 Objetivo do Prompt 03

Criar a nova tela do Modo Filhos, agora com:

✔️ Mosaico inteligente de vídeos autorizados

Comportamento:

O app deve reunir todos os vídeos autorizados individualmente + todos os vídeos pertencentes a canais autorizados.

Exibir como um “catálogo infantil”, simples e convidativo.

Sem exibir canais (a criança não sabe o que é um canal).

Sem termos técnicos.

✔️ Duas listas principais
1️⃣ Últimos vídeos assistidos (até 15)

Ordem: do mais recente ao mais antigo

Apresentação: scroll horizontal (carrossel)

Visual: maior destaque, mas ainda infantil

Cada card deve gravar posição no histórico (localStorage)

2️⃣ Vídeos novos / vídeos não assistidos / assistidos há muito tempo

Apresentação: scroll vertical

Cards maiores (estilo catálogo infantil)

Sempre responsivos

Texto reduzido e simples (título curto, tamanho grande para leitura fácil)

Ordem: relevância simples → não assistidos primeiro

✔️ TODA A TELA precisa ser EXTREMAMENTE intuitiva

Pensada para crianças de 3 a 12 anos, mas também compreensível por:

adultos

idosos

pessoas com pouco letramento digital

✔️ Como funciona o Modo Filhos na nova versão

Ao abrir o modo Filhos:

Carrega whitelist local

Obtém vídeos autorizados + vídeos dos canais autorizados

Obtém histórico: vídeos assistidos (com timestamp)

Monta “Últimos Assistidos”

Monta “Sugeridos” (não assistidos)

Exibe as duas seções

✔️ Precisamos criar um novo prompt: 03-frontend-filhos-mosaico.md

Ele será semelhante ao Prompt 02 (painel dos pais), porém focado exclusivamente no Modo Filhos, e integrado ao que já está funcionando no V1 + V2.

👍 Agora vamos fazer o que você pediu:

“analise todos os documentos… Agora precisamos ajustar a área do FILHO…
vamos criar um prompt 03 para tratar destes itens.”

A seguir vou te entregar somente o texto do Prompt 03, inteiro, limpo, consolidado e compatível com o que já existe.

🔻🔻🔻 PROMPT 03 – MODO FILHOS (MOSÁICO DE VÍDEOS)

Salvar como:
docs/prompts/03-frontend-filhos-mosaico.md

Usar no Codex apenas o trecho entre “INÍCIO DO PROMPT PARA O CODEX” e “FIM DO PROMPT”

📄 PROMPT 03 – TEXTO COMPLETO (consolidado, pronto para uso)
🔻 INÍCIO DO PROMPT PARA O CODEX 🔻

Você está evoluindo o produto:

YouTube Controller – Modo Filhos (Área Infantil)
Foco: UX extremamente simples, segura e intuitiva.
Base: whitelist de vídeos e canais configurada pelos pais.

A tarefa é implementar toda a experiência da área das crianças, substituindo a tela atual (Filhos.tsx) por um mosaico completo de vídeos liberados, totalmente alinhado ao Documento de Visão.

A solução deve exibir:

🎯 1. CARREGAMENTO DE CONTEÚDO PARA A CRIANÇA

Carregar:

whitelist.videos: vídeos liberados individualmente

whitelist.channels: canais liberados

Histórico local (localStorage), contendo:

interface WatchHistoryItem {
  videoId: string
  lastWatchedAt: number
}


Montar lista unificada de vídeos:

allVideos = videosLiberadosIndividualmente
          + todosVídeosDosCanaisAutorizados


IMPORTANTE:
Nenhuma informação técnica deve ser exibida (ID, canal, URL).
A criança só vê thumbnails e títulos amigáveis.

🎨 2. DESIGN DE TELA PARA CRIANÇAS (Simples e Intuitivo)

A tela deve ter duas seções:

SEÇÃO 1 — Últimos Assistidos (até 15 vídeos)
Requisitos:

Scroll horizontal

Card reduzido, estilo “carrossel”

Ordem: do mais recente para o mais antigo

Ocultar seção se não houver vídeos assistidos

SEÇÃO 2 — Vídeos Disponíveis para Assistir
Regras:

Deve conter todo o restante dos vídeos (não assistidos ou com muito tempo sem assistir)

Apresentação vertical

Cards maiores (visual infantil)

Títulos curtos com text-sm ou text-base

Thumbnails médias (ex.: 200–240px)

Grid responsivo:

grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4

🎮 3. Ao clicar em qualquer vídeo

Abrir YoutubePlayer.tsx em modo infantil seguro:

Player fullscreen opcional (o botão nativo do YouTube deve aparecer)

Sem links externos

Sem recomendações externas

Sem related videos

Após iniciar o vídeo:

Atualizar histórico: mover vídeo para “Últimos Assistidos”

🔐 4. Segurança e Restrições

A criança não pode ver a barra de busca

A criança não deve ver canais

A criança não pode remover vídeos

A criança não pode sair do app ou abrir o YouTube externo

Nada de autoplay que leve a vídeos não autorizados

🧠 5. Estrutura Corporativa

Atualizar somente:

frontend/src/routes/Filhos.tsx
frontend/src/components/VideoCard.tsx (nova versão infantil)
frontend/src/modules/whitelist/storageLocal.ts (incluir histórico)
frontend/src/modules/whitelist/types.ts (WatchHistoryItem)
frontend/src/modules/player/YoutubePlayer.tsx (se necessário)


Criar novo componente:

frontend/src/components/LastWatchedCarousel.tsx


Comportamento:

Recebe lista de últimos assistidos

Renderiza horizontalmente

Cada card abre o player

🏗 6. Lógica — Organização dos vídeos
Implementar funções utilitárias:
function mergeVideosFromWhitelist(config: WhitelistConfig): Promise<VideoInfo[]>


VideoInfo inclui:

videoId
title
thumbnailUrl
channelTitle
duration

Criar classificação:

recentes = vídeos com histórico mais recente

novos/sugeridos = vídeos não assistidos ou assistidos há muito tempo

📱 7. Requisitos de UX

A experiência deve ser:

Grande

Colorida

Botões claros

Nenhum texto técnico

Zero fricção

Navegação simples

Seção de vídeos deve usar:

cursor: pointer
hover: scale
hover: brightness-110

🔁 8. Performance

Lazy loading das thumbnails

Listas renderizadas de forma eficiente

Reutilizar VideoCard infantil em dois tamanhos:

pequeno (carrossel)

médio (lista vertical)

🧹 9. Limpeza e integridade

Remover qualquer componente antigo que:

Exibia vídeos em formato de lista simples

Usava thumbs grandes desnecessárias

Não possuía controle de histórico

📝 10. Ao final da resposta do Codex (OBRIGATÓRIO)

Listar:

Arquivos criados

Arquivos modificados

Onde implementou:

mosaico

carrossel de últimos vídeos

lista vertical infantil

histórico de vídeos assistidos

merge de vídeos (individual + canais)

player com fullscreen nativo

🔺 FIM DO PROMPT PARA O CODEX 🔺
🎉 Pronto!

Este PROMPT 03 está consolidado, compatível com:

Documento de Visão

Prompt 01 (V1 Free)

Prompt 02 (Admin — Painel dos Pais)

Regras de whitelisting já implementadas no Codex