# YouTube Controller

Aplicação de controle parental para YouTube, com duas modalidades:
- Versão Básica (Free): configuração local por dispositivo.
- Versão Premium (Assinatura): sincronização em nuvem entre dispositivos.

## Estrutura do Repositório

- `frontend/` – Aplicação React + TypeScript (PWA)
- `backend/` – API em Python (FastAPI) para versão Premium
- `docs/` – Documentação (visão, arquitetura, API, roadmap)
- `infra/` – Docker, docker-compose, manifests de deploy
- `.github/workflows/` – Pipelines de CI

## Como rodar (V1 – Frontend apenas)

```bash
cd frontend
npm install
npm run dev
