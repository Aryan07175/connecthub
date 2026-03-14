"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Hash, ChevronRight, Flame } from "lucide-react"

const COLORS = ['#1877f2', '#e17000', '#27ae60', '#9b59b6', '#f02849', '#00897b']

export default function TrendingPage() {
    const [trends, setTrends] = useState<{ tag: string; count: number; growth: string }[]>([])
    const [followed, setFollowed] = useState<Set<string>>(new Set())

    useEffect(() => {
        setTrends([
            { tag: "TypeScript", count: 1542, growth: "+12%" },
            { tag: "NextJS", count: 1205, growth: "+8%" },
            { tag: "DataStructures", count: 984, growth: "+25%" },
            { tag: "ConnectHub", count: 850, growth: "+41%" },
            { tag: "WebDev", count: 700, growth: "+6%" },
            { tag: "OpenSource", count: 634, growth: "+15%" },
            { tag: "React", count: 589, growth: "+3%" },
            { tag: "GraphQL", count: 412, growth: "+19%" },
        ])
    }, [])

    const toggleFollow = (tag: string) => {
        setFollowed(prev => {
            const s = new Set(prev)
            s.has(tag) ? s.delete(tag) : s.add(tag)
            return s
        })
    }

    const top3 = trends.slice(0, 3)
    const rest = trends.slice(3)

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Flame size={28} style={{ color: '#f02849' }} />
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--fb-text-primary)', margin: 0 }}>Trending</h1>
                    <p style={{ fontSize: 13, color: 'var(--fb-text-secondary)', marginTop: 2 }}>
                        What&apos;s popular on ConnectHub right now
                    </p>
                </div>
            </div>

            {/* Top 3 cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                {top3.map((trend, idx) => {
                    const color = COLORS[idx]
                    const isFollowed = followed.has(trend.tag)
                    return (
                        <div key={trend.tag} className="fb-card" style={{ overflow: 'hidden' }}>
                            <div style={{
                                height: 80,
                                background: `linear-gradient(135deg, ${color}cc 0%, ${color}44 100%)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: 36, fontWeight: 900, color: 'rgba(255,255,255,0.9)' }}>#{idx + 1}</span>
                            </div>
                            <div style={{ padding: 14 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                                    <Hash size={14} style={{ color }} />
                                    <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--fb-text-primary)' }}>{trend.tag}</span>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--fb-text-secondary)', margin: '0 0 4px' }}>
                                    {trend.count.toLocaleString()} posts
                                </p>
                                <p style={{ fontSize: 12, color: '#27ae60', fontWeight: 600 }}>
                                    <TrendingUp size={12} style={{ display: 'inline', marginRight: 3 }} />
                                    {trend.growth} today
                                </p>
                                <button
                                    onClick={() => toggleFollow(trend.tag)}
                                    style={{
                                        width: '100%', marginTop: 10,
                                        padding: '7px', border: 'none', borderRadius: 6,
                                        fontWeight: 700, fontSize: 14, cursor: 'pointer',
                                        background: isFollowed ? 'var(--fb-sidebar-hover)' : color,
                                        color: isFollowed ? 'var(--fb-text-primary)' : '#fff',
                                        transition: 'all 0.15s'
                                    }}
                                >
                                    {isFollowed ? '✓ Following' : '+ Follow'}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Remaining list */}
            <div className="fb-card">
                <div style={{ padding: '14px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--fb-text-primary)' }}>More Trending Topics</p>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fb-blue)', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 2 }}>
                        See All <ChevronRight size={16} />
                    </button>
                </div>

                <div>
                    {rest.map((trend, idx) => {
                        const color = COLORS[(idx + 3) % COLORS.length]
                        const isFollowed = followed.has(trend.tag)
                        const rank = idx + 4
                        return (
                            <div
                                key={trend.tag}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '12px 16px',
                                    borderTop: '1px solid var(--fb-divider)',
                                    cursor: 'pointer', transition: 'background 0.15s'
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--fb-sidebar-hover)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                                {/* Rank */}
                                <div style={{
                                    width: 44, height: 44, borderRadius: 8,
                                    background: `${color}22`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <span style={{ fontWeight: 800, fontSize: 18, color }}>#{rank}</span>
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Hash size={14} style={{ color }} />
                                        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--fb-text-primary)' }}>{trend.tag}</span>
                                        <span style={{ fontSize: 12, color: '#27ae60', fontWeight: 600, marginLeft: 6 }}>{trend.growth}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: 'var(--fb-text-secondary)', margin: '2px 0 0' }}>
                                        {trend.count.toLocaleString()} posts today
                                    </p>
                                </div>

                                <button
                                    onClick={e => { e.stopPropagation(); toggleFollow(trend.tag) }}
                                    style={{
                                        padding: '7px 16px', border: 'none', borderRadius: 6,
                                        fontWeight: 700, fontSize: 14, cursor: 'pointer',
                                        background: isFollowed ? 'var(--fb-sidebar-hover)' : 'var(--fb-blue-light)',
                                        color: isFollowed ? 'var(--fb-text-primary)' : 'var(--fb-blue)',
                                        transition: 'all 0.15s'
                                    }}
                                >
                                    {isFollowed ? '✓ Following' : '+ Follow'}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
