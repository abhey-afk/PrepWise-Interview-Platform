# 🎯 PrepWise Interview Platform

<div align="center">

![PrepWise Logo](public/logo.svg)

**AI-Powered Voice Interview Preparation Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![VAPI](https://img.shields.io/badge/VAPI-Voice_AI-purple?style=for-the-badge)](https://vapi.ai/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-Authentication-orange?style=for-the-badge&logo=auth0)](https://next-auth.js.org/)

[🚀 Live Demo](#) • [📖 Documentation](#installation) • [🐛 Report Bug](#contributing) • [💡 Request Feature](#contributing)

</div>

---

## 🌟 Features

### 🎤 **AI-Powered Voice Interviews**
- Real-time voice conversations with AI interviewer
- Natural language processing for dynamic responses
- Professional interview simulation experience

### 🧠 **Smart Question Generation**
- AI-generated questions based on role and tech stack
- Customizable difficulty levels (Junior, Mid, Senior)
- Focus on behavioral vs technical questions

### 📊 **Comprehensive Feedback System**
- Detailed performance analysis
- Category-wise scoring (Communication, Technical, Problem Solving, etc.)
- Actionable improvement suggestions

### 🔐 **Secure Authentication**
- NextAuth.js integration with Google OAuth
- Secure session management
- User profile and progress tracking

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Dark/Light theme support
- Intuitive user interface

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database | AI/Voice | Authentication |
|----------|---------|----------|----------|---------------|
| ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js) | ![Node.js](https://img.shields.io/badge/Node.js-green?style=flat&logo=node.js) | ![MongoDB](https://img.shields.io/badge/MongoDB-green?style=flat&logo=mongodb) | ![VAPI](https://img.shields.io/badge/VAPI-purple?style=flat) | ![NextAuth](https://img.shields.io/badge/NextAuth.js-orange?style=flat) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript) | ![API Routes](https://img.shields.io/badge/API_Routes-gray?style=flat) | ![Mongoose](https://img.shields.io/badge/Mongoose-red?style=flat) | ![Google AI](https://img.shields.io/badge/Google_AI-blue?style=flat&logo=google) | ![Google OAuth](https://img.shields.io/badge/Google_OAuth-red?style=flat&logo=google) |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-cyan?style=flat&logo=tailwindcss) | | | | |

</div>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- VAPI account and API keys
- Google Cloud Console project (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhey-afk/PrepWise-Interview-Platform.git
   cd PrepWise-Interview-Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI="your_mongodb_connection_string"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3001"
   
   # Google AI
   GOOGLE_GENERATIVE_AI_API_KEY="your_google_ai_api_key"
   
   # VAPI Configuration
   NEXT_PUBLIC_VAPI_WEB_TOKEN="your_vapi_web_token"
   NEXT_PUBLIC_VAPI_WORKFLOW_ID="your_vapi_workflow_id"
   NEXT_PUBLIC_VAPI_ASSISTANT_ID="your_vapi_assistant_id"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3001](http://localhost:3001)

---

## 🔧 Configuration

### VAPI Setup

1. Create a VAPI account at [vapi.ai](https://vapi.ai)
2. Create an assistant with the following configuration:
   - **Voice Provider**: 11Labs (Sarah voice recommended)
   - **Model**: OpenAI GPT-4
   - **Transcriber**: Deepgram Nova-2
3. Set up variable substitution for `{{questions}}` in your assistant prompt
4. Copy your assistant ID and web token to `.env.local`

### MongoDB Setup

1. Create a MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Whitelist your IP address
4. Copy the connection string to `MONGODB_URI` in `.env.local`

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

---

## 🏗️ Project Structure

```
PrepWise-Interview-Platform/
├── 📁 app/                    # Next.js 13+ App Router
│   ├── 📁 (auth)/            # Authentication pages
│   ├── 📁 (root)/            # Main application pages
│   └── 📁 api/               # API routes
├── 📁 components/            # Reusable React components
│   ├── 📁 ui/               # UI components (shadcn/ui)
│   └── 📄 Agent.tsx         # VAPI voice agent component
├── 📁 lib/                  # Utility functions and configurations
│   ├── 📁 actions/          # Server actions
│   ├── 📁 models/           # MongoDB schemas
│   ├── 📄 auth.ts           # NextAuth configuration
│   ├── 📄 mongodb.ts        # Database connection
│   └── 📄 vapi.sdk.ts       # VAPI SDK setup
├── 📁 public/               # Static assets
├── 📁 types/                # TypeScript type definitions
└── 📄 .env.local           # Environment variables (not in repo)
```

---

## 🎯 Usage

### 1. **Sign Up/Login**
   - Use Google OAuth to create an account or sign in
   - Your progress and interview history will be saved

### 2. **Create Interview**
   - Select job role (Frontend, Backend, Full Stack, etc.)
   - Choose experience level (Junior, Mid, Senior)
   - Pick tech stack relevant to the position
   - Set interview focus (Technical vs Behavioral)

### 3. **Start Voice Interview**
   - Click "Start Interview" to begin voice session
   - Speak naturally with the AI interviewer
   - Answer questions as you would in a real interview

### 4. **Review Feedback**
   - Get detailed analysis of your performance
   - View scores across different categories
   - Read personalized improvement suggestions

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 **Bug Reports**
- Use the issue tracker to report bugs
- Include steps to reproduce the issue
- Provide environment details

### 💡 **Feature Requests**
- Suggest new features via issues
- Explain the use case and benefits
- Discuss implementation approaches

### 🔧 **Pull Requests**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[VAPI](https://vapi.ai)** - For voice AI capabilities
- **[Google AI](https://ai.google.dev)** - For question generation
- **[Next.js](https://nextjs.org)** - For the amazing React framework
- **[MongoDB](https://mongodb.com)** - For database solutions
- **[Tailwind CSS](https://tailwindcss.com)** - For styling
- **[shadcn/ui](https://ui.shadcn.com)** - For UI components

---

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Abhey](https://github.com/abhey-afk)

</div>
