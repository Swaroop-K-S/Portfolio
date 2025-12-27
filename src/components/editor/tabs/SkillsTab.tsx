'use client';

import React from 'react';

const skillsJson = `{
  "languages": [
    { "name": "TypeScript", "level": 95, "icon": "📘" },
    { "name": "JavaScript", "level": 95, "icon": "🟨" },
    { "name": "Python", "level": 85, "icon": "🐍" },
    { "name": "Go", "level": 70, "icon": "🔵" },
    { "name": "Rust", "level": 60, "icon": "🦀" }
  ],
  
  "frameworks": [
    { "name": "React", "level": 95, "icon": "⚛️" },
    { "name": "Next.js", "level": 90, "icon": "▲" },
    { "name": "Node.js", "level": 90, "icon": "🟢" },
    { "name": "Express", "level": 85, "icon": "🚂" },
    { "name": "Tailwind CSS", "level": 90, "icon": "🌊" }
  ],
  
  "databases": [
    { "name": "PostgreSQL", "level": 85, "icon": "🐘" },
    { "name": "MongoDB", "level": 80, "icon": "🍃" },
    { "name": "Redis", "level": 75, "icon": "🔴" }
  ],
  
  "tools": [
    { "name": "Git", "level": 90, "icon": "🔀" },
    { "name": "Docker", "level": 85, "icon": "🐳" },
    { "name": "AWS", "level": 80, "icon": "☁️" },
    { "name": "Linux", "level": 85, "icon": "🐧" }
  ]
}`;

export default function SkillsTab() {
    const lines = skillsJson.split('\n');

    return (
        <div className="p-4 font-mono text-sm" style={{ background: 'var(--vscode-editor-bg)' }}>
            {lines.map((line, index) => (
                <div key={index} className="code-line">
                    <span className="line-number">{index + 1}</span>
                    <span className="line-content">
                        <JsonHighlight line={line} />
                    </span>
                </div>
            ))}
        </div>
    );
}

function JsonHighlight({ line }: { line: string }) {
    let highlighted = line
        .replace(/(".*?"):/g, '<span style="color:#9CDCFE">$1</span>:')
        .replace(/: (".*?")/g, ': <span style="color:#CE9178">$1</span>')
        .replace(/: (\d+)/g, ': <span style="color:#B5CEA8">$1</span>')
        .replace(/(\{|\}|\[|\])/g, '<span style="color:#FFD700">$1</span>');

    return <span dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />;
}
