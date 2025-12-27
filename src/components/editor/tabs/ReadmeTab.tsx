'use client';

import React from 'react';

const readmeContent = `# 👋 Welcome to My Portfolio

## About Me

I'm a **Full Stack Developer** passionate about creating elegant solutions 
to complex problems. I specialize in building modern web applications using
React, Next.js, TypeScript, and Node.js.

## 🛠️ Tech Stack

\`\`\`javascript
const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Express', 'Python', 'Go'],
  database: ['PostgreSQL', 'MongoDB', 'Redis'],
  tools: ['Git', 'Docker', 'AWS', 'Vercel']
};
\`\`\`

## 🚀 Featured Projects

1. **E-Commerce Platform** - Full-stack e-commerce with real-time inventory
2. **AI Code Assistant** - VS Code extension for AI-powered suggestions
3. **Collaboration Tool** - Real-time whiteboard application

## 📫 Get in Touch

- **Email:** swaroopkudlurs@gmail.com
- **GitHub:** github.com/Swaroop-K-S
- **LinkedIn:** linkedin.com/in/swaroop-ks
- **Twitter:** @SwaroopKS

## 📄 License

This portfolio is open source under the MIT License.

---

*Built with ❤️ using Next.js and TypeScript*`;

export default function ReadmeTab() {
    return (
        <div className="p-6 max-w-3xl" style={{ background: 'var(--vscode-editor-bg)' }}>
            <div className="prose prose-invert max-w-none">
                {readmeContent.split('\n').map((line, index) => (
                    <MarkdownLine key={index} line={line} />
                ))}
            </div>
        </div>
    );
}

function MarkdownLine({ line }: { line: string }) {
    // H1
    if (line.startsWith('# ')) {
        return (
            <h1 className="text-2xl font-bold text-white mt-0 mb-4 pb-2 border-b" style={{ borderColor: 'var(--vscode-border)' }}>
                {line.slice(2)}
            </h1>
        );
    }

    // H2
    if (line.startsWith('## ')) {
        return (
            <h2 className="text-xl font-semibold text-white mt-6 mb-3">
                {line.slice(3)}
            </h2>
        );
    }

    // Code block markers
    if (line.startsWith('```')) {
        return null;
    }

    // Code content (simple detection)
    if (line.startsWith('const ') || line.startsWith('  ')) {
        return (
            <pre className="text-sm font-mono px-4 py-0.5" style={{ color: '#9CDCFE' }}>
                {line}
            </pre>
        );
    }

    // List items
    if (line.match(/^\d+\. /)) {
        const content = line.replace(/^\d+\. /, '');
        return (
            <div className="flex gap-2 ml-4 my-1" style={{ color: 'var(--vscode-text)' }}>
                <span style={{ color: 'var(--vscode-accent)' }}>•</span>
                <span dangerouslySetInnerHTML={{
                    __html: content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                }} />
            </div>
        );
    }

    // Bullet list
    if (line.startsWith('- ')) {
        const content = line.slice(2);
        return (
            <div className="flex gap-2 ml-4 my-1" style={{ color: 'var(--vscode-text)' }}>
                <span style={{ color: 'var(--vscode-accent)' }}>•</span>
                <span dangerouslySetInnerHTML={{
                    __html: content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                }} />
            </div>
        );
    }

    // Horizontal rule
    if (line === '---') {
        return <hr className="my-4 border-t" style={{ borderColor: 'var(--vscode-border)' }} />;
    }

    // Italic text
    if (line.startsWith('*') && line.endsWith('*')) {
        return (
            <p className="italic text-sm my-2" style={{ color: 'var(--vscode-text-muted)' }}>
                {line.slice(1, -1)}
            </p>
        );
    }

    // Empty line
    if (line === '') {
        return <div className="h-4" />;
    }

    // Regular paragraph with bold text support
    return (
        <p className="my-2" style={{ color: 'var(--vscode-text)' }}>
            <span dangerouslySetInnerHTML={{
                __html: line
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                    .replace(/`(.*?)`/g, '<code style="background: var(--vscode-sidebar-bg); padding: 2px 6px; border-radius: 4px; color: #CE9178;">$1</code>')
            }} />
        </p>
    );
}
