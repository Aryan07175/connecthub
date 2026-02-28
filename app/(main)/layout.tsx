import Link from "next/link"
import { Home, Search, Bell, TrendingUp, User } from "lucide-react"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r bg-white p-4">
                <h1 className="text-2xl font-bold mb-8 text-blue-600 px-4">ConnectHub</h1>
                <nav className="space-y-2">
                    <Link href="/feed" className="flex items-center space-x-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <Home size={20} />
                        <span className="font-medium">Feed</span>
                    </Link>
                    <Link href="/search" className="flex items-center space-x-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <Search size={20} />
                        <span className="font-medium">Search</span>
                    </Link>
                    <Link href="/notifications" className="flex items-center space-x-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <Bell size={20} />
                        <span className="font-medium">Notifications</span>
                    </Link>
                    <Link href="/trending" className="flex items-center space-x-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <TrendingUp size={20} />
                        <span className="font-medium">Trending</span>
                    </Link>
                    <Link href="/profile/me" className="flex items-center space-x-3 rounded-lg px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                        <User size={20} />
                        <span className="font-medium">Profile</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-8">
                <div className="mx-auto max-w-2xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
