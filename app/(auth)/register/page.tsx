"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"

export default function RegisterPage() {
    const router = useRouter()

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulated registration
        router.push("/feed")
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Join ConnectHub
                    </CardTitle>
                    <p className="text-center text-sm text-slate-500 mt-2">Create an account to connect</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input type="text" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input type="password" required />
                        </div>
                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                            Create Account
                        </Button>
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-indigo-600 hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
