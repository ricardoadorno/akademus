# Sprint 1: Structure and Access

## Sprint Goal

Establish the technical foundation with authentication and the ability to create the first knowledge "nodes", ensuring data is stored locally.

## Duration

2 weeks

## Total Points

11 points

---

## User Stories

### US-01: User Registration and Login

**As** a new user  
**I want** to create an account and login simply  
**So that** I can have a secure and personal space for my content

**Points:** 5 points

#### Acceptance Criteria

1. Registration form with email and password
2. Login form with email and password
3. After login, I'm redirected to my main map screen
4. Credentials are stored securely

#### Technical Tasks

- [ ] Configure authentication system
- [ ] Create registration screen with form validation
- [ ] Create login screen with validation
- [ ] Implement post-login redirection
- [ ] Configure secure credential storage
- [ ] Implement logout
- [ ] Add session validation

---

### US-02: Text Node Creation

**As** a logged-in user  
**I want** to create a text node in my mind map  
**So that** I can start recording my ideas and concepts

**Points:** 3 points

#### Acceptance Criteria

1. A button or double-click on screen creates a new node
2. I can type and edit text within the node
3. The node can be moved freely around the screen
4. Creation and editing work offline

#### Technical Tasks

- [ ] Create Canvas component for the mind map
- [ ] Implement node creation via double-click
- [ ] Create editable Node component
- [ ] Implement drag & drop for node movement
- [ ] Add button for manual node creation
- [ ] Implement inline text editing
- [ ] Ensure offline functionality

---

### US-03: Local Data Persistence

**As** a user  
**I want** my created nodes to be automatically saved on my device  
**So that** I can close and reopen the app without losing my work

**Points:** 3 points

#### Acceptance Criteria

1. When closing and reopening the app, all created nodes and their positions are loaded
2. Saving is local (local-first architecture)

#### Technical Tasks

- [ ] Configure IndexedDB or LocalStorage for persistence
- [ ] Implement auto-save for nodes
- [ ] Create data loading system on initialization
- [ ] Implement saving of node positions
- [ ] Add persistence error handling
- [ ] Create data structure for nodes

---

## Definition of Done (DoD)

### For each User Story:

- [ ] Code developed and reviewed
- [ ] Unit tests implemented
- [ ] Functionality manually tested
- [ ] All acceptance criteria met
- [ ] Functionality works offline
- [ ] Technical documentation updated

### For the Sprint:

- [ ] All user stories completed
- [ ] Functional app with three main features
- [ ] Data persists locally
- [ ] Authentication system functional
- [ ] Deploy to development environment

---

## Technical Architecture

### Suggested Stack

- **Frontend:** React/Vue.js + TypeScript
- **Canvas:** HTML5 Canvas or SVG
- **Persistence:** IndexedDB (via Dexie.js)
- **Authentication:** Firebase Auth or Supabase
- **Styling:** Tailwind CSS or Styled Components

### Data Structure

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "createdAt": "timestamp"
  },
  "nodes": [
    {
      "id": "string",
      "type": "text",
      "content": "string",
      "position": { "x": "number", "y": "number" },
      "isFlashcard": false,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

---

## Risks and Mitigations

| Risk                         | Probability | Impact | Mitigation                                   |
| ---------------------------- | ----------- | ------ | -------------------------------------------- |
| Canvas complexity            | Medium      | High   | Use ready-made library (Konva.js, Fabric.js) |
| Offline persistence issues   | Low         | High   | Extensive testing with IndexedDB             |
| Authentication configuration | Low         | Medium | Detailed provider documentation              |

---

## Sprint Deliverables

1. **Functional web app** with authentication
2. **Mind map interface** with node creation and editing
3. **Local persistence system** working
4. **Technical documentation** of implemented architecture
5. **Automated tests** for critical functionalities
