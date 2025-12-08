Prompt – Etapa 1 (Frontend V1 Free – YouTube Controller)

Versão atualizada conforme Documento de Visão do Produto

Este arquivo armazena o prompt que será enviado ao mecanismo de geração de código (Codex/IA) para criar o frontend completo da Versão Free (V1) do YouTube Controller, agora atualizado com todas as diretrizes formais definidas no novo Documento de Visão do Produto.

📌 OBJETIVO DA ETAPA

Criar um frontend React + TypeScript + PWA, totalmente local (sem backend), que implemente:

✔ Modo Pais (Administração)

Protegido por desafio matemático

Gestão da Whitelist:

vídeos permitidos

canais permitidos

Nova feature: busca integrada de vídeos e canais

Autorização de vídeo ou canal com 1 clique

Salvamento local via localStorage

✔ Modo Filhos (Consumo Infantil)

Interface extremamente simples

Exibe somente vídeos autorizados

Player interno com:

Sem abrir YouTube externo

Sem recomendações

Sem comentários

Sem navegação lateral

Nenhum acesso ao YouTube aberto

✔ Sem backend — toda configuração é local por dispositivo
🔥 COMO USAR ESTE ARQUIVO
Ação	O que fazer
Salvar no Git	Salvar como docs/prompts/01-frontend-v1-free.md
Enviar ao Codex	Copiar apenas o bloco entre INÍCIO DO PROMPT PARA O CODEX e FIM DO PROMPT PARA O CODEX
Após gerar o código	Executar manualmente: npm install → npm run dev

⚠ O Codex NÃO instala pacotes.
Você fará isso manualmente.

⬇ TEXTO QUE SERÁ ENVIADO AO CODEX

Copiar apenas o bloco abaixo quando for gerar o código.

🔻 INÍCIO DO PROMPT PARA O CODEX

Crie um projeto completo para o produto
YouTube Controller – Versão Free (V1)
usando React + TypeScript + PWA, seguindo estritamente as especificações abaixo.

O objetivo é implementar:

Controle parental rigoroso

Modo Pais com busca e gerenciamento de permissões

Modo Filhos com ambiente totalmente restrito

Player interno protegido

Configuração salva via localStorage

Sem acesso ao YouTube aberto

📁 Estrutura de Arquivos Obrigatória

Gerar todos os arquivos com código completo:

frontend/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── icons/
│       └── pwa-icon.png
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── styles/globals.css
    ├── utils/mathChallenge.ts
    ├── modules/
    │   ├── player/YoutubePlayer.tsx
    │   └── whitelist/
    │       ├── types.ts
    │       └── storageLocal.ts
    ├── components/
    │   ├── Header.tsx
    │   ├── ParentGate.tsx
    │   ├── VideoCard.tsx
    │   ├── ChannelCard.tsx
    │   └── SearchBar.tsx        # NOVO
    └── routes/
        ├── Home.tsx
        ├── Pais.tsx
        └── Filhos.tsx

📦 package.json — dependências declaradas (não instalar)

react

react-dom

react-router-dom

typescript

vite

@vitejs/plugin-react

vite-plugin-pwa

📌 Especificações de Implementação (atualizadas)
🔐 ParentGate.tsx – Controle Parental

Exibir desafio matemático simples

Input + Botão "Entrar"

Se resposta correta → libera Modo Pais

Se incorreta → mensagem de erro

🧠 mathChallenge.ts
export interface MathChallenge {
  question: string
  answer: number
}

export function generateMathChallenge(): MathChallenge

💾 storageLocal.ts – Armazenamento Local

Usar localStorage na chave "ytc:whitelist"

Exportar:

loadWhitelist(): WhitelistConfig
saveWhitelist(config: WhitelistConfig): void


Se não existir whitelist → retornar listas vazias.

🗂 types.ts
export interface AllowedVideo { id: string; label: string }
export interface AllowedChannel { id: string; label: string }

export interface WhitelistConfig {
  videos: AllowedVideo[]
  channels: AllowedChannel[]
}

🔍 Nova Feature – Busca de Vídeos e Canais (Modo Pais)

Criar componente:

components/SearchBar.tsx

Input de texto

Botão "Buscar"

Ao buscar, consumir API pública do YouTube (simular por ora, com dados mockados)

Retornar lista de resultados

Cada resultado deve ter botão:

"Autorizar Vídeo"

"Autorizar Canal"

Regras:

A busca não existe no Modo Filhos

Apenas pais autenticados podem buscar

Resultados devem exibir:

thumbnail

título

canal

duração

🧰 Pais.tsx – Modo Pais

Fluxo esperado:

Exibir ParentGate

Após autenticação:

Exibir SearchBar

Exibir vídeos autorizados

Exibir canais autorizados

Botões:

adicionar vídeo

adicionar canal

remover itens da whitelist

"Salvar e sair" → retorna ao Home

Salvar tudo via saveWhitelist()

🎮 Filhos.tsx – Modo Filhos

Carregar whitelist

Exibir somente os vídeos autorizados

Sem barra de busca

Cada vídeo → VideoCard

Ao clicar → abrir YoutubePlayer no modo protegido

🎥 YoutubePlayer.tsx – Player Interno Protegido

Requisitos:

Receber videoId

Renderizar <iframe> embed

Desabilitar qualquer interação que leve ao YouTube externo

Não permitir abrir no app nativo

Não permitir recomendações externas

Sem comentários

Sem playlists laterais

Deve manter a criança dentro do app

🏠 Home.tsx

Três botões grandes:

Modo Pais → /pais

Modo Filhos → /filhos

Premium (em breve) → apenas visual

Explicar resumidamente o propósito:

"Este aplicativo permite que crianças assistam somente conteúdos autorizados pelos pais."

🎨 globals.css

Visual leve e mobile-first

Botões grandes

Tipografia clara

Layout simples para crianças

📄 README.md deve conter

Como instalar

Como rodar

Como usar Modo Pais e Modo Filhos

Como instalar como PWA

Exemplo:

npm install
npm run dev

🎯 Resultado esperado

Todo o código gerado

Estrutura completa exibida no final

App funcional com:

Modo Pais seguro

Busca de vídeos/canais

Whitelist

Modo Filhos restrito

Player seguro

Sem acesso ao YouTube externo

🔺 FIM DO PROMPT PARA O CODEX
Após usar o prompt no Codex
cd frontend
npm install
npm run dev


Testar no navegador e validar:

Controle parental

Busca

Player interno

Whitelist

Ausência total de navegação externa