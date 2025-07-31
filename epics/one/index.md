Épico 1: Fundação do Cérebro Individual (MVP Core)
Objetivo Geral: Permitir que um usuário se cadastre, crie anotações visuais em um mapa mental, transforme essas anotações em flashcards e revise-as em um modo de prática. Tudo isso funcionando de forma offline, garantindo a proposta de valor do "Modo Bunker" desde o início.
Sprint 1: Estrutura e Acesso
Meta: Estabelecer a base técnica com autenticação e a capacidade de criar os primeiros "nós" de conhecimento, garantindo que os dados sejam armazenados localmente.
Estória de Usuário
Critérios de Aceite
Pontuação Estimada
EU-01: Cadastro e Login de Usuário <br> Como um novo usuário, eu quero criar uma conta e fazer login de forma simples, para que eu possa ter um espaço seguro e pessoal para meu conteúdo.

1. Formulário de cadastro com email e senha. <br> 2. Formulário de login com email e senha. <br> 3. Após o login, sou direcionado para a tela principal do meu mapa. <br> 4. As credenciais são armazenadas de forma segura.
   5 pontos
   EU-02: Criação de Nó de Texto <br> Como um usuário logado, eu quero criar um nó de texto no meu mapa mental, para que eu possa começar a registrar minhas ideias e conceitos.
1. Um botão ou duplo-clique na tela cria um novo nó. <br> 2. Posso digitar e editar texto dentro do nó. <br> 3. O nó pode ser movido livremente pela tela (canvas). <br> 4. A criação e edição funcionam offline.
   3 pontos
   EU-03: Persistência de Dados Local <br> Como usuário, quero que meus nós criados sejam salvos automaticamente no meu dispositivo, para que eu possa fechar e abrir o app sem perder meu trabalho.
1. Ao fechar e reabrir o app, todos os nós criados e suas posições são carregados. <br> 2. O salvamento é local (local-first architecture).
   3 pontos
   Total de Pontos da Sprint:

11 pontos

Sprint 2: O Loop de Prática Ativa
Meta: Implementar a funcionalidade "core" que transforma anotações passivas em material de estudo ativo, validando o job de "Prática".
Estória de Usuário
Critérios de Aceite
Pontuação Estimada
EU-04: Conversão de Nó em Flashcard <br> Como um estudante, eu quero converter um nó de texto em um flashcard (frente e verso), para que eu possa testar minha memorização de forma ativa.

1. Na interface de um nó, existe uma opção para "Converter em Flashcard". <br> 2. A UI permite que eu defina qual parte do texto é a "Frente" e qual é o "Verso". <br> 3. O nó ganha uma indicação visual de que agora também é um flashcard.
   5 pontos
   EU-05: Modo de Prática Básico <br> Como estudante, quero iniciar uma "playlist" de revisão que me apresente os flashcards criados, um de cada vez, para que eu possa praticar ativamente o que anotei.
1. Um botão "Praticar" na tela principal inicia a sessão. <br> 2. A sessão puxa todos os nós que foram convertidos em flashcards. <br> 3. A UI mostra a "Frente" do flashcard. <br> 4. Um botão "Revelar Resposta" mostra o "Verso". <br> 5. Botões para navegar para o próximo cartão ou finalizar a sessão.
   5 pontos
   Total de Pontos da Sprint:

10 pontos

Sprint 3: Conexão e Diferenciação
Meta: Finalizar o MVP adicionando a conexão visual entre ideias e implementando o pilar estratégico "Modo Bunker", reforçando os jobs de "Organização" e "Foco".
Estória de Usuário
Critérios de Aceite
Pontuação Estimada
EU-06: Conexão Visual Entre Nós <br> Como um usuário, eu quero criar uma conexão visual (linha/seta) entre dois nós no meu mapa, para que eu possa organizar e entender as relações entre os conceitos.

1. Consigo iniciar uma conexão a partir de um nó. <br> 2. Consigo ligar essa conexão a outro nó. <br> 3. A linha de conexão permanece visível e se ajusta quando os nós são movidos. <br> 4. A conexão é salva e persiste ao reabrir o app.
   8 pontos
   EU-07: Garantia de Funcionalidade Offline <br> Como um usuário, eu quero que todas as funcionalidades (criar/conectar nós, converter/praticar flashcards) funcionem 100% offline, para que eu possa estudar em qualquer lugar, sem distrações.
1. Testar todas as funcionalidades das Sprints 1 e 2 com a conexão de internet desativada. <br> 2. Nenhuma funcionalidade essencial deve quebrar ou ficar indisponível.
   3 pontos
   EU-08: Exportação para Backup Local <br> Como um usuário, eu quero poder exportar meu mapa como um backup local em um formato aberto, para que eu sinta segurança sobre a posse dos meus dados.
1. Uma opção no menu permite "Exportar/Fazer Backup". <br> 2. A exportação gera um único arquivo local (ex: JSON ou Markdown) contendo os dados dos nós e suas conexões.
   3 pontos
   Total de Pontos da Sprint:

14 pontos

Questões Abertas / Definições Necessárias
Autenticação: Qual provedor de identidade será utilizado (Firebase Auth, Supabase, Auth0) ou será uma solução própria?
UI/UX: Existe um protótipo de UI (Figma) para o Mapa Mental e a interação de conexão de nós?
Simplificação do MVP: Confirmar a decisão de adiar a funcionalidade de "Quiz" para um épico futuro, focando o MVP exclusivamente em Flashcards.
