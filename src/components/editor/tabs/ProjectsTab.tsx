'use client';

import React from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

interface Project {
    id: string;
    name: string;
    description: string;
    tech: string[];
    github?: string;
    live?: string;
    stars: number;
    forks: number;
    image?: string;
}

const projects: Record<string, Project> = {
    'project1.tsx': {
        id: 'project1',
        name: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis'],
        github: 'https://github.com/Swaroop-K-S/ecommerce',
        live: 'https://ecommerce-demo.vercel.app',
        stars: 234,
        forks: 45,
    },
    'project2.tsx': {
        id: 'project2',
        name: 'AI Code Assistant',
        description: 'VS Code extension that provides AI-powered code suggestions and documentation generation.',
        tech: ['TypeScript', 'OpenAI API', 'VS Code API', 'Node.js'],
        github: 'https://github.com/Swaroop-K-S/ai-assistant',
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
        stars: 189,
        forks: 32,
    },
};

export default function ProjectsTab({ projectId }: { projectId: string }) {
    const project = projects[projectId];

    if (!project) {
        return (
            <div className="flex items-center justify-center h-full">
                <p style={{ color: 'var(--vscode-text-muted)' }}>Project not found</p>
            </div>
        );
    }

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
        <div className="p-4 font-mono text-sm" style={{ background: 'var(--vscode-editor-bg)' }}>
            {/* Project Preview Card */}
            <div
                className="mb-6 p-4 rounded-lg border"
                style={{
                    background: 'var(--vscode-sidebar-bg)',
                    borderColor: 'var(--vscode-border)'
                }}
            >
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h2 className="text-lg font-semibold text-white">{project.name}</h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--vscode-text-muted)' }}>
                            {project.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--vscode-text-muted)' }}>
                            <Star size={14} className="text-yellow-400" />
                            {project.stars}
                        </span>
                        <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--vscode-text-muted)' }}>
                            <GitFork size={14} />
                            {project.forks}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map(tech => (
                        <span
                            key={tech}
                            className="px-2 py-1 rounded text-xs"
                            style={{ background: 'var(--vscode-accent)', opacity: 0.9 }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-3">
                    {project.github && (
                        <a
                            href={project.github}
                            className="flex items-center gap-1 text-sm hover:underline"
                            style={{ color: 'var(--vscode-accent)' }}
                        >
                            <Github size={14} />
                            Source Code
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            className="flex items-center gap-1 text-sm hover:underline"
                            style={{ color: 'var(--vscode-accent)' }}
                        >
                            <ExternalLink size={14} />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>

            {/* Code View */}
            {lines.map((line, index) => (
                <div key={index} className="code-line">
                    <span className="line-number">{index + 1}</span>
                    <span className="line-content">
                        <SyntaxHighlight line={line} />
                    </span>
                </div>
            ))}
        </div>
    );
}

function SyntaxHighlight({ line }: { line: string }) {
    let highlighted = line
        .replace(/(import|export|from|const|return|default|function)/g, '<span style="color:#C586C0">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span style="color:#CE9178">$1</span>')
        .replace(/(\/\*\*|\*\/|\*|\/\/.*$)/g, '<span style="color:#6A9955">$1</span>')
        .replace(/(\{|\}|\(|\)|\[|\])/g, '<span style="color:#FFD700">$1</span>')
        .replace(/(React|Project|Github|ExternalLink)/g, '<span style="color:#4EC9B0">$1</span>');

    return <span dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />;
}
