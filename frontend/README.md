# YouTube Controller – Versão Free (V1)

Pequena PWA em React + TypeScript para criar uma lista branca de vídeos e canais do YouTube. Pais controlam o que é liberado; crianças só veem e assistem o que estiver salvo.

## Requisitos

- Node 18+
- npm

## Como rodar

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço mostrado no terminal (padrão: `http://localhost:5173`).  
Use `npm run build` para gerar arquivos estáticos.

## Como usar

- **Modo Pais (/pais):** passa pelo portão matemático, adiciona/remover vídeos e canais pelo ID do YouTube, clica em “Salvar e sair”. A whitelist fica no `localStorage` (`ytc:whitelist`).  
- **Modo Filhos (/filhos):** mostra apenas o que foi liberado. Clique em um vídeo para assistir no player embutido. Os canais abrem no YouTube em nova aba.  
- **Home:** acessos rápidos aos modos e aviso do Premium (placeholder).

## Instalar como PWA

1. Abra no navegador (Chrome/Edge/Brave).  
2. Clique em “Instalar app” ou no ícone de instalação na barra de endereço.  
3. Depois de instalado, o app roda em janela própria, com suporte offline básico (cache inicial via vite-plugin-pwa).
