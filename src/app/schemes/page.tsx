import React from 'react';
import Form1Schemes from '@/app/schemes/form-1/page';
import Form2Schemes from '@/app/schemes/form-2/page';
import Form3Schemes from '@/app/schemes/form-3/page';
import Form4Schemes from '@/app/schemes/form-4/page';
import Grade1Schemes from '@/app/schemes/grade-1/page';
import Grade2Schemes from '@/app/schemes/grade-2/page';
import Grade3Schemes from '@/app/schemes/grade-3/page';
import Grade4Schemes from '@/app/schemes/grade-4/page';
import Grade5Schemes from '@/app/schemes/grade-5/page';
import Grade6Schemes from '@/app/schemes/grade-6/page';
import Grade7Schemes from '@/app/schemes/grade-7/page';
import Grade8Schemes from '@/app/schemes/grade-8/page';
import PP1Schemes from '@/app/schemes/pp1/page';
import PP2Schemes from '@/app/schemes/pp2/page';

const SchemesLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-8 overflow-y-auto snap-y snap-mandatory h-screen">
                    {/* PP1 & PP2 Section */}
                    <section className="snap-start bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Pre-Primary Schemes</h2>
                        <div className="space-y-6">
                            <PP1Schemes />
                            <PP2Schemes />
                        </div>
                    </section>

                    {/* Grade 1-8 Section */}
                    <section className="snap-start bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Primary School Schemes</h2>
                        <div className="space-y-6">
                            <Grade1Schemes />
                            <Grade2Schemes />
                            <Grade3Schemes />
                            <Grade4Schemes />
                            <Grade5Schemes />
                            <Grade6Schemes />
                            <Grade7Schemes />
                            <Grade8Schemes />
                        </div>
                    </section>

                    {/* Form 1-4 Section */}
                    <section className="snap-start bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Secondary School Schemes</h2>
                        <div className="space-y-6">
                            <Form1Schemes />
                            <Form2Schemes />
                            <Form3Schemes />
                            <Form4Schemes />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SchemesLayout;