'use client';

import React, { useState, useEffect } from 'react';
import { useVSCode } from '@/context/VSCodeContext';
import { User, Rocket, Briefcase, Mail, Terminal, Github, Linkedin, ArrowRight } from 'lucide-react';

const shortcuts = [
    { action: 'Command Palette', key: 'Ctrl+Shift+P', icon: '⌘' },
    { action: 'Quick Open', key: 'Ctrl+P', icon: '📁' },
    { action: 'Search Files', key: 'Ctrl+Shift+F', icon: '🔍' },
    { action: 'Terminal', key: 'Ctrl+`', icon: '💻' },
    { action: 'Toggle Sidebar', key: 'Ctrl+B', icon: '📋' },
    { action: 'Extensions', key: 'Ctrl+Shift+X', icon: '🧩' },
];

const quickActions = [
    { label: 'About Me', file: 'about.tsx', icon: User, color: '#667eea', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { label: 'Projects', file: 'project1.tsx', icon: Rocket, color: '#f093fb', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { label: 'Experience', file: 'experience.tsx', icon: Briefcase, color: '#4facfe', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { label: 'Contact', file: 'contact.tsx', icon: Mail, color: '#43e97b', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
];

const stats = [
    { label: 'Projects', value: '15+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Experience', value: '2+ yrs' },
];

export default function WelcomeTab() {
    const { openTab, setTerminalVisible } = useVSCode();
    const [mounted, setMounted] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleQuickAction = (action: typeof quickActions[0]) => {
        openTab({
            id: action.file,
            name: action.file.charAt(0).toUpperCase() + action.file.slice(1),
            icon: action.file.split('.').pop() || 'file',
            type: 'file',
            path: action.file,
        });
    };

    return (
        <div
            className="h-full overflow-auto"
            style={{
                background: 'linear-gradient(180deg, #1e1e1e 0%, #151515 100%)',
            }}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                />
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
                    style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}
                />
            </div>

            <div className="relative max-w-4xl mx-auto px-8 py-12">
                {/* Hero Section */}
                <div
                    className="text-center mb-16"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {/* Animated VS Code Logo */}
                    <div className="relative inline-block mb-8">
                        <div
                            className="absolute inset-0 rounded-full blur-xl opacity-50"
                            style={{ background: 'linear-gradient(135deg, #0098ff 0%, #00d4ff 100%)' }}
                        />
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="relative">
                            <path d="M95 18.5L77 10.5L68.5 25.5L95 18.5Z" fill="#0065A9" />
                            <path d="M77 10.5L25 55L5 40L25 80L77 90L95 82V18.5L77 10.5Z" fill="#007ACC" />
                            <path d="M77 10.5V90L95 82V18.5L77 10.5Z" fill="#1F9CF0" />
                            <path d="M25 55L5 40V60L25 80L77 90V10.5L25 55Z" fill="#0065A9" fillOpacity="0.8" />
                        </svg>
                    </div>

                    <h1
                        className="text-4xl font-light mb-4 tracking-tight"
                        style={{
                            background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Welcome, I&apos;m <span style={{ fontWeight: 600 }}>Swaroop KS</span>
                    </h1>

                    <p
                        className="text-lg mb-4"
                        style={{ color: 'var(--vscode-text-muted)' }}
                    >
                        AI Innovator & Full Stack Developer
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--vscode-text-muted)' }}>
                        <span className="inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Available for opportunities
                        </span>
                    </div>
                </div>

                {/* Stats Section */}
                <div
                    className="flex justify-center gap-12 mb-16"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
                    }}
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div
                                className="text-3xl font-bold mb-1"
                                style={{
                                    background: 'linear-gradient(135deg, #0098ff 0%, #00d4ff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--vscode-text-muted)' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions Grid */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                    }}
                >
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={index}
                                onClick={() => handleQuickAction(action)}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className="relative group p-6 rounded-xl transition-all duration-300 overflow-hidden"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    transform: hoveredCard === index ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                                    boxShadow: hoveredCard === index ? '0 20px 40px -10px rgba(0,0,0,0.5)' : 'none',
                                }}
                            >
                                {/* Gradient Border on Hover */}
                                <div
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: action.gradient,
                                        padding: '1px',
                                    }}
                                >
                                    <div className="w-full h-full rounded-xl" style={{ background: '#1e1e1e' }} />
                                </div>

                                {/* Icon with Glow */}
                                <div
                                    className="relative w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300"
                                    style={{
                                        background: action.gradient,
                                        boxShadow: hoveredCard === index ? `0 0 30px ${action.color}40` : 'none',
                                    }}
                                >
                                    <Icon size={24} className="text-white" />
                                </div>

                                <div className="relative text-center">
                                    <span className="text-sm font-medium text-white">{action.label}</span>
                                    <ArrowRight
                                        size={14}
                                        className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                        style={{ color: action.color }}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Keyboard Shortcuts */}
                <div
                    className="mb-12 p-6 rounded-xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
                    }}
                >
                    <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-center" style={{ color: 'var(--vscode-text-muted)' }}>
                        ⌨️ Keyboard Shortcuts
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {shortcuts.map((shortcut, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:translate-x-1"
                                style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                            >
                                <span className="text-sm" style={{ color: 'var(--vscode-text-muted)' }}>
                                    {shortcut.action}
                                </span>
                                <kbd
                                    className="px-2 py-1 text-xs rounded font-mono"
                                    style={{
                                        background: 'rgba(0, 152, 255, 0.1)',
                                        border: '1px solid rgba(0, 152, 255, 0.2)',
                                        color: 'var(--vscode-accent)'
                                    }}
                                >
                                    {shortcut.key}
                                </kbd>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links & Terminal CTA */}
                <div
                    className="text-center"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
                    }}
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <a
                            href="https://github.com/Swaroop-K-S"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg transition-all duration-200 hover:scale-110"
                            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/swaroop-ks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg transition-all duration-200 hover:scale-110"
                            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>

                    <button
                        onClick={() => setTerminalVisible(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, #0098ff 0%, #00d4ff 100%)',
                            boxShadow: '0 4px 20px rgba(0, 152, 255, 0.3)'
                        }}
                    >
                        <Terminal size={16} />
                        Open Interactive Terminal
                    </button>

                    <p className="mt-4 text-xs" style={{ color: 'var(--vscode-text-muted)' }}>
                        Try commands like <code className="px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>help</code>,
                        <code className="px-2 py-1 rounded mx-1" style={{ background: 'rgba(255,255,255,0.05)' }}>about</code>, or
                        <code className="px-2 py-1 rounded ml-1" style={{ background: 'rgba(255,255,255,0.05)' }}>neofetch</code>
                    </p>
                </div>
            </div>
        </div>
    );
}
