'use client'
import React from "react";
import Link from "next/link";

// Career Tips Data
const careerTips = [
    {
        title: "Explore Career Paths",
        description: "Find your ideal career based on your interests and strengths.",
        icon: "🌐",
        link: "/career-guidance/paths",
    },
    {
        title: "Skill Development",
        description: "Access top resources to upgrade your skills and stand out.",
        icon: "🚀",
        link: "/career-guidance/skills",
    },
    {
        title: "Resume & Interview Prep",
        description: "Get expert advice for resumes and interviews.",
        icon: "📄",
        link: "/career-guidance/preparation",
    },
    {
        title: "Job Opportunities",
        description: "Discover jobs and internships tailored for IGNOU students.",
        icon: "💼",
        link: "/career-guidance/jobs",
    },
    {
        title: "Success Stories",
        description: "Be inspired by alumni who made it big.",
        icon: "🏆",
        link: "/career-guidance/success-stories",
    },
    {
        title: "Mentorship Programs",
        description: "Connect with mentors for personalized guidance.",
        icon: "🤝",
        link: "/career-guidance/mentorship",
    },
];

// Featured Resources Data
const resources = [
    {
        name: "Career Assessment",
        desc: "Discover your strengths with our free assessment.",
        icon: "🧭",
        link: "/career-guidance/assessment",
    },
    {
        name: "Workshops & Webinars",
        desc: "Join live events and learn from industry leaders.",
        icon: "🎤",
        link: "/career-guidance/events",
    },
    {
        name: "Scholarships & Grants",
        desc: "Find financial aid to support your studies.",
        icon: "🎓",
        link: "/career-guidance/scholarships",
    },
];

// Animated Contact Panel
function ContactPanel() {
    const [showForm, setShowForm] = React.useState(false);
    const [form, setForm] = React.useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = React.useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: "", email: "", message: "" });
            setShowForm(false);
        }, 2000);
    }

    return (
        <div className="relative max-w-lg mx-auto bg-gradient-to-r from-blue-100 to-blue-300 rounded-2xl shadow-2xl p-8 mt-12 animate-fade-in">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-4 text-center tracking-tight">Contact Us</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-3 p-6">
                <a
                    href="tel:+911234567890"
                    className="flex w-[max-content] items-center gap-2 text-sm bg-white hover:bg-blue-50 px-5 py-3 rounded-xl shadow transition"
                >
                    <span className="text-blue-600 text-sm">📞</span>
                    <span className="font-semibold text-blue-700 text-sm">+91 12345 67890</span>
                </a>
                <a
                    href="mailto:careers@ignouportal.com"
                    className="flex items-center gap-2 bg-white hover:bg-blue-50 px-5 tex-sm py-3 rounded-xl shadow transition"
                >
                    <span className="text-blue-600 text-sm">✉️</span>
                    <span className="font-semibold text-blue-700">careers@ignouportal.com</span>
                </a>
                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="flex items-center gap-2 bg-blue-700 text-white px-5 py-3 rounded-xl shadow hover:bg-blue-800 transition font-semibold"
                >
                    <span className="text-2xl">📝</span>
                    <span>Send a Message</span>
                </button>
            </div>
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl p-6 shadow-md animate-slide-down"
                >
                    <div className="mb-4">
                        <label className="block text-blue-700 font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-700 font-semibold mb-1">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
                    >
                        {submitted ? "Sending..." : "Send"}
                    </button>
                    {submitted && (
                        <p className="text-green-600 mt-3 text-center animate-pulse">Message sent! We'll get back soon.</p>
                    )}
                </form>
            )}
        </div>
    );
}

// Animation styles
const style = (
    <style>{`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-slide-down { animation: slideDown 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    `}</style>
);

export default function CareerGuidancePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
            {style}
            <section className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center tracking-tight">
                        Career Guidance Portal
                    </h1>
                    <p className="text-lg text-gray-700 mb-4 text-center max-w-xl">
                        Unlock your potential with expert advice, resources, and opportunities tailored for IGNOU students.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">#Career</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">#Guidance</span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">#IGNOU</span>
                    </div>
                </div>
                <div className="grid gap-8 md:grid-cols-2 mb-10">
                    {careerTips.map((tip) => (
                        <Link
                            key={tip.title}
                            href={tip.link}
                            className="group block bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl p-6 shadow-lg transition transform hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-3xl">{tip.icon}</span>
                                <h2 className="text-xl font-bold text-blue-800 group-hover:text-blue-900">{tip.title}</h2>
                            </div>
                            <p className="text-gray-600">{tip.description}</p>
                        </Link>
                    ))}
                </div>
                <h2 className="text-2xl font-extrabold text-blue-700 mb-6 text-center">Featured Resources</h2>
                <div className="grid gap-8 md:grid-cols-3 mb-10">
                    {resources.map((res) => (
                        <Link
                            key={res.name}
                            href={res.link}
                            className="group block bg-white border border-blue-100 hover:border-blue-300 rounded-xl p-5 shadow-lg transition transform hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-2xl">{res.icon}</span>
                                <h3 className="text-lg font-bold text-blue-800 group-hover:text-blue-900">{res.name}</h3>
                            </div>
                            <p className="text-gray-600 text-sm">{res.desc}</p>
                        </Link>
                    ))}
                </div>
                <div className="bg-blue-50 rounded-xl p-6 mb-10 text-center shadow">
                    <h3 className="text-xl font-bold text-blue-700 mb-2">Quick Tips for Success</h3>
                    <ul className="list-disc list-inside text-gray-700 text-left max-w-md mx-auto space-y-1">
                        <li>Set clear career goals and track your progress.</li>
                        <li>Network with professionals and peers.</li>
                        <li>Keep learning new skills relevant to your field.</li>
                        <li>Stay updated with industry trends and opportunities.</li>
                        <li>Seek mentorship and guidance regularly.</li>
                        <li>Maintain a positive mindset and be persistent.</li>
                    </ul>
                </div>
                <div className="mt-10">
                    <ContactPanel />
                </div>
            </section>
        </main>
    );
}