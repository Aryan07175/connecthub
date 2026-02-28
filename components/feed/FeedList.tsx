"use client"

import { useState, useEffect } from "react"
import { useInfiniteFeed } from "../../hooks/useInfiniteFeed"
import { PostCard } from "./PostCard"
import { Button } from "../ui/button"

type Post = { id: string, authorId: string, content: string }

export function FeedList() {
    const feed = useInfiniteFeed<Post>()
    const [newContent, setNewContent] = useState("")

    // Simulate loading initial data
    useEffect(() => {
        feed.loadInitial([
            { id: "1", authorId: "Alice", content: "Just joined ConnectHub!" },
            { id: "2", authorId: "Bob", content: "Playing with LinkedLists today. O(1) insertions are great." }
        ])
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handlePost = () => {
        if (!newContent) return

        // Using O(1) Prepend from our custom Linked List Hook!
        feed.prepend({
            id: Math.random().toString(),
            authorId: "CurrentUser",
            content: newContent
        })

        setNewContent("")
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                <textarea
                    className="w-full resize-none outline-none text-lg p-2 placeholder:text-slate-400"
                    placeholder="What's on your mind?"
                    rows={3}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                />
                <div className="flex justify-between items-center mt-2 border-t pt-3">
                    <span className="text-xs text-slate-400 font-medium">✨ Powered by Doubly Linked List</span>
                    <Button onClick={handlePost} className="px-6 rounded-full bg-blue-600 hover:bg-blue-700">Post</Button>
                </div>
            </div>

            <div className="space-y-4">
                {feed.items.map((post) => (
                    <PostCard key={post.id} author={post.authorId} content={post.content} />
                ))}
            </div>
        </div>
    )
}
