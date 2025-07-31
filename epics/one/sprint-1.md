# Sprint 1: Estrutura e Criação para o Professor

## Sprint Goal

Estabelecer a fundação do Academus, permitindo que a **Professora Ana** (nossa persona criadora) se autentique, crie a estrutura de um "Curso" e adicione seus primeiros "Nós" de conhecimento em texto. O objetivo é validar o primeiro passo do nosso JTBD principal: "Quero transformar meu conteúdo em recursos de estudo sem retrabalho".

**Duração:** 2 semanas  
**Total de Pontos:** 8 pontos

---

## User Stories

### US-01: Autenticação do Professor

> **Como uma** Professora  
> **Eu quero** criar uma conta e fazer login de forma simples  
> **Para que** eu possa criar e gerenciar meus cursos em um espaço privado e seguro.

**Pontos:** 4

#### Critérios de Aceite

1. Formulário de cadastro com e-mail e senha.
2. Formulário de login com e-mail e senha.
3. Após o login, sou direcionada para um dashboard inicial onde posso ver meus cursos.
4. As credenciais são armazenadas de forma segura.
5. O sistema implementa validação de sessão para manter o usuário logado.

---

### US-02: Estrutura do Curso

> **Como uma** Professora  
> **Eu quero** criar um "Curso" para agrupar meus Nós de conhecimento  
> **Para que** eu possa organizar meu material didático por matéria, turma ou tópico.

**Pontos:** 1

#### Critérios de Aceite

1. No meu dashboard, existe um botão para "Criar Novo Curso".
2. Ao criar, posso dar um nome ao curso (ex: "Biologia Celular - Turma 101").
3. O novo curso aparece na minha lista de cursos no dashboard.

---

### US-03: Criação de Nó de Conhecimento

> **Como uma** Professora  
> **Eu quero** criar um "Nó" de conhecimento em formato de texto dentro de um curso  
> **Para que** eu possa começar a construir o conteúdo modular para minhas aulas.

**Pontos:** 3

#### Critérios de Aceite

1. Dentro da página de um curso, existe um botão para "Adicionar Nó".
2. Um novo Nó é criado com um editor de texto simples (plain text para o MVP).
3. O conteúdo do Nó é salvo automaticamente (local-first).
4. Ao recarregar a página, os Nós criados permanecem visíveis dentro do curso correto.

---

## Definition of Done (DoD)

### Para cada User Story:

- [ ] Código desenvolvido, revisado e mergeado na branch principal.
- [ ] Testes unitários implementados para a lógica de negócio.
- [ ] Funcionalidade testada manualmente no ambiente de desenvolvimento.
- [ ] Todos os critérios de aceite foram cumpridos.

### Para a Sprint:

- [ ] Todas as User Stories foram concluídas e aceitas.
- [ ] O fluxo "Login -> Criar Curso -> Adicionar Nós" está funcional.
- [ ] Os dados de cursos e nós persistem localmente.
- [ ] A build da aplicação é implantada no ambiente de desenvolvimento.

---

## Estrutura de Dados (Revisada)

```json
{
  "user": {
    "id": "uuid",
    "email": "string",
    "role": "professor"
  },
  "courses": [
    {
      "id": "uuid",
      "owner_id": "uuid",
      "title": "string"
    }
  ],
  "nodes": [
    {
      "id": "uuid",
      "course_id": "uuid",
      "type": "text",
      "content": "string",
      "isFlashcard": false,
      "isQuizItem": false
    }
  ]
}
```
