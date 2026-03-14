"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, UserPlus, AtSign, Filter } from "lucide-react"

const COLORS = ['#1877f2', '#e17000', '#27ae60', '#9b59b6', '#f02849', '#00897b']

const TABS = ['All', 'Mentions', 'Upvotes', 'Friend Requests']

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState('All')
    const [notifications, setNotifications] = useState<{ id: string; message: string; type: string; time: string; read: boolean }[]>([])

    useEffect(() => {
        setNotifications([
            { id: "1", message: "Alice Chen liked your post about data structures.", type: "like", time: "2 min ago", read: false },
            { id: "2", message: "Bob Martinez sent you a friend request.", type: "friend", time: "15 min ago", read: false },
            { id: "3", message: "Carol White mentioned you in a comment.", type: "mention", time: "1 hour ago", read: false },
            { id: "4", message: "David Kim liked your profile picture.", type: "like", time: "3 hours ago", read: true },
            { id: "5", message: "System: Welcome to ConnectHub! Start by connecting with friends.", type: "system", time: "1 day ago", read: true },
            { id: "6", message: "Emma Davis commented on your post.", type: "mention", time: "2 days ago", read: true },
        ])
    }, [])

    const typeIcon = (type: string, idx: number) => {
        const color = COLORS[idx % COLORS.length]
        if (type === "like") return { icon: <ThumbsUp size={16} style={{ color: '#fff' }} />, bg: '#1877f2' }
        if (type === "friend") return { icon: <UserPlus size={16} style={{ color: '#fff' }} />, bg: '#27ae60' }
        if (type === "mention") return { icon: <AtSign size={16} style={{ color: '#fff' }} />, bg: '#9b59b6' }
        return { icon: <Filter size={16} style={{ color: '#fff' }} />, bg: color }
    }

    const initials = ['AC', 'BM', 'CW', 'DK', 'SY', 'ED']

    const filtered = notifications.filter(n => {
        if (activeTab === 'All') return true
        if (activeTab === 'Mentions') return n.type === 'mention'
        if (activeTab === 'Upvotes') return n.type === 'like'
        if (activeTab === 'Friend Requests') return n.type === 'friend'
        return true
    })

    return (
        <div>
            <div className="fb-card" style={{ marginBottom: 16 }}>
                {/* Header */}
                <div style={{ padding: '16px 16px 0' }}>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--fb-text-primary)', marginBottom: 12 }}>Notifications</h1>

                    {/* Tab bar */}
                    <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 20,
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: 14,
                                    whiteSpace: 'nowrap',
                                    background: activeTab === tab ? 'var(--fb-blue-light)' : 'var(--fb-sidebar-hover)',
                                    color: activeTab === tab ? 'var(--fb-blue)' : 'var(--fb-text-primary)',
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ padding: 8 }}>
                    <p style={{ padding: '8px 8px 4px', fontSize: 17, fontWeight: 700, color: 'var(--fb-text-primary)' }}>
                        {activeTab === 'All' ? 'New' : activeTab}
                    </p>

                    {filtered.length === 0 && (
                        <div style={{ padding: 24, textAlign: 'center', color: 'var(--fb-text-secondary)' }}>
                            No {activeTab.toLowerCase()} notifications yet.
                        </div>
                    )}

                    {filtered.map((notif, idx) => {
                        const { icon, bg } = typeIcon(notif.type, idx)
                        const ini = initials[idx % initials.length]
                        const avatarColor = COLORS[idx % COLORS.length]

                        return (
                            <div
                                key={notif.id}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                                    background: notif.read ? 'transparent' : 'var(--fb-blue-light)',
                                    transition: 'background 0.15s',
                                    position: 'relative'
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = notif.read ? 'var(--fb-sidebar-hover)' : '#d8eaff')}
                                onMouseLeave={e => (e.currentTarget.style.background = notif.read ? 'transparent' : 'var(--fb-blue-light)')}
                            >
                                {/* Avatar with badge */}
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <div style={{
                                        width: 56, height: 56, borderRadius: '50%',
                                        background: avatarColor, color: '#fff',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: 20
                                    }}>
                                        {ini}
                                    </div>
                                    <div style={{
                                        position: 'absolute', bottom: 0, right: 0,
                                        width: 22, height: 22, borderRadius: '50%',
                                        background: bg, border: '2px solid white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {icon}
                                    </div>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 15, color: 'var(--fb-text-primary)', lineHeight: 1.4, margin: 0 }}>
                                        {notif.message}
                                    </p>
                                    <p style={{ fontSize: 13, color: notif.read ? 'var(--fb-text-secondary)' : 'var(--fb-blue)', fontWeight: notif.read ? 400 : 600, marginTop: 2 }}>
                                        {notif.time}
                                    </p>
                                </div>

                                {/* Unread dot */}
                                {!notif.read && (
                                    <div style={{
                                        width: 12, height: 12, borderRadius: '50%',
                                        background: 'var(--fb-blue)', flexShrink: 0
                                    }} />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
