'use client';

import React from 'react';
import { Building2, Calendar, MapPin } from 'lucide-react';

const experiences = [
    {
        company: 'Tech Corp',
        role: 'Senior Software Engineer',
        period: '2022 - Present',
        location: 'San Francisco, CA',
        description: 'Leading frontend development for the main product. Architected and built new features using React and TypeScript.',
        highlights: [
            'Reduced bundle size by 40% through code splitting and lazy loading',
            'Mentored 3 junior developers',
            'Implemented real-time collaboration features using WebSocket'
        ]
    },
    {
        company: 'StartupXYZ',
        role: 'Full Stack Developer',
        period: '2020 - 2022',
        location: 'Remote',
        description: 'Built and maintained multiple microservices and frontend applications.',
        highlights: [
            'Developed RESTful APIs serving 100k+ daily active users',
            'Migrated legacy codebase to TypeScript',
            'Set up CI/CD pipelines using GitHub Actions'
        ]
    },
    {
        company: 'Digital Agency',
        role: 'Junior Developer',
        period: '2019 - 2020',
        location: 'New York, NY',
        description: 'Worked on various client projects building responsive web applications.',
        highlights: [
            'Built 10+ client websites using React and Next.js',
            'Collaborated with design team to implement pixel-perfect UIs',
            'Learned best practices for web accessibility'
        ]
    }
];

export default function ExperienceTab() {
    const codeStart = `import React from 'react';
import { Experience } from '@/types';

export const experiences: Experience[] = [`;

    const codeEnd = `];

export default function Timeline() {
  return (
    <div className="timeline">
      {experiences.map((exp, index) => (
        <TimelineItem key={index} experience={exp} />
      ))}
    </div>
  );
}`;

    return (
        <div className="p-4" style={{ background: 'var(--vscode-editor-bg)' }}>
            {/* Code Header */}
            <div className="font-mono text-sm mb-6">
                {codeStart.split('\n').map((line, i) => (
                    <div key={i} className="code-line">
                        <span className="line-number">{i + 1}</span>
                        <span className="line-content">
                            <span dangerouslySetInnerHTML={{
                                __html: line
                                    .replace(/(import|export|from|const)/g, '<span style="color:#C586C0">$1</span>')
                                    .replace(/(".*?"|'.*?')/g, '<span style="color:#CE9178">$1</span>')
                            }} />
                        </span>
                    </div>
                ))}
            </div>

            {/* Experience Cards */}
            <div className="space-y-4 ml-8 mb-6">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-lg border-l-4"
                        style={{
                            background: 'var(--vscode-sidebar-bg)',
                            borderColor: 'var(--vscode-accent)'
                        }}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="font-semibold text-white">{exp.role}</h3>
                                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--vscode-accent)' }}>
                                    <Building2 size={14} />
                                    {exp.company}
                                </div>
                            </div>
                            <div className="text-right text-sm" style={{ color: 'var(--vscode-text-muted)' }}>
                                <div className="flex items-center gap-1 justify-end">
                                    <Calendar size={12} />
                                    {exp.period}
                                </div>
                                <div className="flex items-center gap-1 justify-end mt-1">
                                    <MapPin size={12} />
                                    {exp.location}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm mb-3" style={{ color: 'var(--vscode-text-muted)' }}>
                            {exp.description}
                        </p>

                        <ul className="space-y-1">
                            {exp.highlights.map((highlight, i) => (
                                <li key={i} className="text-sm flex items-start gap-2">
                                    <span style={{ color: 'var(--vscode-accent)' }}>•</span>
                                    <span style={{ color: 'var(--vscode-text)' }}>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Code Footer */}
            <div className="font-mono text-sm">
                {codeEnd.split('\n').map((line, i) => (
                    <div key={i} className="code-line">
                        <span className="line-number">{i + 10}</span>
                        <span className="line-content">
                            <span dangerouslySetInnerHTML={{
                                __html: line
                                    .replace(/(export|default|function|return|map)/g, '<span style="color:#C586C0">$1</span>')
                                    .replace(/(".*?"|'.*?')/g, '<span style="color:#CE9178">$1</span>')
                            }} />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
