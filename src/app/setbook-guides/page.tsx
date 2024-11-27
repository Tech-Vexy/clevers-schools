import EnglishSetbookGuides from '@/app/setbook-guides/English/page'
import KiswahiliSetbookGuides from "@/app/setbook-guides/Kiswahili/page";
import React from "react";

export default function SetbookGuides() {
    return (
        <div className="min-h-screen h-full bg-gray-50">
            <div className="space-y-8 overflow-hidden snap-y snap-mandatory">
                <section className="snap-start bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">English Setbook Guides</h2>
                    <div className="space-y-6">
                        <EnglishSetbookGuides/>
                    </div>
                </section>

                <section className="snap-start bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Kiswahili Setbook Guides</h2>
                    <div className="space-y-6">
                        <KiswahiliSetbookGuides/>
                    </div>
                </section>
            </div>
        </div>
    )
}