'use client';

import React, { useState } from 'react';
import { Search, Filter, Replace, CaseSensitive, Regex } from 'lucide-react';

export default function SearchPanel() {
    const [searchQuery, setSearchQuery] = useState('');
    const [replaceQuery, setReplaceQuery] = useState('');
    const [showReplace, setShowReplace] = useState(false);

    const searchResults = [
        { file: 'About.tsx', line: 12, content: 'Full Stack Developer', match: 'Developer' },
        { file: 'Experience.tsx', line: 8, content: 'Software Engineer at Tech Corp', match: 'Engineer' },
        { file: 'Project1.tsx', line: 5, content: 'E-commerce Platform Development', match: 'Development' },
        { file: 'skills.json', line: 3, content: '"skill": "React Development"', match: 'Development' },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Search Input */}
            <div className="p-2">
                <div className="relative flex items-center gap-1 mb-2">
                    <button
                        className="p-1 hover:bg-[var(--vscode-hover)] rounded"
                        onClick={() => setShowReplace(!showReplace)}
                        title="Toggle Replace"
                    >
                        <Replace size={14} />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input pr-16"
                        />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-0.5">
                            <button className="p-1 hover:bg-[var(--vscode-hover)] rounded" title="Match Case">
                                <CaseSensitive size={14} />
                            </button>
                            <button className="p-1 hover:bg-[var(--vscode-hover)] rounded" title="Use Regex">
                                <Regex size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {showReplace && (
                    <div className="pl-6 mb-2">
                        <input
                            type="text"
                            placeholder="Replace"
                            value={replaceQuery}
                            onChange={(e) => setReplaceQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                )}

                <div className="text-xs" style={{ color: 'var(--vscode-text-muted)' }}>
                    {searchQuery ? `${searchResults.length} results in 4 files` : 'Type to search'}
                </div>
            </div>

            {/* Search Results */}
            {searchQuery && (
                <div className="flex-1 overflow-y-auto">
                    {searchResults.map((result, index) => (
                        <div key={index} className="tree-item flex-col items-start gap-0 py-2">
                            <div className="text-[var(--vscode-text)]">{result.file}</div>
                            <div className="text-xs" style={{ color: 'var(--vscode-text-muted)' }}>
                                <span className="mr-2">Line {result.line}:</span>
                                {result.content.split(result.match).map((part, i, arr) => (
                                    <React.Fragment key={i}>
                                        {part}
                                        {i < arr.length - 1 && (
                                            <span className="bg-yellow-600/40 text-yellow-200">{result.match}</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
