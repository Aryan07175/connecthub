"use client"

import { useState } from "react"
import { Search as SearchIcon, UserPlus, UserCheck, Filter } from "lucide-react"

const COLORS = ['#1877f2', '#e17000', '#27ae60', '#9b59b6', '#f02849', '#00897b']

const allUsers = [
    { id: "1", name: "Alice Chen", mutual: 12, location: "San Francisco", initials: "AC" },
    { id: "2", name: "Alex Rodriguez", mutual: 5, location: "New York", initials: "AR" },
    { id: "3", name: "Alicia Wang", mutual: 8, location: "Austin", initials: "AW" },
    { id: "4", name: "Bob Martinez", mutual: 3, location: "Chicago", initials: "BM" },
    { id: "5", name: "Carol White", mutual: 19, location: "Seattle", initials: "CW" },
]

const FILTER_TABS = ['All', 'People', 'Topics', 'Posts']

export default function SearchPage() {
    const [query, setQuery] = useState("")
    const [activeFilter, setActiveFilter] = useState('All')
    const [followed, setFollowed] = useState<Set<string>>(new Set())

    const results = query.length > 0
        ? allUsers.filter(u => u.name.toLowerCase().startsWith(query.toLowerCase()))
        : allUsers

    const toggleFollow = (id: string) => {
        setFollowed(prev => {
            const s = new Set(prev)
            s.has(id) ? s.delete(id) : s.add(id)
            return s
        })
    }

    return (
        <div>
            {/* Search header */}
            <div className="fb-card" style={{ marginBottom: 16 }}>
                <div style={{ padding: '16px 16px 0' }}>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--fb-text-primary)', marginBottom: 12 }}>Search</h1>

                    {/* Search input */}
                    <div style={{ position: 'relative', marginBottom: 12 }}>
                        <SearchIcon style={{
                            position: 'absolute', left: 14, top: '50%',
                            transform: 'translateY(-50%)', color: 'var(--fb-text-secondary)'
                        }} size={18} />
                        <input
                            className="fb-input-pill"
                            style={{ paddingLeft: 44, fontSize: 15, borderRadius: 20, height: 46 }}
                            placeholder="Search people, topics, posts..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter tabs */}
                    <div style={{ display: 'flex', gap: 8, paddingBottom: 12, overflowX: 'auto' }}>
                        {FILTER_TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                style={{
                                    padding: '8px 16px', borderRadius: 20, border: 'none',
                                    cursor: 'pointer', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap',
                                    background: activeFilter === tab ? 'var(--fb-blue-light)' : 'var(--fb-sidebar-hover)',
                                    color: activeFilter === tab ? 'var(--fb-blue)' : 'var(--fb-text-primary)',
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 16px', borderRadius: 20,
                            border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                            background: 'var(--fb-sidebar-hover)', color: 'var(--fb-text-primary)'
                        }}>
                            <Filter size={14} /> Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="fb-card">
                <div style={{ padding: '12px 16px 4px' }}>
                    <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--fb-text-primary)' }}>
                        {query ? `Results for "${query}"` : 'People you may know'}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--fb-text-secondary)', marginTop: 2 }}>
                        ✨ Powered by Prefix Trie autocomplete
                    </p>
                </div>

                {results.length === 0 && (
                    <div style={{ padding: 32, textAlign: 'center', color: 'var(--fb-text-secondary)' }}>
                        No results found for &quot;{query}&quot;
                    </div>
                )}

                <div style={{ padding: '8px 0 0' }}>
                    {results.map((user, idx) => {
                        const color = COLORS[idx % COLORS.length]
                        const isFollowed = followed.has(user.id)
                        return (
                            <div
                                key={user.id}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '10px 16px',
                                    borderBottom: idx < results.length - 1 ? '1px solid var(--fb-divider)' : 'none',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s'
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--fb-sidebar-hover)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                                {/* Avatar */}
                                <div style={{
                                    width: 56, height: 56, borderRadius: '50%',
                                    background: color, color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: 20, flexShrink: 0
                                }}>
                                    {user.initials}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--fb-text-primary)', margin: 0 }}>{user.name}</p>
                                    <p style={{ fontSize: 13, color: 'var(--fb-text-secondary)', margin: '2px 0 0' }}>
                                        {user.mutual} mutual friends · {user.location}
                                    </p>
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={e => { e.stopPropagation(); toggleFollow(user.id) }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        padding: '8px 16px', borderRadius: 6, border: 'none',
                                        cursor: 'pointer', fontWeight: 700, fontSize: 14,
                                        background: isFollowed ? 'var(--fb-sidebar-hover)' : 'var(--fb-blue-light)',
                                        color: isFollowed ? 'var(--fb-text-primary)' : 'var(--fb-blue)',
                                        transition: 'all 0.15s'
                                    }}
                                >
                                    {isFollowed
                                        ? <><UserCheck size={16} /> Friends</>
                                        : <><UserPlus size={16} /> Add Friend</>
                                    }
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
