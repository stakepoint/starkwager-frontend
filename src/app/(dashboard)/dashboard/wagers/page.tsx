"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Wagers() {
    return (
        <div className="w-full max-w-xl mx-auto py-8">
            <h1 className="text-2xl font-bold text-blue-1 mb-6">Wager States Demo</h1>
            
            <div className="flex flex-col gap-4">
                <Link href="/dashboard/wagers/summary?state=pending">
                    <Button className="w-full">View Pending Wager</Button>
                </Link>
                
                <Link href="/dashboard/wagers/summary?state=won">
                    <Button className="w-full">View Won Wager</Button>
                </Link>
                
                <Link href="/dashboard/wagers/summary?state=lost">
                    <Button className="w-full">View Lost Wager</Button>
                </Link>
            </div>
        </div>
    );
}