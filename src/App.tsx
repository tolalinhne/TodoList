import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import MainLayout from '@/layouts/MainLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import TaskDetail from '@/pages/TaskDetail'

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

// Public Route wrapper (redirect if already logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner" />
            </div>
        )
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            {/* Protected routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="tasks/:id" element={<TaskDetail />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
