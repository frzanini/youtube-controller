# Prompt para Codex – YouTube Controller

> Uso: copie TODO o conteúdo abaixo (a partir de “INÍCIO DO PROMPT”) e cole no Codex / modelo de código.

---

INÍCIO DO PROMPT
----------------

Você é um desenvolvedor sênior full stack.

Quero que você implemente a aplicação **YouTube Controller** dentro de um repositório Git com a estrutura descrita abaixo.

## CONTEXTO DO PRODUTO (RESUMO)

O YouTube Controller é uma aplicação de controle parental para YouTube, com dois modos:

- **Versão Básica (Free)** – configurações locais por dispositivo, sem login, sem backend.
- **Versão Premium (Assinatura)** – com login e sincronização das configurações entre dispositivos via backend Python.

Do ponto de vista técnico:

- **V1 (prioridade agora)**: PWA em React + TypeScript, sem backend, salvando whitelist de vídeos/canais em armazenamento local.
- **V2 (esqueleto agora)**: Backend Python (FastAPI) com endpoints para login e sincronização de whitelist, usado pela versão Premium.

## ESTRUTURA DO REPOSITÓRIO

Considere que o repositório se chama `youtube-controller` e já contém:

- `docs/visao-produto.md` – Documento de Visão (NÃO reescrever, não apagar).

Quero que você crie/complete a seguinte estrutura:

```bash
youtube-controller/
├── README.md
├── .gitignore
├── docs/
│   ├── visao-produto.md              # já existe, não alterar o conteúdo
│   └── prompt-codex-youtube-controller.md
├── frontend/
│   ├── README.md
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts                # ou equivalente
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── routes/
│       │   ├── Home.tsx
│       │   ├── Pais.tsx
│       │   └── Filhos.tsx
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── VideoCard.tsx
│       │   ├── ChannelCard.tsx
│       │   └── ParentGate.tsx       # desafio aritmético
│       ├── modules/
│       │   ├── whitelist/
│       │   │   ├── storageLocal.ts  # V1 – localStorage
│       │   │   └── types.ts
│       │   └── player/
│       │       └── YoutubePlayer.tsx
│       ├── styles/
│       │   └── globals.css
│       └── utils/
│           └── mathChallenge.ts
├── backend/
│   ├── README.md
│   ├── pyproject.toml ou requirements.txt
│   ├── .env.example
│   └── app/
│       ├── main.py
│       ├── core/
│       │   ├── config.py
│       │   └── security.py
│       ├── api/
│       │   └── v1/
│       │       ├── routes_auth.py
│       │       ├── routes_whitelist.py
│       │       └── routes_health.py
│       ├── models/
│       │   ├── user.py
│       │   ├── video.py
│       │   └── channel.py
│       ├── schemas/
│       │   ├── us
```

ESCOPO – O QUE GERAR
PRIORIDADE 1 – Frontend V1 (Free, funcional)

Implemente o frontend como uma PWA em React + TypeScript, com:

Stack frontend

React + TypeScript

Bundler moderno (preferencialmente Vite)

PWA: manifest + service worker básico

Armazenamento: localStorage (com abstração em storageLocal.ts)

Funcionalidades V1

Home (routes/Home.tsx)

Exibir:

Botão “Modo Pais”

Botão “Modo Filhos”

Botão “Entrar / Assinar Premium” (apenas visual, sem backend)

Texto curto explicando:

O que o app faz.

Diferença entre versão Free (local por dispositivo) e Premium (sync).

Modo Pais (routes/Pais.tsx)

Antes de mostrar o painel, usar ParentGate:

Gerar uma conta aritmética simples (ex.: 7 + 4).

Validar a resposta.

Só em caso de acerto liberar o painel.

Painel de configuração:

Campo para adicionar vídeo permitido (URL ou ID do YouTube).

Campo para adicionar canal permitido (URL ou ID do canal).

Lista de vídeos permitidos.

Lista de canais permitidos.

Botão para remover itens da lista.

Botão “Salvar configurações e sair” que:

Salva via storageLocal.ts.

Redireciona de volta para Home.

Modo Filhos (routes/Filhos.tsx)

Carregar whitelist do storageLocal.ts.

Listar vídeos permitidos:

Mostrar ao menos um rótulo (id ou label).

Se possível, montar URL de thumbnail usando o ID do vídeo.

Ao clicar em um vídeo:

Abrir YoutubePlayer com o vídeo em destaque (iframe).

Não mostrar nenhum link direto para Modo Pais.

Armazenamento (modules/whitelist/storageLocal.ts + types.ts)

Definir tipos:

AllowedVideo { id: string; label: string; }

AllowedChannel { id: string; label: string; }

WhitelistConfig { videos: AllowedVideo[]; channels: AllowedChannel[]; }

Funções:

loadWhitelist(): WhitelistConfig

saveWhitelist(config: WhitelistConfig): void

Usar localStorage sob uma chave única, por exemplo: youtube-controller:whitelist.

Componente ParentGate

Usar função utilitária em utils/mathChallenge.ts para gerar os desafios.

Comportamento:

Exibir a pergunta (“Quanto é 7 + 5?”).

Campo para resposta.

Botão “Entrar”.

Em caso de erro, exibir mensagem.

Em acerto, chamar onUnlocked() passado via props.

Componente YoutubePlayer

Receber ID do vídeo como prop.

Renderizar iframe do YouTube com esse vídeo.

Ajustar layout para ocupar bem a tela (estilo full-width / destaque).

Estilo global

Criar um layout simples em styles/globals.css.

Header com nome do app.

Botões claros e grandes para Pais e Filhos.

PWA

Adicionar manifest.json com:

name, short_name, ícones, start_url, display=standalone.

Configurar service worker via plugin de PWA do Vite (ou equivalente simples).

Garantir que a aplicação seja instalável como PWA.

frontend/README.md

Explicar:

Como instalar dependências (npm install ou yarn).

Como rodar (npm run dev etc.).

Como gerar build de produção.

Breve explicação da V1 Free.

PRIORIDADE 2 – Backend V2 (Premium, esqueleto)

Criar apenas o esqueleto do backend em Python com FastAPI, preparação para a versão Premium.

Stack backend

Python 3.11+ (ou versão recente)

FastAPI

SQLAlchemy (ORM)

Alembic (migrations, esqueleto)

PostgreSQL (modelo conceitual)

.env.example com:

DATABASE_URL

SECRET_KEY

JWT_EXPIRE_MINUTES

Endpoints (mínimo esqueleto)

Em api/v1:

GET /health

Retorna algo como { "status": "ok" }.

POST /auth/login

Placeholder que recebe credenciais fake e retorna um JWT fictício ou token estático.

Deixar TODO para implementação futura de autenticação real.

GET /whitelist

Retorna um objeto exemplo de whitelist em JSON.

Deixar comentário indicando que no futuro usará usuário autenticado e banco.

POST /whitelist

Recebe um JSON com whitelist e apenas faz log ou retorna eco.

Deixar TODO para persistir no banco.

Modelos e Schemas

models/user.py

Modelo User com campos básicos (id, email, plan).

models/video.py

Modelo Video com relation para User.

models/channel.py

Modelo Channel com relation para User.

Schemas correspondentes em schemas/user_schema.py, schemas/video_schema.py, schemas/channel_schema.py.

DB e Configuração

db/session.py: criar SessionLocal e engine.

db/base.py: importar os modelos.

core/config.py: carregar variáveis do .env.

core/security.py: helpers para JWT (podem ser simples ou TODO).

backend/README.md

Instruções para:

Criar virtualenv.

Instalar dependências.

Rodar uvicorn app.main:app --reload.

Informar que este backend é a base da versão Premium (ainda em desenvolvimento).

REGRAS GERAIS

Não modificar o conteúdo de docs/visao-produto.md.

Usar nomes de arquivos, funções e variáveis em inglês.

Comentar trechos importantes do código.

Manter código organizado em módulos, visando fácil evolução.

Quando necessário omitir detalhes repetitivos, explique claramente o padrão adotado.

FIM DO PROMPT