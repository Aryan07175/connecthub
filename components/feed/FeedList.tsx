"use client"

import { useState, useEffect } from "react"
import { useInfiniteFeed } from "../../hooks/useInfiniteFeed"
import { PostCard } from "./PostCard"
import { Image as ImageIcon, Video, Smile, Globe } from "lucide-react"

type Post = { id: string; authorId: string; content: string }

export function FeedList() {
    const feed = useInfiniteFeed<Post>()
    const [newContent, setNewContent] = useState("")
    const [composerOpen, setComposerOpen] = useState(false)

    useEffect(() => {
        feed.loadInitial([
            { id: "1", authorId: "Alice Chen", content: "Just joined ConnectHub! Excited to be here 🎉 Let's connect and share ideas!" },
            { id: "2", authorId: "Bob Martinez", content: "Playing with Doubly Linked Lists today — O(1) insertions are genuinely satisfying once you wrap your head around how the pointers work. Who else loves data structures? 🤓" },
            { id: "3", authorId: "Carol White", content: "Beautiful morning run through the park. Grateful for clear skies and good vibes. How's everyone's day going? 🌤️" },
            { id: "4", authorId: "David Kim", content: "Just pushed a major feature to production. Graph-based friend recommendations are live! Check out the Trending page 🔥" },
        ])
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handlePost = () => {
        if (!newContent.trim()) return
        feed.prepend({
            id: Math.random().toString(),
            authorId: "CurrentUser",
            content: newContent
        })
        setNewContent("")
        setComposerOpen(false)
    }

    return (
        <div>
            {/* ===== Story Row ===== */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
                {[
                    { label: 'Your Story', initials: 'U', color: '#1877f2', add: true },
                    { label: 'Alice', initials: 'AC', color: '#27ae60' },
                    { label: 'Bob', initials: 'BM', color: '#e17000' },
                    { label: 'Carol', initials: 'CW', color: '#9b59b6' },
                    { label: 'David', initials: 'DK', color: '#f02849' },
                ].map(s => (
                    <button key={s.label} style={{
                        flex: s.add ? undefined : '0 0 100px',
                        minWidth: s.add ? 100 : 100,
                        height: 160,
                        borderRadius: 12,
                        overflow: 'hidden',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        background: `linear-gradient(170deg, ${s.color}cc 0%, ${s.color}55 100%)`,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'flex-end',
                        padding: '0 0 10px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                    }}>
                        <div style={{
                            position: 'absolute', top: 12, left: 12,
                            width: 36, height: 36, borderRadius: '50%',
                            background: s.add ? 'var(--fb-blue)' : s.color,
                            border: '3px solid white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 700, fontSize: 14
                        }}>
                            {s.add ? '+' : s.initials}
                        </div>
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: 12, textAlign: 'center', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                            {s.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* ===== Post Composer ===== */}
            <div className="fb-card" style={{ marginBottom: 16, padding: 12 }}>
                {/* Top row */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <div className="fb-avatar" style={{ width: 40, height: 40, fontSize: 16 }}>U</div>
                    {!composerOpen ? (
                        <div
                            className="fb-composer-trigger"
                            onClick={() => setComposerOpen(true)}
                            style={{ flex: 1 }}
                        >
                            What&apos;s on your mind?
                        </div>
                    ) : (
                        <textarea
                            autoFocus
                            className="fb-input-pill"
                            style={{ borderRadius: 8, resize: 'none', padding: 10 }}
                            rows={3}
                            placeholder="What's on your mind?"
                            value={newContent}
                            onChange={e => setNewContent(e.target.value)}
                        />
                    )}
                </div>

                {/* Divider */}
                <div className="fb-divider" />

                {/* Bottom actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', color: '#45bd62', fontWeight: 600, fontSize: 14 }}>
                            <Video size={20} /> Live Video
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', color: '#f3425f', fontWeight: 600, fontSize: 14 }}>
                            <ImageIcon size={20} /> Photo
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', color: '#f7b928', fontWeight: 600, fontSize: 14 }}>
                            <Smile size={20} /> Feeling
                        </button>
                    </div>
                    {composerOpen && (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--fb-text-secondary)', fontSize: 13 }}>
                                <Globe size={14} />
                                <span>Public</span>
                            </div>
                            <button
                                onClick={handlePost}
                                className="fb-btn-primary"
                                disabled={!newContent.trim()}
                                style={{ padding: '7px 16px', fontSize: 14, opacity: newContent.trim() ? 1 : 0.6, cursor: newContent.trim() ? 'pointer' : 'not-allowed' }}
                            >
                                Post
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== Feed Posts ===== */}
            <div>
                {feed.items.map(post => (
                    <PostCard key={post.id} author={post.authorId} content={post.content} />
                ))}
            </div>
        </div>
    )
}
