'use client';
import React, { useState } from 'react';

export default function BrowseMaterials() {
    const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);

    const programs = [
        { id: 1, name: 'B.Tech', color: 'bg-gradient-to-br from-blue-500 to-blue-700', stroke: 'border-2 border-blue-300', icon: '⚡', glow: 'shadow-blue-500/50' },
        { id: 2, name: 'MBA', color: 'bg-gradient-to-br from-green-500 to-green-700', stroke: 'border-2 border-green-300', icon: '💼', glow: 'shadow-green-500/50' },
        { id: 3, name: 'BCA', color: 'bg-gradient-to-br from-purple-500 to-purple-700', stroke: 'border-2 border-purple-300', icon: '💻', glow: 'shadow-purple-500/50' },
        { id: 4, name: 'BA', color: 'bg-gradient-to-br from-pink-500 to-pink-700', stroke: 'border-2 border-pink-300', icon: '📚', glow: 'shadow-pink-500/50' },
        { id: 5, name: 'B.Sc', color: 'bg-gradient-to-br from-orange-500 to-orange-700', stroke: 'border-2 border-orange-300', icon: '🔬', glow: 'shadow-orange-500/50' },
        { id: 6, name: 'M.Tech', color: 'bg-gradient-to-br from-red-500 to-red-700', stroke: 'border-2 border-red-300', icon: '🔧', glow: 'shadow-red-500/50' },
        { id: 7, name: 'MA', color: 'bg-gradient-to-br from-indigo-500 to-indigo-700', stroke: 'border-2 border-indigo-300', icon: '🎓', glow: 'shadow-indigo-500/50' },
    ];

    return (
        <div className="w-full py-4 px-2 sm:px-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                }} />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-16 left-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute top-20 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-16 left-8 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-50"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-left mb-4 pr-4">
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Browse Resources
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed px-2">
                        Discover comprehensive study materials for your IGNOU program
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
                </div>

                {/* Programs Scrollable */}
                <div className="relative mb-1">
                    <div className="flex gap-0 sm:gap-px overflow-x-auto pb-1 px-0.5 scrollbar-hide scroll-smooth">
                        {programs.map((program, index) => (
                            <div key={program.id} className="flex flex-col items-center group flex-shrink-0 w-20 sm:w-32">
                                {/* Circle Button */}
                                <div className="relative mb-0.5">
                                    <button
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${program.color} ${program.stroke} text-white font-bold flex items-center justify-center transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-125 hover:rotate-180 relative z-10`}
                                        onMouseEnter={() => setHoveredProgram(program.id)}
                                        onMouseLeave={() => setHoveredProgram(null)}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            transform: hoveredProgram === program.id ? 'scale(1.25) rotate(180deg)' : 'scale(1) rotate(0deg)',
                                            boxShadow: hoveredProgram === program.id ? `0 0 20px ${program.glow.replace('shadow-', '').replace('/50', '')}50` : ''
                                        }}
                                    >
                                        <span className="text-lg sm:text-2xl transform group-hover:scale-110 transition-transform duration-300">
                                            {program.icon}
                                        </span>
                                    </button>

                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 rounded-full ${program.color} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 -z-10`}></div>

                                    {/* Ripple Effect */}
                                    <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
                                </div>

                                {/* Program Name */}
                                <div className="text-center">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                                        {program.name}
                                    </h3>
                                    <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto mt-px"></div>
                                </div>
                            </div>
                        ))}

                        {/* Other Programs */}
                        <div className="flex flex-col items-center group flex-shrink-0 w-28 sm:w-32">
                            <div className="relative mb-0.5">
                                <button className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-gray-300 text-white font-bold flex items-center justify-center transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-125 hover:rotate-180 relative z-10"
                                    onMouseEnter={() => setHoveredProgram(8)}
                                    onMouseLeave={() => setHoveredProgram(null)}
                                    style={{
                                        transform: hoveredProgram === 8 ? 'scale(1.25) rotate(180deg)' : 'scale(1) rotate(0deg)',
                                        boxShadow: hoveredProgram === 8 ? '0 0 20px rgba(107, 114, 128, 0.5)' : ''
                                    }}
                                >
                                    <span className="text-lg sm:text-2xl transform group-hover:scale-110 transition-transform duration-300">🎯</span>
                                </button>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 -z-10"></div>
                                <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                                    Other Programs
                                </h3>
                                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 mx-auto mt-0.5"></div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicators */}
                    <div className="flex justify-center mt-1">
                        <div className="flex gap-0.5">
                            {Array.from({ length: programs.length + 1 }, (_, index) => (
                                <div key={index} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
                        <span className="text-lg animate-bounce">👆</span>
                        <p className="text-xs sm:text-sm text-gray-700 font-medium">Hover over any program to explore materials</p>
                    </div>
                </div>

             
            </div>
        </div>
    );
}