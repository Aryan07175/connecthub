"use client"

import { useNavigationStack } from "../../../../hooks/useNavigationStack"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft, MapPin, Briefcase, UserPlus, MessageCircle, MoreHorizontal, ThumbsUp, MessageSquare } from "lucide-react"

const COLORS = ['#1877f2', '#e17000', '#27ae60', '#9b59b6', '#f02849', '#00897b']

function getColor(name: string) {
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return COLORS[Math.abs(hash) % COLORS.length]
}

const TABS = ['Posts', 'About', 'Friends', 'Photos']

export default function ProfilePage() {
    const params = useParams()
    const router = useRouter()
    const { push, pop, size, isEmpty } = useNavigationStack<string>()
    const profileId = params?.id as string
    const initials = profileId?.slice(0, 2).toUpperCase() || 'U'
    const avatarColor = getColor(profileId || 'user')

    useEffect(() => {
        push(profileId)
    }, [profileId, push])

    const handleBack = () => {
        if (!isEmpty) { pop(); router.back() }
    }

    const stats = [
        { label: 'Posts', value: '48' },
        { label: 'Friends', value: '312' },
        { label: 'Followers', value: `${size * 100 + 24}` },
    ]

    const dummyPosts = [
        { content: 'Just joined ConnectHub! Really loving the community here 🎉', time: '2 hours ago' },
        { content: 'Working on some exciting new data structures today. Graphs are fascinating!', time: '1 day ago' },
    ]

    return (
        <div>
            {/* Back button */}
            <button
                onClick={handleBack}
                disabled={size <= 1}
                style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    marginBottom: 12, padding: '8px 12px',
                    background: 'none', border: 'none', cursor: size <= 1 ? 'not-allowed' : 'pointer',
                    color: 'var(--fb-blue)', fontWeight: 600, fontSize: 15, opacity: size <= 1 ? 0.4 : 1
                }}
            >
                <ArrowLeft size={20} /> Back
            </button>

            {/* ===== Cover + Avatar ===== */}
            <div className="fb-card" style={{ marginBottom: 16, overflow: 'visible' }}>
                {/* Cover photo */}
                <div style={{
                    height: 280,
                    background: `linear-gradient(135deg, ${avatarColor}cc 0%, ${avatarColor}44 100%)`,
                    borderRadius: '8px 8px 0 0',
                    position: 'relative'
                }}>
                    {/* Edit cover button */}
                    <button style={{
                        position: 'absolute', right: 16, bottom: 16,
                        background: 'white', border: 'none', borderRadius: 6,
                        padding: '6px 14px', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                        color: 'var(--fb-text-primary)', boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                    }}>
                        ✎ Edit Cover Photo
                    </button>
                </div>

                {/* Avatar + Info row */}
                <div style={{ padding: '0 24px 16px', position: 'relative' }}>
                    {/* Avatar */}
                    <div style={{
                        width: 168, height: 168, borderRadius: '50%',
                        background: avatarColor,
                        border: '4px solid white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 800, fontSize: 64,
                        marginTop: -84,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}>
                        {initials}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 }}>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fb-text-primary)', margin: 0 }}>
                                User {profileId}
                            </h1>
                            <p style={{ color: 'var(--fb-text-secondary)', fontSize: 15, marginTop: 4 }}>
                                {stats[1].value} friends
                            </p>
                            {/* Mutual friends avatars */}
                            <div style={{ display: 'flex', marginTop: 6 }}>
                                {['AC', 'BM', 'CW', 'DK'].map((ini, i) => (
                                    <div key={ini} style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: COLORS[i],
                                        border: '2px solid white',
                                        marginLeft: i === 0 ? 0 : -8,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#fff', fontWeight: 700, fontSize: 11
                                    }}>{ini}</div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <button style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'var(--fb-blue)', color: '#fff',
                                border: 'none', borderRadius: 6, padding: '9px 16px',
                                fontWeight: 700, fontSize: 15, cursor: 'pointer'
                            }}>
                                <UserPlus size={18} /> Add Friend
                            </button>
                            <button style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'var(--fb-sidebar-hover)', color: 'var(--fb-text-primary)',
                                border: 'none', borderRadius: 6, padding: '9px 16px',
                                fontWeight: 700, fontSize: 15, cursor: 'pointer'
                            }}>
                                <MessageCircle size={18} /> Message
                            </button>
                            <button style={{
                                background: 'var(--fb-sidebar-hover)', border: 'none',
                                borderRadius: 6, padding: '9px 12px', cursor: 'pointer'
                            }}>
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: 24, marginTop: 16, borderTop: '1px solid var(--fb-divider)', paddingTop: 12 }}>
                        {stats.map(s => (
                            <div key={s.label} style={{ textAlign: 'center' }}>
                                <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--fb-text-primary)', margin: 0 }}>{s.value}</p>
                                <p style={{ fontSize: 13, color: 'var(--fb-text-secondary)', margin: 0 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tab bar */}
                <div className="fb-divider" />
                <div style={{ display: 'flex', padding: '0 12px' }}>
                    {TABS.map((tab, i) => (
                        <button key={tab} style={{
                            padding: '14px 16px', border: 'none', background: 'none',
                            fontWeight: i === 0 ? 700 : 600, fontSize: 15,
                            color: i === 0 ? 'var(--fb-blue)' : 'var(--fb-text-secondary)',
                            borderBottom: i === 0 ? '3px solid var(--fb-blue)' : '3px solid transparent',
                            cursor: 'pointer'
                        }}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Two-column profile content */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {/* Left: Intro card */}
                <div style={{ flex: '0 0 340px' }}>
                    <div className="fb-card" style={{ padding: 16, marginBottom: 16 }}>
                        <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Intro</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: 'var(--fb-text-secondary)' }}>
                            <Briefcase size={18} /> <span>Works at ConnectHub</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: 'var(--fb-text-secondary)' }}>
                            <MapPin size={18} /> <span>Lives in San Francisco</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fb-text-secondary)' }}>
                            <span style={{ fontSize: 14 }}>🗓️</span> <span>Joined March 2025</span>
                        </div>
                        <button style={{
                            width: '100%', marginTop: 14, padding: '8px',
                            background: 'var(--fb-sidebar-hover)', border: 'none',
                            borderRadius: 6, fontWeight: 600, fontSize: 15, cursor: 'pointer',
                            color: 'var(--fb-text-primary)'
                        }}>
                            Edit Bio
                        </button>
                    </div>
                </div>

                {/* Right: Posts */}
                <div style={{ flex: 1 }}>
                    {dummyPosts.map((p, i) => (
                        <div key={i} className="fb-card" style={{ marginBottom: 16, padding: 16 }}>
                            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%',
                                    background: avatarColor, color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: 15
                                }}>{initials}</div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: 15 }}>User {profileId}</p>
                                    <p style={{ fontSize: 12, color: 'var(--fb-text-secondary)' }}>{p.time}</p>
                                </div>
                            </div>
                            <p style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 12 }}>{p.content}</p>
                            <div className="fb-divider" />
                            <div style={{ display: 'flex', paddingTop: 6 }}>
                                <button className="fb-action-btn"><ThumbsUp size={16} /> <span style={{ fontSize: 14 }}>Like</span></button>
                                <button className="fb-action-btn"><MessageSquare size={16} /> <span style={{ fontSize: 14 }}>Comment</span></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
