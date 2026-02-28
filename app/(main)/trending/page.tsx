"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Hash } from "lucide-react"

export default function TrendingPage() {
    const [trends, setTrends] = useState<{ tag: string, count: number }[]>([])

    useEffect(() => {
        // Stub data to simulate what the Array would return
        setTrends([
            { tag: "Typescript", count: 1542 },
            { tag: "Nextjs", count: 1205 },
            { tag: "DataStructures", count: 984 },
            { tag: "ConnectHub", count: 850 },
            { tag: "WebDev", count: 700 }
        ])
    }, [])

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Trending Topics</h2>
            <Card className="border shadow-none">
                <CardHeader className="bg-slate-50 rounded-t-lg border-b p-4">
                    <CardTitle className="text-sm text-slate-500 font-medium flex items-center gap-2">
                        ✨ Powered by Javascript Arrays
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="divide-y">
                        {trends.map((trend, index) => (
                            <li key={trend.tag} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <span className="text-lg font-bold text-slate-300 w-6">{index + 1}</span>
                                    <div>
                                        <span className="font-semibold flex items-center gap-1 text-blue-600">
                                            <Hash size={16} />{trend.tag}
                                        </span>
                                        <span className="text-xs text-slate-500">{trend.count.toLocaleString()} posts</span>
                                    </div>
                                </div>
                                <button className="text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full font-medium transition-colors">
                                    Follow
                                </button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
