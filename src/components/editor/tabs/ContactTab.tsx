'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';

export default function ContactTab() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const emailSubject = encodeURIComponent("Hello Swaroop - Let's Connect!");
    const emailBody = encodeURIComponent(`Hi Swaroop,

I came across your portfolio and I'm impressed by your work!

I would love to connect with you regarding [please specify: job opportunity / collaboration / project inquiry / other].

Looking forward to hearing from you.

Best regards,
[Your Name]`);

    const socialLinks = [
        { icon: <Github size={20} />, label: 'GitHub', url: 'https://github.com/Swaroop-K-S', color: '#fff' },
        { icon: <Linkedin size={20} />, label: 'LinkedIn', url: 'https://linkedin.com/in/swaroop-ks', color: '#0A66C2' },
        { icon: <Twitter size={20} />, label: 'Twitter', url: 'https://twitter.com/SwaroopKS', color: '#1DA1F2' },
        { icon: <Mail size={20} />, label: 'Email', url: `https://mail.google.com/mail/?view=cm&fs=1&to=swaroopkudlurs@gmail.com&su=${emailSubject}&body=${emailBody}`, color: '#EA4335' },
    ];

    return (
        <div className="p-8 max-w-2xl mx-auto" style={{ background: 'var(--vscode-editor-bg)' }}>
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-white mb-2">Get In Touch</h1>
                <p style={{ color: 'var(--vscode-text-muted)' }}>
                    I&apos;m always open to new opportunities and collaborations
                </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
                {socialLinks.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-lg transition-all hover:scale-110"
                        style={{
                            background: 'var(--vscode-sidebar-bg)',
                            border: '1px solid var(--vscode-border)'
                        }}
                        title={social.label}
                    >
                        <span style={{ color: social.color }}>{social.icon}</span>
                    </a>
                ))}
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1" style={{ color: 'var(--vscode-text-muted)' }}>
                        Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-lg outline-none transition-all"
                        style={{
                            background: 'var(--vscode-sidebar-bg)',
                            border: '1px solid var(--vscode-border)',
                            color: 'var(--vscode-text)'
                        }}
                        placeholder="Your name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1" style={{ color: 'var(--vscode-text-muted)' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 rounded-lg outline-none transition-all"
                        style={{
                            background: 'var(--vscode-sidebar-bg)',
                            border: '1px solid var(--vscode-border)',
                            color: 'var(--vscode-text)'
                        }}
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1" style={{ color: 'var(--vscode-text-muted)' }}>
                        Message
                    </label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 rounded-lg outline-none transition-all resize-none"
                        style={{
                            background: 'var(--vscode-sidebar-bg)',
                            border: '1px solid var(--vscode-border)',
                            color: 'var(--vscode-text)'
                        }}
                        placeholder="Your message..."
                        rows={5}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitted}
                    className="w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 hover:opacity-90"
                    style={{
                        background: submitted ? '#22c55e' : 'var(--vscode-accent)',
                        color: 'white'
                    }}
                >
                    {submitted ? (
                        <>
                            <CheckCircle size={18} />
                            Message Sent!
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            Send Message
                        </>
                    )}
                </button>
            </form>

            {/* Code Footer */}
            <div className="mt-8 font-mono text-xs p-4 rounded-lg" style={{ background: 'var(--vscode-sidebar-bg)' }}>
                <span style={{ color: 'var(--vscode-text-muted)' }}>// You can also reach me at </span>
                <span style={{ color: '#CE9178' }}>&quot;swaroopkudlurs@gmail.com&quot;</span>
            </div>
        </div>
    );
}
