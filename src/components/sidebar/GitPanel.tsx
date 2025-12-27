'use client';

import React from 'react';
import {
    GitBranch,
    RefreshCw,
    Plus,
    Check,
    MoreHorizontal,
    FileText,
    GitCommit,
    CloudUpload
} from 'lucide-react';

const changes = [
    { name: 'About.tsx', status: 'M', path: 'src/about/About.tsx' },
    { name: 'skills.json', status: 'M', path: 'src/about/skills.json' },
    { name: 'Project3.tsx', status: 'A', path: 'src/projects/Project3.tsx' },
];

const recentCommits = [
    { hash: 'a1b2c3d', message: 'Add new project section', time: '2 hours ago' },
    { hash: 'e4f5g6h', message: 'Update skills and experience', time: '1 day ago' },
    { hash: 'i7j8k9l', message: 'Fix responsive layout issues', time: '2 days ago' },
];

export default function GitPanel() {
    return (
        <div className="flex flex-col h-full">
            {/* Header Actions */}
            <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: 'var(--vscode-border)' }}>
                <span className="text-xs font-semibold">SOURCE CONTROL</span>
                <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-[var(--vscode-hover)] rounded" title="Commit">
                        <Check size={14} />
                    </button>
                    <button className="p-1 hover:bg-[var(--vscode-hover)] rounded" title="Refresh">
                        <RefreshCw size={14} />
                    </button>
                    <button className="p-1 hover:bg-[var(--vscode-hover)] rounded" title="More Actions">
                        <MoreHorizontal size={14} />
                    </button>
                </div>
            </div>

            {/* Commit Message Input */}
            <div className="p-2">
                <textarea
                    placeholder="Message (Ctrl+Enter to commit)"
                    className="search-input resize-none"
                    rows={3}
                    style={{ minHeight: '60px' }}
                />
                <div className="flex gap-1 mt-2">
                    <button className="flex-1 py-1.5 px-3 rounded text-xs font-medium hover:opacity-90 transition-opacity"
                        style={{ background: 'var(--vscode-accent)' }}>
                        <div className="flex items-center justify-center gap-1">
                            <Check size={14} />
                            <span>Commit</span>
                        </div>
                    </button>
                    <button className="py-1.5 px-3 rounded text-xs font-medium hover:bg-[var(--vscode-hover)]"
                        style={{ border: '1px solid var(--vscode-border)' }}>
                        <CloudUpload size={14} />
                    </button>
                </div>
            </div>

            {/* Changes Section */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-3 py-2">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                        <span>Changes</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: 'var(--vscode-accent)' }}>
                            {changes.length}
                        </span>
                    </div>

                    {changes.map((change, index) => (
                        <div key={index} className="tree-item py-1">
                            <FileText size={14} className={
                                change.status === 'M' ? 'text-yellow-400' :
                                    change.status === 'A' ? 'text-green-400' :
                                        change.status === 'D' ? 'text-red-400' : ''
                            } />
                            <span className="flex-1 truncate">{change.name}</span>
                            <span className={`text-xs font-bold ${change.status === 'M' ? 'text-yellow-400' :
                                    change.status === 'A' ? 'text-green-400' :
                                        change.status === 'D' ? 'text-red-400' : ''
                                }`}>
                                {change.status}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Recent Commits */}
                <div className="px-3 py-2 border-t" style={{ borderColor: 'var(--vscode-border)' }}>
                    <div className="text-xs font-semibold mb-2">Recent Commits</div>

                    {recentCommits.map((commit, index) => (
                        <div key={index} className="tree-item py-2 flex-col items-start gap-0">
                            <div className="flex items-center gap-2 w-full">
                                <GitCommit size={12} style={{ color: 'var(--vscode-text-muted)' }} />
                                <span className="flex-1 truncate text-xs">{commit.message}</span>
                            </div>
                            <div className="text-[10px] ml-5" style={{ color: 'var(--vscode-text-muted)' }}>
                                {commit.hash} • {commit.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
