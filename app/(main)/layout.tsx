"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Bell, TrendingUp, User, MessageCircle, Users, Bookmark } from "lucide-react"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--fb-bg)', fontFamily: 'Inter, sans-serif' }}>

            {/* ===== Top Navbar ===== */}
            <header className="fb-navbar">
                {/* Left: Logo */}
                <Link href="/feed" className="flex items-center gap-1 shrink-0">
                    <div style={{
                        width: 36, height: 36, borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--fb-blue) 0%, #ec4899 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                    }}>
                        <span style={{ color: '#fff', fontSize: 20, fontWeight: 900, lineHeight: 1 }}>C</span>
                    </div>
                    <span style={{ color: 'var(--fb-text-primary)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px', marginLeft: 6 }}>
                        ConnectHub
                    </span>
                </Link>

                {/* Center: Search bar */}
                <div style={{ flex: '0 0 280px', margin: '0 8px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search
                            size={16}
                            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--fb-text-secondary)' }}
                        />
                        <input
                            className="fb-input-pill"
                            style={{ paddingLeft: 36, fontSize: 14 }}
                            placeholder="Search ConnectHub"
                        />
                    </div>
                </div>

                {/* Center Nav Icons */}
                <nav style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
                    <TopNavIcon href="/feed" icon={<Home size={24} />} label="Home" active={pathname === '/feed' || pathname === '/'} />
                    <TopNavIcon href="/search" icon={<Users size={24} />} label="Friends" active={pathname.startsWith('/search')} />
                    <TopNavIcon href="/trending" icon={<TrendingUp size={24} />} label="Trending" active={pathname.startsWith('/trending')} />
                    <TopNavIcon href="/notifications" icon={<Bell size={24} />} label="Notifications" active={pathname.startsWith('/notifications')} />
                    <TopNavIcon href="/profile/me" icon={<User size={24} />} label="Profile" active={pathname.startsWith('/profile')} />
                </nav>

                {/* Right: Action buttons + Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <button style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'var(--fb-sidebar-hover)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: 'none', cursor: 'pointer'
                    }}>
                        <MessageCircle size={20} style={{ color: 'var(--fb-text-primary)' }} />
                    </button>
                    <div className="fb-avatar" style={{ width: 40, height: 40, fontSize: 16 }}>
                        U
                    </div>
                </div>
            </header>

            {/* ===== Body (below navbar) ===== */}
            <div style={{ display: 'flex', paddingTop: 56, minHeight: '100vh' }}>

                {/* === Left Sidebar === */}
                <aside style={{
                    width: 280, flexShrink: 0,
                    position: 'sticky', top: 56, height: 'calc(100vh - 56px)',
                    overflowY: 'auto', padding: '12px 8px',
                    backgroundColor: 'var(--fb-bg)'
                }}>
                    {/* User mini-profile */}
                    <Link href="/profile/me" className="fb-nav-item" style={{ marginBottom: 4 }}>
                        <div className="fb-avatar" style={{ width: 36, height: 36, fontSize: 15 }}>U</div>
                        <span style={{ fontWeight: 600 }}>Your Profile</span>
                    </Link>

                    <div className="fb-divider" style={{ margin: '8px 0' }} />

                    <SidebarNavItem href="/feed" icon={<Home size={18} style={{ color: 'var(--fb-blue)' }} />} label="Home" active={pathname === '/feed' || pathname === '/'} />
                    <SidebarNavItem href="/search" icon={<Users size={18} style={{ color: '#06c' }} />} label="Find Friends" active={pathname.startsWith('/search')} />
                    <SidebarNavItem href="/notifications" icon={<Bell size={18} style={{ color: '#f02849' }} />} label="Notifications" active={pathname.startsWith('/notifications')} />
                    <SidebarNavItem href="/trending" icon={<TrendingUp size={18} style={{ color: '#e17000' }} />} label="Trending" active={pathname.startsWith('/trending')} />
                    <SidebarNavItem href="/profile/me" icon={<User size={18} style={{ color: 'var(--fb-blue)' }} />} label="Profile" active={pathname.startsWith('/profile')} />
                    <SidebarNavItem href="#" icon={<Bookmark size={18} style={{ color: '#7048e8' }} />} label="Saved" active={false} />

                    <div className="fb-divider" style={{ margin: '8px 0' }} />
                    <p style={{ fontSize: 12, color: 'var(--fb-text-secondary)', padding: '4px 12px' }}>
                        © 2025 ConnectHub · Privacy · Terms
                    </p>
                </aside>

                {/* === Main Feed === */}
                <main style={{ flex: 1, maxWidth: 680, margin: '0 auto', padding: '16px 16px 40px' }}>
                    {children}
                </main>

                {/* === Right Sidebar === */}
                <aside style={{
                    width: 280, flexShrink: 0,
                    position: 'sticky', top: 56, height: 'calc(100vh - 56px)',
                    overflowY: 'auto', padding: '12px 8px',
                    backgroundColor: 'var(--fb-bg)'
                }}>
                    <RightSidebar />
                </aside>
            </div>
        </div>
    )
}

function TopNavIcon({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            title={label}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 112,
                height: 48,
                borderRadius: 8,
                color: active ? 'var(--fb-blue)' : 'var(--fb-text-secondary)',
                textDecoration: 'none',
                borderBottom: active ? '3px solid var(--fb-blue)' : '3px solid transparent',
                transition: 'background-color 0.15s ease, color 0.15s ease',
                position: 'relative',
                marginBottom: -4,
            }}
            onMouseEnter={(e) => {
                if (!active) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--fb-sidebar-hover)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--fb-text-primary)'
                }
            }}
            onMouseLeave={(e) => {
                if (!active) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--fb-text-secondary)'
                }
            }}
        >
            {icon}
        </Link>
    )
}

function SidebarNavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`fb-nav-item${active ? ' active' : ''}`}
        >
            <div className={`fb-nav-icon${active ? ' active' : ''}`}>{icon}</div>
            <span>{label}</span>
        </Link>
    )
}

function RightSidebar() {
    const contacts = [
        { name: 'Alice Chen', initials: 'AC', color: '#1877f2' },
        { name: 'Bob Martinez', initials: 'BM', color: '#e17000' },
        { name: 'Carol White', initials: 'CW', color: '#27ae60' },
        { name: 'David Kim', initials: 'DK', color: '#9b59b6' },
        { name: 'Emma Davis', initials: 'ED', color: '#f02849' },
    ]

    const topics = ['#TypeScript', '#NextJS', '#DataStructures', '#ConnectHub', '#WebDev']

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Sponsored */}
            <div>
                <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--fb-text-primary)', padding: '4px 8px 8px' }}>
                    Sponsored
                </p>
                <div style={{ padding: '8px', borderRadius: 8, cursor: 'pointer' }}
                    className="fb-sponsored-item">
                    <div style={{
                        height: 120, borderRadius: 8, overflow: 'hidden', marginBottom: 8,
                        background: 'linear-gradient(135deg, #1877f2 0%, #42a5f5 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span style={{ color: '#fff', fontSize: 28, fontWeight: 800 }}>CH</span>
                    </div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>ConnectHub Premium</p>
                    <p style={{ fontSize: 12, color: 'var(--fb-text-secondary)' }}>connecthub.app</p>
                </div>
            </div>

            <div className="fb-divider" />

            {/* Trending Topics */}
            <div>
                <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--fb-text-primary)', padding: '4px 8px 8px' }}>
                    Trending Topics
                </p>
                {topics.map(tag => (
                    <div key={tag} className="fb-nav-item" style={{ padding: '6px 8px', borderRadius: 8 }}>
                        <span style={{ color: 'var(--fb-blue)', fontWeight: 600, fontSize: 14 }}>{tag}</span>
                    </div>
                ))}
            </div>

            <div className="fb-divider" />

            {/* Contacts */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px 8px' }}>
                    <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--fb-text-primary)' }}>Contacts</p>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fb-text-secondary)', fontSize: 13 }}>
                        Search
                    </button>
                </div>
                {contacts.map(c => (
                    <div key={c.name} className="fb-nav-item" style={{ padding: '6px 8px' }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%', background: c.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0, position: 'relative'
                        }}>
                            {c.initials}
                            {/* Online dot */}
                            <div style={{
                                position: 'absolute', bottom: 1, right: 1,
                                width: 10, height: 10, borderRadius: '50%',
                                background: '#31a24c', border: '2px solid white'
                            }} />
                        </div>
                        <span style={{ fontWeight: 500, fontSize: 15 }}>{c.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
