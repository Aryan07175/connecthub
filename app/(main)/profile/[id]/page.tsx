"use client"

import { useNavigationStack } from "../../../../hooks/useNavigationStack"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../components/ui/card"
import { User, ArrowLeft } from "lucide-react"

export default function ProfilePage() {
    const params = useParams()
    const router = useRouter()
    const { push, pop, size, isEmpty } = useNavigationStack<string>()
    const profileId = params?.id as string

    useEffect(() => {
        // Every time we visit a new profile, push it to our history Stack!
        push(profileId)
    }, [profileId, push])

    const handleBack = () => {
        if (!isEmpty) {
            // Pop current profile off stack
            pop()
            router.back()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 border-b pb-4">
                <Button variant="ghost" size="icon" onClick={handleBack} disabled={size <= 1}>
                    <ArrowLeft size={20} />
                </Button>
                <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
            </div>

            <Card>
                <CardHeader className="flex flex-col items-center bg-gradient-to-r from-blue-100 to-indigo-100 p-8 rounded-t-lg">
                    <div className="h-24 w-24 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 mb-4">
                        <User size={40} />
                    </div>
                    <h3 className="text-xl font-bold">User {profileId}</h3>
                    <p className="text-sm text-slate-500 font-medium">✨ Stack size (history length): {size}</p>
                </CardHeader>
                <CardContent className="p-6 text-center text-slate-600">
                    <p>This user hasn't posted anything yet.</p>
                </CardContent>
            </Card>
        </div>
    )
}
