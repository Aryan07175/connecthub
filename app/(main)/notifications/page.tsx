"use client"

import { useState, useEffect } from "react"
import { Bell, CheckCircle2 } from "lucide-react"

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<{ id: string, message: string }[]>([])

    useEffect(() => {
        setNotifications([
            { id: "1", message: "Alice liked your post!" },
            { id: "2", message: "Bob started following you." },
            { id: "3", message: "System: Welcome to ConnectHub." }
        ])
    }, [])

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Notifications</h2>

            <div className="bg-slate-50 border p-4 rounded-lg mb-6 flex items-center gap-3">
                <span className="text-sm font-medium text-slate-500">
                    ✨ Delivered sequentially (FIFO) using a Queue Data Structure
                </span>
            </div>

            <div className="space-y-3">
                {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-slate-300 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                            <Bell size={20} />
                        </div>
                        <div className="flex-1 pt-1">
                            <p className="text-slate-800 font-medium">{notif.message}</p>
                            <p className="text-xs text-slate-400 mt-1">Just now</p>
                        </div>
                        <button className="text-slate-300 hover:text-green-500 transition-colors" title="Mark as Read">
                            <CheckCircle2 size={22} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
