import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { taskStorage } from '@/services/storage'
import type { Task, TaskStatus } from '@/types'
import Button from '@/components/common/Button'
import { Select } from '@/components/common/Input'
import styles from './TaskDetail.module.css'

export default function TaskDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [task, setTask] = useState<Task | null>(null)
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (id) {
            loadTask(Number(id))
        }
    }, [id])

    const loadTask = (taskId: number) => {
        setLoading(true)
        const data = taskStorage.getById(taskId)
        if (data) {
            setTask(data)
        } else {
            navigate('/')
        }
        setLoading(false)
    }

    const handleDelete = () => {
        if (!task || !window.confirm('Are you sure you want to delete this issue?')) return

        setDeleting(true)
        taskStorage.delete(task.id)
        navigate('/')
    }

    const handleStatusChange = (newStatus: TaskStatus) => {
        if (!task) return
        const updated = taskStorage.update(task.id, { status: newStatus })
        if (updated) {
            setTask(updated)
        }
    }

    const getStatusClass = () => {
        if (!task) return ''
        switch (task.status) {
            case 'TODO': return styles.todo
            case 'IN_PROGRESS': return styles.inProgress
            case 'DONE': return styles.done
            case 'CANCELED': return styles.canceled
            default: return ''
        }
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    if (loading) {
        return (
            <div className={styles.taskDetail}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner} />
                </div>
            </div>
        )
    }

    if (!task) {
        return (
            <div className={styles.taskDetail}>
                <p>Task not found</p>
            </div>
        )
    }

    return (
        <div className={styles.taskDetail}>
            {/* Back Button */}
            <button className={styles.backButton} onClick={() => navigate('/')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                </svg>
                Back to Issues
            </button>

            {/* Header */}
            <div className={styles.header}>
                <div className={`${styles.statusIcon} ${getStatusClass()}`} />
                <div className={styles.titleSection}>
                    <div className={styles.taskId}>LIN-{task.id}</div>
                    <h1 className={styles.title}>{task.title}</h1>
                </div>
                <div className={styles.actions}>
                    <Button variant="danger" size="sm" onClick={handleDelete} loading={deleting}>
                        Delete
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {/* Main */}
                <div className={styles.main}>
                    <h2 className={styles.sectionTitle}>Description</h2>
                    {task.description ? (
                        <p className={styles.description}>{task.description}</p>
                    ) : (
                        <p className={styles.noDescription}>No description provided</p>
                    )}
                </div>

                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.sidebarCard}>
                        <div className={styles.property}>
                            <span className={styles.propertyLabel}>Status</span>
                            <Select
                                value={task.status}
                                onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                                style={{ marginTop: '4px' }}
                            >
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                                <option value="CANCELED">Canceled</option>
                            </Select>
                        </div>

                        <div className={styles.property}>
                            <span className={styles.propertyLabel}>Priority</span>
                            <span className={styles.propertyValue}>
                                {task.priority ? (
                                    <>
                                        <span className={`${styles.priorityDot} ${styles[task.priority.toLowerCase()]}`} />
                                        {task.priority}
                                    </>
                                ) : (
                                    <span style={{ color: 'var(--color-text-tertiary)' }}>No priority</span>
                                )}
                            </span>
                        </div>

                        <div className={styles.property}>
                            <span className={styles.propertyLabel}>Category</span>
                            <span className={styles.propertyValue}>
                                {task.category?.name || (
                                    <span style={{ color: 'var(--color-text-tertiary)' }}>None</span>
                                )}
                            </span>
                        </div>

                        <div className={styles.property}>
                            <span className={styles.propertyLabel}>Due Date</span>
                            <span className={styles.propertyValue}>
                                {task.dueDate ? (
                                    formatDate(task.dueDate)
                                ) : (
                                    <span style={{ color: 'var(--color-text-tertiary)' }}>No due date</span>
                                )}
                            </span>
                        </div>

                        <div className={styles.property}>
                            <span className={styles.propertyLabel}>Created</span>
                            <span className={styles.propertyValue}>
                                {formatDate(task.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
