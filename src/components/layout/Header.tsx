import { useState } from 'react'
import styles from './Header.module.css'
import CreateTaskModal from '@/components/task/CreateTaskModal'

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    return (
        <>
            <header className={styles.header}>
                {/* Search */}
                <div className={styles.searchContainer}>
                    <div className={styles.searchWrapper}>
                        <svg className={styles.searchIcon} viewBox="0 0 16 16" fill="currentColor">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search issues..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <button
                        className={styles.newTaskButton}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <svg viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        New Issue
                        <span className={styles.shortcut}>C</span>
                    </button>
                </div>
            </header>

            {/* Create Task Modal */}
            <CreateTaskModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </>
    )
}
