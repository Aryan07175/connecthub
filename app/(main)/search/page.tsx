"use client"

import { useState } from "react"
import { Input } from "../../../components/ui/input"
import { Search as SearchIcon, User } from "lucide-react"

export default function SearchPage() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<{ id: string, name: string }[]>([])

    // Simulated Trie autocomplete wrapper
    const handleSearch = async (term: string) => {
        setQuery(term)

        if (term.length > 0) {
            // Dummy results for UI mapping
            const prefix = term.toLowerCase()
            const dummyTrieData = [
                { id: "1", name: "Alice" },
                { id: "2", name: "Alex" },
                { id: "3", name: "Alicia" },
                { id: "4", name: "Bob" }
            ]

            const matched = dummyTrieData.filter(d => d.name.toLowerCase().startsWith(prefix))
            setResults(matched)
        } else {
            setResults([])
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Find Friends</h2>

            <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                    className="pl-10 h-10 border-slate-300"
                    placeholder="Start typing to search users..."
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                />
                <div className="mt-2 text-xs text-slate-400 font-medium px-2">
                    ✨ Instant autocomplete powered by Prefix Tree (Trie)
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                    {results.map((user) => (
                        <div key={user.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 border-b last:border-0 cursor-pointer transition-colors">
                            <div className="bg-slate-200 h-10 w-10 rounded-full flex items-center justify-center text-slate-500">
                                <User size={18} />
                            </div>
                            <span className="font-semibold text-slate-800">{user.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
