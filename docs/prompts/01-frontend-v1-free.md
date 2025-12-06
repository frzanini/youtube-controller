# Prompt – Etapa 1 (Frontend V1 Free – YouTube Controller)

Este arquivo serve para armazenar o prompt que será enviado ao Codex/IA de código para gerar o **frontend completo da versão Free (V1)** do YouTube Controller.

---

## 📌 OBJETIVO DA ETAPA

Criar um projeto **React + TypeScript + PWA** com armazenamento local (**LocalStorage**) que permita:

- Pais adicionarem/removerem vídeos/canais permitidos
- Filhos assistirem somente vídeos liberados
- Nenhum backend necessário nesta fase
- Configuração salva por dispositivo

Funções Premium, login e backend ficam para a Etapa 2.

---

## 🔥 COMO USAR ESTE ARQUIVO

| Ação | O que fazer |
|---|---|
| **Salvar no Git** | Salvar **este arquivo completo** como `docs/prompts/01-frontend-v1-free.md` |
| **Enviar ao Codex** | Copiar **apenas** o texto entre `INÍCIO DO PROMPT PARA O CODEX` e `FIM DO PROMPT PARA O CODEX` |
| **Após geração do código** | Instalar dependências manualmente → `npm install` → `npm run dev` |

⚠ O **Codex NÃO instala pacotes**, apenas gera código.  
Você fará a instalação manual depois.

---

## ⬇ TEXTO QUE SERÁ ENVIADO AO CODEX

> Copiar apenas o bloco abaixo quando for gerar o código

---

### 🔻 INÍCIO DO PROMPT PARA O CODEX

Crie um projeto frontend para o produto **YouTube Controller – Versão Free (V1)** usando **React + TypeScript + PWA**, seguindo estritamente as especificações abaixo.

---

### 📁 Estrutura de Arquivos Obrigatória

Gerar **todos os arquivos com código completo**:

frontend/
├── README.md
├── package.json # apenas declarar dependências, não instalar
├── tsconfig.json
├── vite.config.ts
├── public/
│ ├── index.html
│ ├── manifest.json
│ └── icons/
│ └── pwa-icon.png # placeholder base64 ou svg simples
└── src/
      ├── main.tsx
      ├── App.tsx
      ├── styles/globals.css
      ├── utils/mathChallenge.ts
      ├── modules/
      │  ├── player/YoutubePlayer.tsx
      │  └── whitelist/
      │  ├── types.ts
      │  └── storageLocal.ts
      ├── components/
      │  ├── Header.tsx
      │  ├── ParentGate.tsx
      │  ├── VideoCard.tsx
      │  └── ChannelCard.tsx
      └── routes/
         ├─── Home.tsx
         ├─── Pais.tsx
         └─── Filhos.tsx

yaml
Copiar código

---

### 📦 `package.json` deve declarar dependências

Apenas **declarar**, NÃO executar instalação:

- react
- react-dom
- react-router-dom
- typescript
- vite
- @vitejs/plugin-react
- vite-plugin-pwa (configuração mínima para PWA)

---

### 📌 Especificações de Implementação

#### `storageLocal.ts`

- Usar `localStorage` com chave `"ytc:whitelist"`
- Exportar:

```ts
loadWhitelist(): WhitelistConfig
saveWhitelist(config: WhitelistConfig): void
Caso não exista whitelist, retornar listas vazias.

types.ts
ts
Copiar código
export interface AllowedVideo { id: string; label: string }
export interface AllowedChannel { id: string; label: string }
export interface WhitelistConfig {
  videos: AllowedVideo[]
  channels: AllowedChannel[]
}
mathChallenge.ts
Função para gerar desafio aritmético simples:

ts
Copiar código
export interface MathChallenge {
  question: string
  answer: number
}

export function generateMathChallenge(): MathChallenge { ... }
ParentGate.tsx
Exibir pergunta matemática

Input e botão "Entrar"

Se correto → onUnlock()

Se errado → avisar usuário

Pais.tsx
Usar ParentGate antes de mostrar painel

Após liberar acesso:

Adicionar/remover vídeos e canais

Salvar com saveWhitelist

Botão "Salvar e sair" → voltar para /

Filhos.tsx
Carregar whitelist

Exibir vídeos com VideoCard

Ao clicar → abrir YoutubePlayer (iframe YouTube)

Home.tsx
Botões grandes:

Modo Pais → /pais

Modo Filhos → /filhos

Premium (em breve) → apenas interface

Explicar brevemente o propósito

YoutubePlayer.tsx
Recebe videoId

Renderizar iframe embed

globals.css
Estilo simples, mobile-first

Botões grandes, boa legibilidade

📄 README.md deve conter
Como rodar o projeto

Como usar modo Pais/Filhos

Como instalar como PWA

Modelo recomendado:

arduino
Copiar código
npm install
npm run dev
Resultado esperado
Código completo gerado

Estrutura final impressa no final da resposta

🔺 FIM DO PROMPT PARA O CODEX
yaml
Copiar código

---

## Depois de usar o prompt no Codex você irá:

```bash
cd frontend
npm install
npm run dev
E testar no navegador. ✔

Quando quiser continuar
Me chame dizendo:

"Gerar Prompt Etapa 2 – Backend FastAPI Premium + Sincronização"

Fim do arquivo.