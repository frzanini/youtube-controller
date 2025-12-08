Documento de Visão do Produto — YouTube Controller

(Versão Revisada e Consolidada)


1. Introdução

O YouTube Controller é um aplicativo de controle parental projetado exclusivamente para permitir que crianças assistam a vídeos previamente autorizados pelos pais.
Toda a arquitetura da solução impede qualquer forma de acesso direto ao YouTube tradicional, bem como a canais, buscas, perfis, playlists, recomendações automáticas ou qualquer tipo de navegação externa.

O aplicativo funciona como um ambiente fechado e seguro, onde apenas conteúdos previamente selecionados e aprovados pelos responsáveis podem ser exibidos.
Este documento descreve a visão completa do produto, incluindo público-alvo, funcionalidades, regras de negócio, jornadas de uso, requisitos, limitações e critérios de aceite.

2. Problema

Pais e responsáveis enfrentam inúmeros desafios ao permitir que crianças utilizem plataformas abertas de vídeo como o YouTube:

Acesso a vídeos inadequados para a idade.

Recomendações automáticas que levam a conteúdos indesejados.

Exposição a canais não supervisionados.

Dificuldade de controlar o que realmente está sendo assistido.

Falta de ferramentas simples para aprovação de conteúdo.

Esses fatores geram insegurança e tornam o ambiente digital imprevisível para crianças pequenas.

3. Objetivo do Produto

O objetivo central do YouTube Controller é garantir que a criança assista somente aos vídeos liberados pelos pais, dentro de um player interno seguro e sem qualquer possibilidade de navegação externa.

O produto deve assegurar:

Zero acesso ao YouTube aberto ou a outras plataformas de streaming.

Zero chance de navegação livre — nada além da whitelist pode ser exibido.

Reprodução apenas de conteúdos aprovados pelos responsáveis.

Ocultação de qualquer botão que leve ao app do YouTube.

Ambiente infantil simples, reduzido, sem distrações e sem riscos.

Ferramentas para que os pais pesquisem, selecionem e autorizem vídeos e canais.

Assim, o aplicativo opera como um cofre de vídeos curados, um "mini-YouTube privado", onde só existe o que o responsável autorizou.

4. Escopo
4.1. Escopo Incluído

Modo Pais (administração completa).

Modo Filhos (consumo restrito).

Player interno protegido.

Controle de whitelist de vídeos e canais.

Busca interna por vídeos e canais via API do YouTube.

Bloqueio total de navegação externa.

Armazenamento local seguro.

Interface simplificada para crianças.

4.2. Escopo Excluído

Impedir que a criança saia do app pelo sistema operacional.

Impedir o uso de outros apps do dispositivo.

Login online (versão inicial).

Sincronização em nuvem.

5. Público-Alvo

Pais que desejam controle rígido de conteúdo audiovisual.

Crianças entre 3 e 12 anos.

Escolas, creches, igrejas e instituições que necessitam de exibição segura.

6. Visão Geral da Solução

O YouTube Controller opera em dois modos principais:

6.1. Modo Pais

Área protegida por senha ou desafio matemático.

Pesquisa integrada (canais e vídeos).

Autorização individual ou por canal.

Gerenciamento completo da whitelist.

Remoção e revisão de permissões.

6.2. Modo Filhos

Ambiente totalmente fechado.

Lista visível contém apenas vídeos aprovados.

Sem campo de busca.

Sem recomendação, comentários, canais ou playlists.

Player interno sem acesso externo.

Sem botões de “Abrir no YouTube”.

7. Funcionalidades
7.1. Funcionalidades Comuns

Armazenamento local da whitelist.

UI responsiva e amigável.

Player interno com travas de navegação.

Exibição apenas de conteúdos liberados.

7.2. Funcionalidades do Modo Pais
7.2.1. Proteção de acesso

Senha ou desafio matemático.

Prevenção contra acesso infantil indevido.

7.2.2. Busca Integrada

O administrador poderá:

Pesquisar vídeos por título, palavra-chave ou ID.

Pesquisar canais por nome.

Visualizar resultados com miniatura, título, canal e duração.

Autorizar vídeos individuais ou canais completos com 1 clique.

Ver o que já está autorizado.

7.2.3. Gerenciamento da Whitelist

Listar vídeos e canais permitidos.

Remover permissões.

Atualizar metadados (miniatura, nome, duração).

7.3. Funcionalidades do Modo Filhos

Exibir apenas vídeos autorizados.

Player interno sem botões externos.

Autoplay restrito apenas à whitelist.

Interface limpa, adequada para crianças pequenas.

8. Regras de Negócio
8.1. Conteúdo Liberado

Somente vídeos e canais aprovados podem ser exibidos.

Nenhum vídeo relacionado, recomendado ou automático deve aparecer.

A solução deve funcionar como uma bolha segura.

8.2. Proibição de Navegação Externa

O app não deve permitir acesso ao YouTube nativo.

Nenhum botão deve levar a apps externos.

Links, sugestões ou telas finais não podem abrir o YouTube.

8.3. Player Interno

Não pode apresentar controles que permitam deixar o ambiente seguro.

Deve tocar apenas conteúdos da whitelist.

8.4. Modo Pais

Apenas responsáveis autenticados podem alterar permissões.

Busca deve respeitar as limitações da API oficial.

9. Requisitos Não Funcionais

Aplicativo leve, rápido e responsivo.

UX simplificada para crianças pequenas.

Armazenamento local criptografado (quando suportado).

Player estável, com alta disponibilidade.

Compatibilidade com APIs oficiais do YouTube.

10. Jornada do Usuário
10.1. Jornada do Pai

Abre o app.

Autentica no Modo Pais.

Pesquisa vídeos/canais.

Autoriza o conteúdo desejado.

Alterna para Modo Filhos.

A criança assiste apenas o conteúdo liberado.

10.2. Jornada da Criança

Abre o app já em Modo Filhos.

Vê somente vídeos autorizados.

Assiste dentro do player interno.

Não consegue acessar nada além disso.

11. Restrições

Algumas limitações da API do YouTube podem restringir funcionalidades.

Elementos específicos do player podem variar conforme versão da API.

O app não controla o dispositivo fora de si.

Se a criança fechar o app manualmente, o controle passa para o sistema operacional.

12. Critérios de Aceite

A criança nunca consegue abrir o YouTube nativo a partir do app.

Nenhum vídeo não autorizado aparece.

Busca operacional com resultados válidos.

Modo Pais protegido.

Player interno sem botões externos.

Whitelist funcionando perfeitamente.

13. Futuras Extensões

Sincronização em nuvem.

Perfis por filho.

Tempo diário de uso.

Estatísticas para os pais.

Integração com ferramentas de controle do sistema operacional.

14. Conclusão

O YouTube Controller estabelece um novo padrão de segurança e controle parental.
Ao criar um ambiente audiovisual totalmente fechado, baseado apenas em vídeos aprovados pelos responsáveis, o aplicativo elimina riscos comuns do YouTube aberto e proporciona uma experiência segura, confiável e alinhada às expectativas das famílias.

O produto é, portanto, um aplicativo exclusivamente dedicado a assistir vídeos previamente autorizados, funcionando como um espaço protegido e supervisionado.