import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import { Input } from '@/components/common/Input'
import Button from '@/components/common/Button'
import styles from './Auth.module.css'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!formData.username || !formData.password) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        try {
            await login(formData.username, formData.password)
            navigate('/')
        } catch (err) {
            setError('Invalid username or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.authCard}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon} />
                    <span className={styles.logoText}>Linear</span>
                </div>

                <h1 className={styles.title}>Sign in to your account</h1>
                <p className={styles.subtitle}>Welcome back! Please enter your details.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && <div className={styles.error}>{error}</div>}

                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <Button type="submit" fullWidth loading={loading}>
                        Sign in
                    </Button>
                </form>

                <div className={styles.footer}>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </div>
            </div>
        </div>
    )
}
