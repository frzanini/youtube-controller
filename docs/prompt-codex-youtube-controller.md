📄 PROMPT V1 – Criar Projeto Frontend PWA do YouTube Controller

(Modelo otimizado, no padrão do prompt de referência que você enviou)

OBJETIVO

Criar o projeto YouTube Controller – Versão Free (V1) em React + TypeScript + PWA, com armazenamento LocalStorage, contendo:

Modo Pais → controle de whitelist (vídeos/canais permitidos)

Modo Filhos → somente vídeos liberados com player YouTube

Sem login, sem backend, offline-ready

ESTRUTURA DE ARQUIVOS A SER CRIADA
frontend/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── icons/
│       └── pwa-icon.png (placeholder)
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── styles/globals.css
    ├── utils/mathChallenge.ts
    ├── modules/player/YoutubePlayer.tsx
    ├── modules/whitelist/types.ts
    ├── modules/whitelist/storageLocal.ts
    ├── components/
    │   ├── Header.tsx
    │   ├── ParentGate.tsx
    │   ├── VideoCard.tsx
    │   └── ChannelCard.tsx
    └── routes/
        ├── Home.tsx
        ├── Pais.tsx
        └── Filhos.tsx


Após concluir, gere o conteúdo de TODOS os arquivos listados.

DEPENDÊNCIAS

Instalar via npm ou yarn:

react

react-dom

react-router-dom

typescript

vite

@vitejs/plugin-react

PWA → vite-plugin-pwa (config mínima + service worker auto)

IMPLEMENTAÇÃO DETALHADA (OBRIGATÓRIA)
1. storageLocal.ts

Persistência LocalStorage (chave fixa "ytc:whitelist")

Exportar:

loadWhitelist(): WhitelistConfig

saveWhitelist(config: WhitelistConfig): void

2. types.ts
export interface AllowedVideo { id: string; label: string }
export interface AllowedChannel { id: string; label: string }
export interface WhitelistConfig {
  videos: AllowedVideo[]
  channels: AllowedChannel[]
}

3. ParentGate.tsx

Gera desafio de soma simples (mathChallenge.ts)

Input → valida resposta

callback onUnlock()

4. Pais.tsx (CRUD simples local)

Lista vídeos/canais permitidos

Formulário para adicionar e remover itens

Botão Salvar e Sair → Home

5. Filhos.tsx

Carrega whitelist

Lista vídeos com miniatura YouTube

Abre player com YoutubePlayer ao clicar

6. Home.tsx

Três botões:

"Modo Pais"

"Modo Filhos"

"Premium (em breve)" → somente UI

Breve texto sobre o app

7. YoutubePlayer.tsx

iframe YouTube

modo destaque responsivo

8. PWA

manifest.json com display: standalone

service worker auto (via plugin)

README.md (GERAR AUTOMATICAMENTE)

Incluir:

Descrição do projeto (Free V1)

Como instalar:

npm install
npm run dev


Como instalar como PWA

Como usar Modo Pais & Modo Filhos

Estrutura de pastas do projeto

APÓS CRIAR TUDO

Responder confirmando:

Arquivos gerados

Código completo funcionando

Como iniciar o projeto

INÍCIO DO PROMPT PARA EXECUTAR NO CODEX

(Copiar somente o bloco abaixo ao gerar código)

Execute a criação do projeto conforme todas as especificações acima, incluindo:

- Estrutura completa de pastas e arquivos
- Código completo do frontend React + TS + PWA
- Componentes implementados
- Rotas funcionando
- LocalStorage ativo
- README.md documentado

Gere o código agora.

FIM