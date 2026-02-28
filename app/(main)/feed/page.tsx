import { FeedList } from "../../../components/feed/FeedList"

export default function FeedPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Your Timeline</h2>
            <FeedList />
        </div>
    )
}
