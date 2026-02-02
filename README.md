# Linear Clone

A modern task management web application inspired by [Linear](https://linear.app), built with React, Vite, and TypeScript.

## ✨ Features

- **Task Management**: Create, view, update, and delete tasks
- **Status Tracking**: TODO, In Progress, Done, Canceled
- **Priority Levels**: Low, Medium, High, Urgent
- **Categories**: Organize tasks by category
- **Dark Theme**: Sleek Linear-inspired dark mode
- **Offline-First**: All data stored in localStorage - no backend required!
- **Keyboard Friendly**: Power-user focused UX

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **React Router** - Navigation
- **CSS Modules** - Scoped styling
- **localStorage** - Offline data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Button, Modal, Input
│   ├── layout/        # Sidebar, Header
│   └── task/          # TaskCard, CreateTaskModal
├── pages/             # Login, Register, Dashboard, TaskDetail
├── layouts/           # MainLayout
├── services/          # storage.ts (localStorage)
├── store/             # AuthContext
├── styles/            # Global CSS and design tokens
├── types/             # TypeScript interfaces
├── App.tsx
└── main.tsx
```

## 🎨 Design System

The app uses a Linear-inspired design with:
- **Colors**: Dark theme with purple accent (#5e6ad2)
- **Typography**: Inter font family
- **Spacing**: 4px base unit
- **Animations**: Smooth 150-200ms transitions

## 💾 Data Storage

All data is stored in the browser's localStorage:
- `linear_tasks` - Array of tasks
- `linear_categories` - Array of categories
- `linear_user` - Current user info

Data persists across browser sessions and works completely offline.

## 📄 License

MIT
