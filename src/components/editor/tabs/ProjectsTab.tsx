'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Star, GitFork, Code, Eye, Maximize2, Minimize2, RefreshCw, Monitor, Smartphone, Tablet } from 'lucide-react';

interface Project {
    id: string;
    name: string;
    description: string;
    tech: string[];
    github?: string;
    live?: string;
    stars: number;
    forks: number;
    previewUrl?: string;
}

const projects: Record<string, Project> = {
    'project1.tsx': {
        id: 'project1',
        name: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis'],
        github: 'https://github.com/Swaroop-K-S/ecommerce',
        live: 'https://ecommerce-demo.vercel.app',
        previewUrl: 'https://vercel.com',
        stars: 234,
        forks: 45,
    },
    'project2.tsx': {
        id: 'project2',
        name: 'AI Code Assistant',
        description: 'VS Code extension that provides AI-powered code suggestions and documentation generation.',
        tech: ['TypeScript', 'OpenAI API', 'VS Code API', 'Node.js'],
        github: 'https://github.com/Swaroop-K-S/ai-assistant',
        live: 'https://marketplace.visualstudio.com',
        previewUrl: 'https://code.visualstudio.com',
        stars: 567,
        forks: 89,
    },
    'project3.tsx': {
        id: 'project3',
        name: 'Real-time Collaboration Tool',
        description: 'A Figma-like collaborative whiteboard with real-time sync, drawing tools, and team features.',
        tech: ['React', 'Socket.io', 'Canvas API', 'MongoDB', 'Docker'],
        github: 'https://github.com/Swaroop-K-S/collab-board',
        live: 'https://collab-board.vercel.app',
        previewUrl: 'https://excalidraw.com',
        stars: 189,
        forks: 32,
    },
};

type ViewMode = 'split' | 'code' | 'preview';
type DeviceSize = 'desktop' | 'tablet' | 'mobile';

const deviceSizes: Record<DeviceSize, { width: string; icon: React.ReactNode }> = {
    desktop: { width: '100%', icon: <Monitor size={14} /> },
    tablet: { width: '768px', icon: <Tablet size={14} /> },
    mobile: { width: '375px', icon: <Smartphone size={14} /> },
};

export default function ProjectsTab({ projectId }: { projectId: string }) {
    const project = projects[projectId];
    const [viewMode, setViewMode] = useState<ViewMode>('split');
    const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop');
    const [isRefreshing, setIsRefreshing] = useState(false);

    if (!project) {
        return (
            <div className="flex items-center justify-center h-full">
                <p style={{ color: 'var(--vscode-text-muted)' }}>Project not found</p>
            </div>
        );
    }

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const codeContent = `import React from 'react';
import { Project } from '@/types';

/**
 * ${project.name}
 * ${project.description}
 */
export const project: Project = {
  name: "${project.name}",
  
  description: \`
    ${project.description}
  \`,
  
  technologies: ${JSON.stringify(project.tech, null, 4).replace(/\n/g, '\n  ')},
  
  links: {
    github: "${project.github || ''}",
    live: "${project.live || ''}"
  },
  
  stats: {
    stars: ${project.stars},
    forks: ${project.forks}
  }
};

export default function ${project.name.replace(/\s+/g, '')}() {
  return (
    <article className="project-card">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      
      <div className="tech-stack">
        {project.technologies.map(tech => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="project-links">
        <a href={project.links.github}>
          <Github /> Source Code
        </a>
        <a href={project.links.live}>
          <ExternalLink /> Live Demo
        </a>
      </div>
    </article>
  );
}`;

    const lines = codeContent.split('\n');

    return (
        <div className="h-full flex flex-col overflow-hidden" style={{ background: 'var(--vscode-editor-bg)' }}>
            {/* Toolbar */}
            <div
                className="flex items-center justify-between px-4 py-2 border-b"
                style={{
                    background: 'linear-gradient(180deg, var(--vscode-sidebar-bg) 0%, #2a2a2a 100%)',
                    borderColor: 'var(--vscode-border)'
                }}
            >
                {/* Project Info */}
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="text-sm font-semibold text-white">{project.name}</h2>
                        <div className="flex items-center gap-3 mt-0.5">
                            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--vscode-text-muted)' }}>
                                <Star size={12} className="text-yellow-400" />
                                {project.stars}
                            </span>
                            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--vscode-text-muted)' }}>
                                <GitFork size={12} />
                                {project.forks}
                            </span>
                        </div>
                    </div>
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-2">
                    {/* View Mode Toggle */}
                    <div
                        className="flex items-center rounded-lg p-0.5"
                        style={{ background: 'rgba(0,0,0,0.3)' }}
                    >
                        <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'code' ? 'text-white' : ''
                                }`}
                            style={{
                                background: viewMode === 'code' ? 'var(--vscode-accent)' : 'transparent',
                                color: viewMode === 'code' ? 'white' : 'var(--vscode-text-muted)'
                            }}
                        >
                            <Code size={14} />
                            Code
                        </button>
                        <button
                            onClick={() => setViewMode('split')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'split' ? 'text-white' : ''
                                }`}
                            style={{
                                background: viewMode === 'split' ? 'var(--vscode-accent)' : 'transparent',
                                color: viewMode === 'split' ? 'white' : 'var(--vscode-text-muted)'
                            }}
                        >
                            <Maximize2 size={14} />
                            Split
                        </button>
                        <button
                            onClick={() => setViewMode('preview')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'preview' ? 'text-white' : ''
                                }`}
                            style={{
                                background: viewMode === 'preview' ? 'var(--vscode-accent)' : 'transparent',
                                color: viewMode === 'preview' ? 'white' : 'var(--vscode-text-muted)'
                            }}
                        >
                            <Eye size={14} />
                            Preview
                        </button>
                    </div>

                    {/* Device Size Toggle (only in preview/split mode) */}
                    {viewMode !== 'code' && (
                        <div
                            className="flex items-center rounded-lg p-0.5 ml-2"
                            style={{ background: 'rgba(0,0,0,0.3)' }}
                        >
                            {(Object.keys(deviceSizes) as DeviceSize[]).map(size => (
                                <button
                                    key={size}
                                    onClick={() => setDeviceSize(size)}
                                    className="p-1.5 rounded-md transition-all"
                                    style={{
                                        background: deviceSize === size ? 'var(--vscode-accent)' : 'transparent',
                                        color: deviceSize === size ? 'white' : 'var(--vscode-text-muted)'
                                    }}
                                    title={size.charAt(0).toUpperCase() + size.slice(1)}
                                >
                                    {deviceSizes[size].icon}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Refresh Button */}
                    {viewMode !== 'code' && (
                        <button
                            onClick={handleRefresh}
                            className="p-1.5 rounded-md transition-all hover:bg-[var(--vscode-hover)]"
                            style={{ color: 'var(--vscode-text-muted)' }}
                        >
                            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                        </button>
                    )}

                    {/* External Links */}
                    <div className="flex items-center gap-1 ml-2 pl-2 border-l" style={{ borderColor: 'var(--vscode-border)' }}>
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md transition-all hover:bg-[var(--vscode-hover)]"
                                style={{ color: 'var(--vscode-text-muted)' }}
                                title="View on GitHub"
                            >
                                <Github size={14} />
                            </a>
                        )}
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md transition-all hover:bg-[var(--vscode-hover)]"
                                style={{ color: 'var(--vscode-text-muted)' }}
                                title="Open Live Demo"
                            >
                                <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Split View Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Code Panel */}
                {(viewMode === 'code' || viewMode === 'split') && (
                    <div
                        className={`overflow-auto ${viewMode === 'split' ? 'w-1/2 border-r' : 'w-full'}`}
                        style={{ borderColor: 'var(--vscode-border)' }}
                    >
                        {/* Code Header */}
                        <div
                            className="flex items-center justify-between px-4 py-2 border-b sticky top-0"
                            style={{
                                background: 'var(--vscode-sidebar-bg)',
                                borderColor: 'var(--vscode-border)'
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Code size={14} style={{ color: 'var(--vscode-accent)' }} />
                                <span className="text-xs font-medium" style={{ color: 'var(--vscode-text-muted)' }}>
                                    {projectId}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {project.tech.slice(0, 3).map(tech => (
                                    <span
                                        key={tech}
                                        className="px-2 py-0.5 rounded text-xs"
                                        style={{
                                            background: 'rgba(0, 152, 255, 0.15)',
                                            color: 'var(--vscode-accent)'
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="p-4 font-mono text-sm">
                            {lines.map((line, index) => (
                                <div key={index} className="code-line group">
                                    <span className="line-number">{index + 1}</span>
                                    <span className="line-content">
                                        <SyntaxHighlight line={line} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Resize Handle (only in split mode) */}
                {viewMode === 'split' && (
                    <div
                        className="w-1 cursor-col-resize hover:bg-[var(--vscode-accent)] transition-colors"
                        style={{ background: 'var(--vscode-border)' }}
                    />
                )}

                {/* Preview Panel */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <div
                        className={`flex flex-col overflow-hidden ${viewMode === 'split' ? 'w-1/2' : 'w-full'}`}
                        style={{ background: '#0d0d0d' }}
                    >
                        {/* Preview Header */}
                        <div
                            className="flex items-center justify-between px-4 py-2 border-b"
                            style={{
                                background: 'var(--vscode-sidebar-bg)',
                                borderColor: 'var(--vscode-border)'
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Eye size={14} style={{ color: '#22c55e' }} />
                                <span className="text-xs font-medium" style={{ color: 'var(--vscode-text-muted)' }}>
                                    Live Preview
                                </span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Live
                                </span>
                            </div>
                            <span className="text-xs truncate max-w-[200px]" style={{ color: 'var(--vscode-text-muted)' }}>
                                {project.live || project.previewUrl}
                            </span>
                        </div>

                        {/* Preview Content */}
                        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                            <div
                                className="h-full rounded-lg overflow-hidden transition-all duration-300 shadow-2xl"
                                style={{
                                    width: deviceSizes[deviceSize].width,
                                    maxWidth: '100%',
                                    border: '1px solid var(--vscode-border)',
                                    background: '#fff'
                                }}
                            >
                                {!isRefreshing ? (
                                    <iframe
                                        src={project.previewUrl || project.live || 'about:blank'}
                                        className="w-full h-full"
                                        title={`${project.name} Preview`}
                                        sandbox="allow-scripts allow-same-origin allow-popups"
                                        style={{ border: 'none' }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--vscode-editor-bg)' }}>
                                        <RefreshCw size={24} className="animate-spin" style={{ color: 'var(--vscode-accent)' }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Preview Footer */}
                        <div
                            className="flex items-center justify-center gap-4 px-4 py-2 border-t text-xs"
                            style={{
                                background: 'var(--vscode-sidebar-bg)',
                                borderColor: 'var(--vscode-border)',
                                color: 'var(--vscode-text-muted)'
                            }}
                        >
                            <span>{deviceSize === 'desktop' ? '100%' : deviceSizes[deviceSize].width}</span>
                            <span>•</span>
                            <a
                                href={project.live || project.previewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:underline"
                                style={{ color: 'var(--vscode-accent)' }}
                            >
                                Open in new tab
                                <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SyntaxHighlight({ line }: { line: string }) {
    let highlighted = line
        .replace(/(import|export|from|const|return|default|function)/g, '<span style="color:#C586C0">$1</span>')
        .replace(/(".*?"|'.*?'|`[^`]*`)/g, '<span style="color:#CE9178">$1</span>')
        .replace(/(\/\*\*|\*\/|\*|\/\/.*$)/g, '<span style="color:#6A9955">$1</span>')
        .replace(/(\{|\}|\(|\)|\[|\])/g, '<span style="color:#FFD700">$1</span>')
        .replace(/(React|Project|Github|ExternalLink)/g, '<span style="color:#4EC9B0">$1</span>');

    return <span dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />;
}
