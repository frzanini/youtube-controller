# Documento de Visão – YouTube Controller

## 1. Identificação

- **Produto:** YouTube Controller  
- **Versão do Documento:** 1.0  
- **Data:** _(preencher)_  
- **Responsável:** _(preencher)_  

---

## 2. Contexto e Motivação

O YouTube é uma das principais fontes de entretenimento e aprendizado para crianças, porém é também um ambiente aberto, com grande variedade de conteúdos inadequados para determinadas faixas etárias.  

Pais e responsáveis frequentemente não possuem ferramentas simples e diretas para controlar **exatamente** o que os filhos podem assistir, ficando expostos a recomendações automáticas, algoritmos e conteúdos aleatórios.

O **YouTube Controller** nasce como uma solução de **controle parental e curadoria de conteúdo**, permitindo que os pais definam, de forma explícita, quais vídeos e canais do YouTube estarão disponíveis para os filhos em cada dispositivo.

---

## 3. Objetivo do Produto

O objetivo do YouTube Controller é:

> **Permitir que pais e responsáveis controlem, de forma simples e segura, quais vídeos e canais do YouTube podem ser acessados pelos filhos, oferecendo uma experiência de consumo filtrado e adequado ao contexto familiar.**

O produto será disponibilizado em duas modalidades:

1. **Versão Básica (Free):**  
   - Configuração local por dispositivo, sem necessidade de conta ou backend.
   - Ideal para uso individual em um único celular, tablet, PC ou Smart TV.

2. **Versão Premium (Assinatura – R$ 3,00/mês):**  
   - Uso de conta (login) para sincronizar as configurações entre múltiplos dispositivos.
   - Pais administram a lista de vídeos/canais permitidos centralmente e a mesma configuração é refletida em todos os dispositivos logados.

---

## 4. Público-Alvo

- Pais e responsáveis com filhos em idade infantil ou pré-adolescente.
- Famílias que desejam limitar o acesso das crianças apenas a conteúdos previamente aprovados.
- Contextos educativos (escolas, bibliotecas, salas de espera) que desejem disponibilizar conteúdo infantil controlado via YouTube.

---

## 5. Personas

### 5.1. Pai/Mãe – Administrador

- Deseja permitir que o filho use o YouTube de forma segura.
- Não quer lidar com configurações complexas.
- Quer ter certeza de que **apenas** conteúdos previamente escolhidos serão exibidos.
- Pode querer usar mais de um dispositivo (celular, tablet, TV, notebook).

### 5.2. Filho/Filha – Usuário Consumidor

- Acessa o aplicativo/tela para assistir vídeos.
- Não tem acesso às configurações de quais vídeos/canais estão liberados.
- Vê apenas uma lista de conteúdos aprovados pelos pais.
- Usa o app de forma intuitiva e visual, sem precisar digitar ou navegar no YouTube direto.

---

## 6. Visão Geral da Solução

O YouTube Controller será uma aplicação que atua como uma “camada de curadoria” sobre o YouTube:

- Os pais definem uma **whitelist** (lista de permissão) de vídeos e/ou canais.
- Os filhos navegam apenas nessa whitelist, por meio de uma interface simples.
- Os vídeos são reproduzidos via player do YouTube (embed), mas a descoberta e escolha do que assistir são controladas pelo app.

### 6.1. Modalidades de Uso

#### Versão Básica (Free – por dispositivo)

- Não requer login.
- As configurações são armazenadas **apenas no dispositivo** (via storage local).
- Cada dispositivo tem sua própria lista de vídeos/canais permitidos.
- Indicada para famílias que usam um ou poucos dispositivos, ou que não precisam de sincronização.

#### Versão Premium (Assinatura – R$ 3/mês)

- Requer login (ex.: conta Google ou e-mail/senha).
- Configurações são armazenadas em **backend Python** com banco de dados.
- Vários dispositivos logados na mesma conta compartilham a mesma whitelist.
- Pais podem configurar em um dispositivo e os filhos acessam em qualquer outro (ex.: celular + TV + tablet).

---

## 7. Funcionalidades Principais

### 7.1. Comuns às duas versões (Free e Premium)

1. **Tela Inicial**
   - Opções:
     - “Modo Pais”
     - “Modo Filhos”
     - “Entrar / Assinar Premium” (entrada para recursos pagos)

2. **Acesso Pais (Administração)**
   - Acesso protegido via **desafio aritmético simples** (ex.: 7 + 5 = ?).
   - Após passar pelo desafio, o responsável acessa o painel de configuração.
   - Funcionalidades:
     - Adicionar vídeo permitido (via URL ou ID do YouTube).
     - Adicionar canal permitido (via URL ou ID do canal).
     - Listar vídeos/canais atualmente liberados.
     - Remover vídeos/canais da lista.

3. **Modo Filhos (Consumo)**
   - Não exige login.
   - Exibe apenas vídeos/canais que estão na whitelist daquele contexto (local ou sincronizado).
   - Interface simplificada:
     - Lista de vídeos permitidos (miniaturas, títulos).
     - Possível agrupamento por canal.
   - Ao selecionar um vídeo:
     - Reproduzir em **tela cheia**, usando embed do YouTube.
     - Evitar navegação para fora da lista de vídeos permitidos.

4. **Encerramento de Sessão Admin**
   - Após o responsável salvar as configurações, a sessão de administração é encerrada.
   - O usuário volta para a tela inicial ou para o Modo Filhos.

---

### 7.2. Funcionalidades Específicas da Versão Básica (Free)

- Armazenamento das configurações **apenas no dispositivo**:
  - Uso de `localStorage` ou `IndexedDB`, conforme decisão técnica.
- Não há sincronização entre dispositivos.
- Se o app for acessado em outro dispositivo, terá uma configuração independente.

---

### 7.3. Funcionalidades Específicas da Versão Premium (Assinatura)

- **Login e Conta**
  - Cadastro/autenticação de conta do responsável (ex.: Google OAuth ou e-mail/senha).
  - Identificação do usuário no backend.

- **Sincronização em Nuvem**
  - Whitelist de vídeos e canais armazenada no servidor (backend Python).
  - Ao logar em qualquer dispositivo, o app sincroniza:
    - Lista de vídeos/canais permitidos.
    - Possível lista de dispositivos conectados (futuro).

- **Gestão de Assinatura**
  - Modelo de assinatura: R$ 3,00/mês por conta/família.
  - Regras de acesso premium atreladas ao status da assinatura.

- **Gestão de Dispositivos (Evolutivo)**
  - Possibilidade futura de listar e, se necessário, desconectar dispositivos da conta.

---

## 8. Regras de Negócio

1. **Proteção do Modo Pais**
   - O acesso ao painel de administração só pode ser feito após o responsável resolver corretamente uma conta aritmética simples.
   - Em caso de erro repetido, o sistema pode:
     - Exigir novo desafio.
     - Eventualmente aplicar um pequeno atraso (anti-tentativa da criança).

2. **Separação de Modos**
   - Modo Filhos não exibe nenhuma opção de configuração.
   - Não é permitido alternar diretamente de Modo Filhos para Modo Pais sem passar pelo desafio de proteção.

3. **Persistência de Configuração**
   - Free:
     - Configurações são armazenadas localmente e não são sincronizadas.
   - Premium:
     - Configurações são armazenadas e sincronizadas via backend, associadas à conta do responsável.

4. **Encerramento da Sessão Admin**
   - Ao salvar as alterações da whitelist, a sessão de administração é encerrada imediatamente.
   - O sistema retorna à tela inicial ou ao Modo Filhos.

5. **Conteúdo Disponível**
   - Apenas vídeos/canais presentes na whitelist podem ser exibidos no Modo Filhos.
   - A aplicação não deve permitir que o filho navegue no YouTube “aberto” a partir da interface do app.

---

## 9. Requisitos Não Funcionais

1. **Usabilidade**
   - Interface simples, intuitiva e amigável.
   - Foco em poucos cliques para acessar vídeo no Modo Filhos.
   - Painel dos pais com linguagem clara, sem termos técnicos complexos.

2. **Desempenho**
   - Carregamento rápido da lista de vídeos permitidos.
   - Player deve iniciar a reprodução em tempo adequado, considerando limitações da conexão do usuário.

3. **Segurança**
   - Proteção simples do modo admin via desafio aritmético.
   - Na versão Premium, autenticação segura (OAuth/JWT ou similar).
   - Comunicação segura com backend (HTTPS).

4. **Portabilidade**
   - Aplicação frontend como **PWA**, capaz de rodar em:
     - Navegador desktop.
     - Navegador mobile.
     - Alguns navegadores de Smart TVs.
   - Backend em Python com FastAPI, com possibilidade de containerização (Docker).

---

## 10. Arquitetura de Alto Nível

### 10.1. Versão Básica (Free – V1)

- **Frontend:**
  - React + TypeScript.
  - PWA com manifest e service worker.
  - Armazenamento local (`localStorage` ou `IndexedDB`).
- **Backend:**
  - Não há backend na V1 (somente hospedagem de arquivos estáticos).

### 10.2. Versão Premium (V2)

- **Frontend:**
  - Mesmo código-base React + TypeScript.
  - Habilita recursos de login/sync quando a conta premium está ativa.

- **Backend (Python):**
  - Framework: FastAPI.
  - Banco de dados: PostgreSQL (ou similar relacional).
  - Endpoints para:
    - Autenticação.
    - Gerenciamento de whitelist (vídeos/canais).
    - Sincronização de dados entre dispositivos.

---

## 11. Roadmap de Versões

- **V1 – MVP Free**
  - PWA React + TS.
  - Modo Pais com desafio aritmético.
  - Cadastro/local de vídeos/canais permitidos.
  - Modo Filhos com lista e player em tela cheia.
  - Armazenamento local por dispositivo.

- **V2 – Premium**
  - Backend Python (FastAPI + banco de dados).
  - Login (autenticação).
  - Sincronização de whitelist entre dispositivos.
  - Gestão de assinatura (R$ 3/mês).

- **V3 – Evolução**
  - Limite de tempo de tela por dia.
  - Relatório simples de consumo (vídeos mais assistidos).
  - Bloqueio por horário (ex.: depois das 22h).

---

## 12. Métricas de Sucesso (Indicativas)

- Número de dispositivos ativos usando a versão Free.
- Número de contas Premium ativas.
- Retenção mensal de usuários.
- Quantidade média de vídeos/canais configurados por família.
- Feedback de pais sobre facilidade de uso e sensação de segurança.

---

_Fim do Documento de Visão._
