import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import { Input } from '@/components/common/Input'
import Button from '@/components/common/Button'
import styles from './Auth.module.css'

export default function Register() {
    const navigate = useNavigate()
    const { register } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!formData.username || !formData.email || !formData.password) {
            setError('Please fill in all fields')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try {
            await register(formData.username, formData.email, formData.password)
            navigate('/login')
        } catch (err) {
            setError('Registration failed. Username or email may already be taken.')
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

                <h1 className={styles.title}>Create an account</h1>
                <p className={styles.subtitle}>Start managing your projects today.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && <div className={styles.error}>{error}</div>}

                    <Input
                        label="Username"
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />

                    <Button type="submit" fullWidth loading={loading}>
                        Create account
                    </Button>
                </form>

                <div className={styles.footer}>
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    )
}
