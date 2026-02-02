import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { taskStorage } from '@/services/storage'
import type { Task, TaskStatus } from '@/types'
import TaskCard from '@/components/task/TaskCard'
import styles from './Dashboard.module.css'

export default function Dashboard() {
    const [searchParams] = useSearchParams()
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<TaskStatus | 'ALL'>('ALL')

    const loadTasks = useCallback(() => {
        setLoading(true)
        const categoryId = searchParams.get('category')

        let allTasks = taskStorage.getAll()

        // Filter by category if specified
        if (categoryId) {
            allTasks = allTasks.filter((t) => t.category?.id === Number(categoryId))
        }

        setTasks(allTasks)
        setLoading(false)
    }, [searchParams])

    useEffect(() => {
        loadTasks()

        // Listen for storage changes (for real-time updates)
        const handleStorageChange = () => loadTasks()
        window.addEventListener('storage', handleStorageChange)

        // Also listen for custom events from within the app
        window.addEventListener('tasksUpdated', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('tasksUpdated', handleStorageChange)
        }
    }, [loadTasks])

    // Re-load when modal closes (triggered via custom event)
    useEffect(() => {
        const interval = setInterval(loadTasks, 1000) // Poll for changes
        return () => clearInterval(interval)
    }, [loadTasks])

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'ALL') return true
        return task.status === filter
    })

    // Group tasks by status
    const groupedTasks = {
        TODO: filteredTasks.filter((t) => t.status === 'TODO'),
        IN_PROGRESS: filteredTasks.filter((t) => t.status === 'IN_PROGRESS'),
        DONE: filteredTasks.filter((t) => t.status === 'DONE'),
        CANCELED: filteredTasks.filter((t) => t.status === 'CANCELED'),
    }

    const statusLabels: Record<TaskStatus, string> = {
        TODO: 'To Do',
        IN_PROGRESS: 'In Progress',
        DONE: 'Done',
        CANCELED: 'Canceled',
    }

    if (loading) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner} />
                </div>
            </div>
        )
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>My Issues</h1>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <button
                    className={`${styles.filterButton} ${filter === 'ALL' ? styles.active : ''}`}
                    onClick={() => setFilter('ALL')}
                >
                    All
                </button>
                <button
                    className={`${styles.filterButton} ${filter === 'TODO' ? styles.active : ''}`}
                    onClick={() => setFilter('TODO')}
                >
                    To Do
                </button>
                <button
                    className={`${styles.filterButton} ${filter === 'IN_PROGRESS' ? styles.active : ''}`}
                    onClick={() => setFilter('IN_PROGRESS')}
                >
                    In Progress
                </button>
                <button
                    className={`${styles.filterButton} ${filter === 'DONE' ? styles.active : ''}`}
                    onClick={() => setFilter('DONE')}
                >
                    Done
                </button>
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <div className={styles.emptyState}>
                    <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <h3 className={styles.emptyTitle}>No issues found</h3>
                    <p className={styles.emptyText}>Create your first issue to get started</p>
                </div>
            ) : filter === 'ALL' ? (
                // Grouped view
                <>
                    {(['TODO', 'IN_PROGRESS', 'DONE', 'CANCELED'] as TaskStatus[]).map((status) => {
                        const statusTasks = groupedTasks[status]
                        if (statusTasks.length === 0) return null
                        return (
                            <div key={status} className={styles.taskGroup}>
                                <div className={styles.taskGroupHeader}>
                                    <span className={styles.taskGroupTitle}>{statusLabels[status]}</span>
                                    <span className={styles.taskGroupCount}>{statusTasks.length}</span>
                                </div>
                                <div className={styles.taskList}>
                                    {statusTasks.map((task) => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </>
            ) : (
                // Flat list for filtered view
                <div className={styles.taskList}>
                    {filteredTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    )
}
