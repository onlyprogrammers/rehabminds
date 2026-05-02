import React from 'react';

interface QuickLink {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
}

const QuickLinks: React.FC = () => {
    const quickLinks: QuickLink[] = [
        {
            id: 'admissions',
            icon: '📋',
            title: 'Admissions',
            description: 'Apply now',
            href: '/admissions',
        },
        {
            id: 'academics',
            icon: '🎓',
            title: 'Academic',
            description: 'Course details',
            href: '/academics',
        },
        {
            id: 'results',
            icon: '📊',
            title: 'Results',
            description: 'Check marks',
            href: '/results',
        },
        {
            id: 'support',
            icon: '💬',
            title: 'Support',
            description: 'Get help',
            href: '/support',
        },
        {
            id: 'downloads',
            icon: '⬇️',
            title: 'Downloads',
            description: 'Resources',
            href: '/downloads',
        },
        {
            id: 'assignments',
            icon: '📝',
            title: 'Assignments',
            description: 'Submit work',
            href: '/assignments',
        },
        {
            id: 'gradecard',
            icon: '📄',
            title: 'Grade Card',
            description: 'View grades',
            href: '/gradecard',
        },
        {
            id: 'notes',
            icon: '📓',
            title: 'Notes',
            description: 'Study materials',
            href: '/notes',
        },
        {
            id: 'previouspapers',
            icon: '📚',
            title: 'Previous Papers',
            description: 'Exam papers',
            href: '/previouspapers',
        },
    ];

    return (
        <section className="py-4 px-4 md:py-12 md:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-0">Quick Links</h2>
                <div className="w-12 h-1 bg-blue-600 mb-3"></div>

                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                    {quickLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className="group p-[2px] md:p-2 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all duration-300 flex flex-row items-center flex-shrink-0 "
                         
                        >
                            <div className="text-sm md:text-2xl mr-[2px] group-hover:scale-110 transition-transform">
                                {link.icon}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-xs text-gray-900">
                                    {link.title}
                                </h3>
                                <p className="text-xs text-gray-600 group-hover:text-blue-600">
                                    {link.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickLinks;