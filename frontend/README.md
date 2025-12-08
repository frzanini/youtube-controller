# YouTube Controller – Versao Free (V1)

PWA em React + TypeScript para controle parental: os pais liberam videos e canais e as criancas assistem apenas o que estiver permitido, direto no player interno.

## Requisitos

- Node 18+
- npm

## Como instalar e rodar

```bash
cd frontend
npm install
npm run dev
```

Acesse a URL exibida no terminal (padrao: `http://localhost:5173`).

## Como usar

- **Modo Pais (/pais):** passe pelo desafio matematico, busque conteudos (mock), autorize videos/canais ou adicione IDs manualmente, remova o que quiser e clique em "Salvar e sair". Tudo fica no `localStorage` (`ytc:whitelist`).
- **Modo Filhos (/filhos):** mostra apenas o que foi liberado. Clique em um video para abrir no player protegido. Nao ha buscas nem links externos.
- **Home (/):** atalhos para os modos e aviso do Premium.

## Player seguro

O player embute o video com sandbox, sem full screen externo, sem comentarios e sem links para abrir o YouTube fora do app.

## Instalar como PWA

1. Abra a aplicacao no navegador (Chrome/Edge/Brave).
2. Clique em "Instalar app" ou no icone de instalacao na barra.
3. O app passa a abrir em janela propria com cache inicial (via vite-plugin-pwa).
