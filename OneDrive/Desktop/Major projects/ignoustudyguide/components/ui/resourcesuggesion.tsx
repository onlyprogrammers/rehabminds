'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Search, BookOpen, FileText, Briefcase, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface DbMaterialItem {
    id: string;
    title: string;
    material_type: string;
    description: string | null;
    programme: string | null;
    course_code: string | null;
    price_paise: number;
    file_url: string;
    seller_name: string | null;
}

interface Programme {
    title: string;
    link: string;
}

function extractProgrammeCode(title: string): string {
    const match = title.match(/\(([^)]+)\)/);
    return match ? match[1] : title;
}

function getTypeIcon(type: string) {
    if (type === 'notes') return <FileText className="w-4 h-4" />;
    if (type === 'assignment') return <Briefcase className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
}

function getTypeBadgeClass(type: string) {
    switch (type) {
        case 'notes': return 'bg-blue-100 text-blue-700';
        case 'assignment': return 'bg-purple-100 text-purple-700';
        case 'book': return 'bg-green-100 text-green-700';
        default: return 'bg-orange-100 text-orange-700';
    }
}

function getCardClass(type: string) {
    switch (type) {
        case 'notes': return 'border-blue-200 bg-gradient-to-r from-blue-50 to-white';
        case 'book': return 'border-green-200 bg-gradient-to-r from-green-50 to-white';
        default: return 'border-slate-200';
    }
}

function getIconColorClass(type: string) {
    switch (type) {
        case 'notes': return 'text-blue-600';
        case 'book': return 'text-green-600';
        case 'assignment': return 'text-purple-600';
        default: return 'text-orange-600';
    }
}

export default function ResourceSuggestion() {
    const [programme, setProgramme] = useState<string | null>(null);
    const [programmeCode, setProgrammeCode] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedResources, setDisplayedResources] = useState<DbMaterialItem[]>([]);
    const [allResources, setAllResources] = useState<DbMaterialItem[]>([]);
    const [itemsToShow, setItemsToShow] = useState(4);
    const [filteredProgrammes, setFilteredProgrammes] = useState<Programme[]>([]);
    const [ProgrammesList, setProgrammesList] = useState<Programme[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedProgramme = localStorage.getItem('userProgramme');
        const savedProgrammeCode = localStorage.getItem('userProgrammeCode');
        if (savedProgramme) {
            setProgramme(savedProgramme);
            setProgrammeCode(savedProgrammeCode || extractProgrammeCode(savedProgramme));
        } else {
            setShowModal(true);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/programmes.json');
                const json = await res.json();
                setProgrammesList(json.papers);
            } catch {
                console.error('Failed to load programmes data');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!programmeCode) return;
        const fetchMaterials = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/materials?programme=${encodeURIComponent(programmeCode)}&status=approved`);
                const json = await res.json();
                const items: DbMaterialItem[] = json.materials || [];
                setAllResources(items);
                setDisplayedResources(items.slice(0, itemsToShow));
            } catch {
                setAllResources([]);
                setDisplayedResources([]);
            } finally {
                setLoading(false);
            }
        };
        fetchMaterials();
    }, [programmeCode]);

    useEffect(() => {
        setDisplayedResources(allResources.slice(0, itemsToShow));
    }, [itemsToShow, allResources]);

    const handleSelectProgramme = (prog: Programme) => {
        const code = extractProgrammeCode(prog.title);
        localStorage.setItem('userProgramme', prog.title);
        localStorage.setItem('userProgrammeCode', code);
        setProgramme(prog.title);
        setProgrammeCode(code);
        setShowModal(false);
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        const filtered = ProgrammesList
            .filter(p => p.title.toLowerCase().includes(value.toLowerCase()))
            .slice(0, 8);
        setFilteredProgrammes(filtered);
    };

    const handleChangeProgramme = () => {
        setSearchTerm('');
        setFilteredProgrammes([]);
        setShowModal(true);
    };

    const assignments = allResources.filter(r => r.material_type === 'assignment');

    return (
        <div className="min-h-aut bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">For you</h1>
                    <p className="text-slate-600 mt-1 text-xs">
                        Personalized resources for <span className="font-semibold text-blue-600">{programme || '...'}</span>
                        {programmeCode && programme !== programmeCode && (
                            <span className="ml-1 text-slate-400">({programmeCode})</span>
                        )}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleChangeProgramme}
                        className="border border-slate-300 hover:bg-slate-50 text-slate-600 px-2 py-1.5 rounded-lg font-medium transition text-xs flex items-center gap-1"
                        title="Change programme"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Change
                    </button>
                    <Link href={programmeCode ? `/assignments/${programmeCode.toLowerCase()}` : '/assignments'}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition text-xs">
                            View all
                        </button>
                    </Link>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {!loading && displayedResources.length === 0 && programme && (
                <div className="text-center py-8 text-slate-500 text-sm">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No materials found for <span className="font-semibold">{programmeCode}</span> yet.
                    <br />
                    <Link href="/materials" className="text-blue-600 hover:underline text-xs mt-1 inline-block">
                        Be the first to upload!
                    </Link>
                </div>
            )}

            {!loading && displayedResources.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {displayedResources.map((resource) => (
                            <div
                                key={resource.id}
                                className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-3 cursor-pointer border ${getCardClass(resource.material_type)}`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                        <span className={`${getIconColorClass(resource.material_type)}`}>
                                            {getTypeIcon(resource.material_type)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-semibold text-slate-900 text-xs truncate">{resource.title}</h3>
                                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ml-1 ${getTypeBadgeClass(resource.material_type)}`}>
                                                {resource.material_type}
                                            </span>
                                        </div>
                                        {resource.description && (
                                            <p className="text-xs text-slate-600 mb-1 line-clamp-2">{resource.description}</p>
                                        )}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {resource.course_code && (
                                                <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                                    {resource.course_code}
                                                </span>
                                            )}
                                            <span className="text-xs font-semibold text-blue-600">
                                                {resource.price_paise === 0 ? 'Free' : `₹${resource.price_paise / 100}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {itemsToShow < allResources.length && (
                        <div className="flex justify-center mb-6">
                            <button
                                onClick={() => setItemsToShow((prev) => prev + 4)}
                                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition flex items-center gap-2 text-sm"
                            >
                                Load more <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </>
            )}

            {assignments.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-3">
                        Assignments for {programmeCode}
                    </h2>
                    <div className="space-y-2">
                        {assignments.slice(0, 3).map((resource) => (
                            <div
                                key={`trending-${resource.id}`}
                                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-sm hover:shadow-md transition p-2 cursor-pointer border border-purple-200 flex items-center space-x-3"
                            >
                                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-0.5">
                                        <h3 className="font-semibold text-slate-900 text-xs truncate">{resource.title}</h3>
                                        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full ml-1 flex-shrink-0">
                                            {resource.price_paise === 0 ? 'Free' : `₹${resource.price_paise / 100}`}
                                        </span>
                                    </div>
                                    {resource.description && (
                                        <p className="text-xs text-slate-600 mb-0.5 line-clamp-1">{resource.description}</p>
                                    )}
                                    <div className="flex items-center space-x-1">
                                        {resource.course_code && (
                                            <span className="text-xs font-medium bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                                                {resource.course_code}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4">
                        <div className="text-center mb-6">
                            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                                <BookOpen className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Welcome to IGNOU Portal
                            </h2>
                            <p className="text-slate-600 mt-2">
                                Select your programme to get personalized resources
                            </p>
                        </div>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search programme..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2 overflow-y-auto max-h-72">
                            {filteredProgrammes.length > 0 ? (
                                filteredProgrammes.map((prog) => {
                                    const code = extractProgrammeCode(prog.title);
                                    return (
                                        <button
                                            key={prog.title}
                                            onClick={() => handleSelectProgramme(prog)}
                                            className="w-full text-left p-3 rounded-lg hover:bg-blue-50 border border-slate-200 hover:border-blue-400 transition text-slate-900 font-medium flex items-center justify-between"
                                        >
                                            <span>{prog.title}</span>
                                            {code !== prog.title && (
                                                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded ml-2 flex-shrink-0">
                                                    {code}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })
                            ) : searchTerm.length > 0 ? (
                                <p className="text-center text-slate-500 py-4">
                                    No programmes found
                                </p>
                            ) : (
                                <p className="text-center text-slate-400 py-4 text-sm">
                                    Type to search for your programme
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
