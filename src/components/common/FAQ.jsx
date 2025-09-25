'use client';
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const FAQ = ({ questions, name }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className={`${inter.className} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 md:px-10 lg:px-20`}>
            <div className='max-w-5xl mx-auto'>
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 text-white tracking-tight">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto">
                        Te resolvemos las dudas más comunes sobre el proceso de solicitud de {name}
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {questions.map((item, index) => {
                        const isOpen = openIndex === index;        
                        return (
                            <div 
                                key={item.id}
                                className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20"
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full p-4 sm:p-5 md:p-6 text-left flex items-center gap-4 focus:outline-none focus:bg-white/[0.05] group"
                                >
                                    {/* Arrow on the left */}
                                    <div 
                                        className={`w-5 h-5 flex-shrink-0 items-center justify-center text-gray-400 transition-all duration-300 ${
                                            isOpen ? 'rotate-180 text-blue-400' : 'group-hover:text-gray-300'
                                        }`}
                                    >
                                        <svg
                                            className="w-full h-full"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>

                                    {/* Question text */}
                                    <div className="flex-1">
                                        <h3 className="text-sm sm:text-md md:text-lg font-medium text-white group-hover:text-blue-100 transition-colors">
                                            {item.question}
                                        </h3>
                                    </div>
                                </button>
                                
                                <div className={`overflow-hidden transition-all duration-300 ${
                                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                                        <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-3 sm:mb-4"></div>
                                        <div className="text-gray-300 font-light text-sm sm:text-base md:text-md leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>    
            </div>
        </div>
    );
}

export default FAQ;
