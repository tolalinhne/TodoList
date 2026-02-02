import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import { categoryStorage } from '@/services/storage'
import type { Category } from '@/types'
import styles from './Sidebar.module.css'

export default function Sidebar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        const cats = categoryStorage.getAll()
        setCategories(cats)
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const getInitials = (name: string) => {
        return name.slice(0, 2).toUpperCase()
    }

    return (
        <aside className={styles.sidebar}>
            {/* Logo */}
            <div className={styles.logo}>
                <div className={styles.logoIcon} />
                <span className={styles.logoText}>Linear Clone</span>
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                {/* Main Navigation */}
                <div className={styles.navSection}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        <svg className={styles.navIcon} viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2 2h5v5H2V2zm0 7h5v5H2V9zm7-7h5v5H9V2zm0 7h5v5H9V9z" />
                        </svg>
                        My Issues
                    </NavLink>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                    <div className={styles.navSection}>
                        <div className={styles.navSectionTitle}>Categories</div>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={styles.navItem}
                                onClick={() => navigate(`/?category=${category.id}`)}
                            >
                                <span className={styles.categoryDot} />
                                {category.name}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* User Section */}
            <div className={styles.userSection}>
                <div className={styles.userButton}>
                    <div className={styles.userAvatar}>
                        {user ? getInitials(user.username) : '?'}
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{user?.username}</div>
                        <div className={styles.userEmail}>{user?.email}</div>
                    </div>
                </div>
                <button
                    className={styles.navItem}
                    onClick={handleLogout}
                    style={{ marginTop: 'var(--space-2)' }}
                >
                    <svg className={styles.navIcon} viewBox="0 0 16 16" fill="currentColor">
                        <path d="M2 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-11zm9.354 4.146a.5.5 0 0 0-.708.708L12.293 9H6.5a.5.5 0 0 0 0 1h5.793l-1.647 1.646a.5.5 0 0 0 .708.708l2.5-2.5a.5.5 0 0 0 0-.708l-2.5-2.5z" />
                    </svg>
                    Sign out
                </button>
            </div>
        </aside>
    )
}
