import { useNavigate } from 'react-router-dom'
import type { Task } from '@/types'
import styles from './TaskCard.module.css'

interface TaskCardProps {
    task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
    const navigate = useNavigate()

    const getStatusClass = () => {
        switch (task.status) {
            case 'TODO': return styles.todo
            case 'IN_PROGRESS': return styles.inProgress
            case 'DONE': return styles.done
            case 'CANCELED': return styles.canceled
            default: return ''
        }
    }

    const getPriorityClass = () => {
        if (!task.priority) return ''
        return styles[task.priority.toLowerCase() as keyof typeof styles] || ''
    }

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return null
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    const isOverdue = () => {
        if (!task.dueDate || task.status === 'DONE') return false
        return new Date(task.dueDate) < new Date()
    }

    return (
        <div
            className={styles.taskCard}
            onClick={() => navigate(`/tasks/${task.id}`)}
        >
            {/* Status Icon */}
            <div className={`${styles.statusIcon} ${getStatusClass()}`} />

            {/* Task Info */}
            <div className={styles.taskInfo}>
                <div className={`${styles.taskTitle} ${task.status === 'DONE' ? styles.done : ''}`}>
                    {task.title}
                </div>
                <div className={styles.taskMeta}>
                    <span className={styles.taskId}>LIN-{task.id}</span>
                </div>
            </div>

            {/* Priority */}
            {task.priority && (
                <span className={`${styles.priorityBadge} ${getPriorityClass()}`}>
                    {task.priority}
                </span>
            )}

            {/* Category */}
            {task.category && (
                <span className={styles.categoryBadge}>
                    <span className={styles.categoryDot} />
                    {task.category.name}
                </span>
            )}

            {/* Due Date */}
            {task.dueDate && (
                <span className={`${styles.dueDate} ${isOverdue() ? styles.overdue : ''}`}>
                    {formatDate(task.dueDate)}
                </span>
            )}

            {/* Assignee */}
            {task.user && (
                <div className={styles.assignee}>
                    {task.user.username.slice(0, 2).toUpperCase()}
                </div>
            )}
        </div>
    )
}
