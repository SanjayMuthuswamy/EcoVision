import React from 'react';

export const About: React.FC = () => {
    return (
        <section className="container mx-auto">
            <div className="w-full max-w-4xl mx-auto p-8 sm:p-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/80 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">How It Works</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                    <p>
                        EcoVision leverages advanced AI technology to perform a comparative analysis between two images. When you upload a "before" and an "after" image of a geographical area, the application sends them to the AI for processing.
                    </p>
                    <p>
                        The AI acts as an environmental analyst, carefully examining both images for visual evidence of deforestation . It then provides a clear determination and a concise explanation of its findings.
                    </p>
                </div>
            </div>
        </section>
    );
};