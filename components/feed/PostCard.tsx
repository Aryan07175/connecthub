import { Card, CardContent, CardHeader } from "../ui/card"
import { User, Heart, MessageCircle, Share2 } from "lucide-react"

export function PostCard({ author, content }: { author: string, content: string }) {
    return (
        <Card className="overflow-hidden border-slate-200">
            <CardHeader className="flex flex-row items-center gap-4 p-4 pb-2 border-b border-slate-50">
                <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                    <User size={20} />
                </div>
                <div>
                    <h4 className="font-semibold text-sm">{author}</h4>
                    <p className="text-xs text-slate-500">Just now</p>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-slate-800 whitespace-pre-wrap">{content}</p>

                <div className="flex gap-6 mt-4 pt-3 border-t border-slate-100">
                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors">
                        <Heart size={18} /> Like
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-500 transition-colors">
                        <MessageCircle size={18} /> Comment
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-green-500 transition-colors">
                        <Share2 size={18} /> Share
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
