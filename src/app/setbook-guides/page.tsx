import EnglishSetbooks from '@/app/setbook-guides/English/page'
import KiswahiliSetbooks from "@/app/setbook-guides/Kiswahili/page";
import React from "react";

export default function SetbookGuides() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="space-y-8 overflow-y-auto snap-y snap-mandatory h-screen">

                <section className="snap-start bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">English Setbok Guides</h2>
                    <div className="space-y-6">
                        <EnglishSetbooks/>
                    </div>
                </section>
                <section className="snap-start bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Kiswahili Setbok Guides</h2>
                    <div className="space-y-6">
                        <KiswahiliSetbooks/>
                    </div>
                </section>
            </div>

            </div>
            )

            }