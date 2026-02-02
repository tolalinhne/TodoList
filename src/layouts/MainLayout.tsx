import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import styles from './MainLayout.module.css'

export default function MainLayout() {
    return (
        <div className={styles.mainLayout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header />
                <main className={styles.pageContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
