"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulated login
        console.log("Logged in:", email)
        router.push("/feed")
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        ConnectHub
                    </CardTitle>
                    <p className="text-center text-sm text-slate-500 mt-2">Sign in to your account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Component (Hash Map Array login bypass)</label>
                            <Input
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input type="password" required />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Sign In
                        </Button>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
