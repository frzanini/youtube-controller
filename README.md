# YouTube Controller

Aplicacao de controle parental para YouTube, com duas modalidades:
- Versao Basica (Free): configuracao local por dispositivo.
- Versao Premium (Assinatura): sincronizacao em nuvem entre dispositivos.

## Estrutura do Repositorio

- `frontend/` – Aplicacao React + TypeScript (PWA)
- `backend/` – API em Python (FastAPI) para versao Premium
- `docs/` – Documentacao (visao, arquitetura, API, roadmap)
- `infra/` – Docker, docker-compose, manifests de deploy
- `.github/workflows/` – Pipelines de CI

## Como rodar (V1 – Frontend apenas)

```bash
cd frontend
npm install
npm run dev
```
