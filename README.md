# Widget de IA Integrado

Projeto de widget de IA personalizável com integração Firebase (banco principal) e MySQL (backup), utilizando Cohere AI para geração de respostas.

## Visão Geral

Sistema que permite:
- Cadastro de usuários admin e clientes
- Personalização do comportamento da IA
- Geração de widget para implementação em sites


##  Tecnologias Utilizadas

- **Frontend**: Next.js (Pages Router)
- **Backend**: API Routes (Next.js)
- **Banco Principal**: Firebase Firestore
- **Banco Secundário**: MySQL
- **IA**: Cohere AI
- **Autenticação**: Firebase Auth
- **Widget**: JavaScript vanilla embedável

##  Estrutura do Projeto
/src
├── /pages
│ ├── /api
│ │ ├── /auth - Endpoints de autenticação
│ │ ├── /ia - Endpoints de configuração da IA
│ │ └── /widget - Endpoints do widget
├── /lib
│ ├── /db - Conexões com bancos de dados
│ ├── /services - Lógica de negócios
│ └── /utils - Utilitários
/public
│ └── /widget - Arquivos estáticos do widget



## 🔧 Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Mariquinha327/Testar_Api.git
   cd seu-projeto
Instale as dependências:

npm install
Configure as variáveis de ambiente (.env.local):

env
# Firebase
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
FIREBASE_PROJECT_ID=xxx
FIREBASE_STORAGE_BUCKET=xxx.appspot.com
FIREBASE_MESSAGING_SENDER_ID=xxx
FIREBASE_APP_ID=xxx

# MySQL
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=xxx
MYSQL_DATABASE=ai_widget

# Cohere AI
COHERE_API_KEY=xxx


# Inicie o servidor de desenvolvimento:
npm run dev


# Endpoints da API
Autenticação
POST /api/auth/register - Registra novo usuário

json
{
  "email": "user@example.com",
  "password": "senhasegura",
  "role": "client"
}


# Configuração da IA
PUT /api/ia/customize - Personaliza o comportamento da IA

json
{
  "userId": "1748971955502",
  "personality": "amigável",
  "greeting_message": "Olá! Como posso ajudar?",
  "color_scheme": "#4f46e5"
}



# Widget
GET /api/widget/generate?userId=1748971955502 - Gera código de embed

json
{
  "widgetUrl": "http://localhost:3000/widget/script.js?userId=1748971955502,
  "embedCode": "<script src='...' defer></script>"
}


# Implementação do Widget
Para implementar o widget em qualquer site:


<script src="URL_DO_SEU_WIDGET" defer></script>
O widget aparecerá no canto inferior direito da página.

# Testando a API
Use o Postman para testar os endpoints

Importe a coleção do Postman

Execute os fluxos:

Registrar usuário

Personalizar IA

Gerar widget

Testar widget
