"use client"

import { useState } from "react"
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe } from "lucide-react"

const COLORS = ['#1877f2', '#e17000', '#27ae60', '#9b59b6', '#f02849', '#00897b']

function getColor(name: string) {
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return COLORS[Math.abs(hash) % COLORS.length]
}

export function PostCard({ author, content }: { author: string; content: string }) {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 40) + 2)
    const [showComments, setShowComments] = useState(false)
    const color = getColor(author)
    const initials = author.slice(0, 2).toUpperCase()

    const handleLike = () => {
        setLiked(prev => !prev)
        setLikeCount(prev => liked ? prev - 1 : prev + 1)
    }

    return (
        <div className="fb-card" style={{ marginBottom: 16 }}>
            {/* Header */}
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 15, flexShrink: 0
                    }}>
                        {initials}
                    </div>
                    <div>
                        <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--fb-text-primary)', lineHeight: 1.2 }}>{author}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <span style={{ fontSize: 12, color: 'var(--fb-text-secondary)' }}>Just now</span>
                            <span style={{ color: 'var(--fb-text-secondary)' }}>·</span>
                            <Globe size={12} style={{ color: 'var(--fb-text-secondary)' }} />
                        </div>
                    </div>
                </div>
                <button style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--fb-text-secondary)', padding: 4, borderRadius: '50%'
                }}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Content */}
            <div style={{ padding: '0 16px 12px', fontSize: 15, color: 'var(--fb-text-primary)', lineHeight: 1.6 }}>
                {content}
            </div>

            {/* Reaction / Comment counts */}
            <div style={{
                padding: '6px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderTop: '1px solid var(--fb-divider)', borderBottom: '1px solid var(--fb-divider)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{
                        width: 18, height: 18, borderRadius: '50%',
                        background: 'var(--fb-like)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <ThumbsUp size={10} style={{ color: '#fff' }} />
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--fb-text-secondary)' }}>{likeCount}</span>
                </div>
                <button
                    onClick={() => setShowComments(!showComments)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--fb-text-secondary)' }}
                >
                    {showComments ? 'Hide' : '3 Comments'}
                </button>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', padding: '2px 8px' }}>
                <button
                    className={`fb-action-btn${liked ? ' liked' : ''}`}
                    onClick={handleLike}
                    style={{ color: liked ? 'var(--fb-like)' : undefined }}
                >
                    <ThumbsUp size={18} style={{ fill: liked ? 'var(--fb-like)' : 'transparent', stroke: liked ? 'var(--fb-like)' : 'currentColor' }} />
                    <span style={{ fontSize: 14 }}>Like</span>
                </button>
                <button className="fb-action-btn" onClick={() => setShowComments(!showComments)}>
                    <MessageCircle size={18} />
                    <span style={{ fontSize: 14 }}>Comment</span>
                </button>
                <button className="fb-action-btn">
                    <Share2 size={18} />
                    <span style={{ fontSize: 14 }}>Share</span>
                </button>
            </div>

            {/* Comments section */}
            {showComments && (
                <div style={{ padding: '8px 16px 12px', borderTop: '1px solid var(--fb-divider)' }}>
                    <CommentRow initials="AU" color="#27ae60" name="Alex User" text="Great post! 👍" />
                    <CommentRow initials="BM" color="#e17000" name="Bob M." text="Totally agree with this!" />
                    <CommentRow initials="CW" color="#9b59b6" name="Carol White" text="Thanks for sharing 🙌" />
                    {/* Comment input */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                        <div className="fb-avatar" style={{ width: 32, height: 32, fontSize: 13 }}>U</div>
                        <input
                            className="fb-input-pill"
                            style={{ fontSize: 14, padding: '7px 14px' }}
                            placeholder="Write a comment..."
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

function CommentRow({ initials, color, name, text }: { initials: string; color: string; name: string; text: string }) {
    return (
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
            <div style={{
                width: 32, height: 32, borderRadius: '50%', background: color,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, flexShrink: 0
            }}>
                {initials}
            </div>
            <div style={{
                background: 'var(--fb-input-bg)', borderRadius: 18, padding: '8px 12px',
                maxWidth: '85%'
            }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--fb-text-primary)', marginBottom: 2 }}>{name}</p>
                <p style={{ fontSize: 14, color: 'var(--fb-text-primary)' }}>{text}</p>
            </div>
        </div>
    )
}
