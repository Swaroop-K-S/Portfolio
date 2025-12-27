'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useVSCode, Tab } from '@/context/VSCodeContext';
import { X, Plus, TerminalSquare, Trash2 } from 'lucide-react';

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'success';
    content: string;
}

const WELCOME_MESSAGE = `Welcome to the Interactive Portfolio Terminal!
Type 'help' to see available commands.
`;

export default function Terminal() {
    const { setTerminalVisible, openTab, setSelectedFile, setActiveSidebarPanel } = useVSCode();
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', content: WELCOME_MESSAGE }
    ]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    const addOutput = (content: string, type: 'output' | 'error' | 'success' = 'output') => {
        setLines(prev => [...prev, { type, content }]);
    };

    const openFile = (id: string, name: string, extension: string) => {
        const tab: Tab = {
            id,
            name,
            icon: extension,
            type: 'file',
            path: id,
        };
        openTab(tab);
        setSelectedFile(id);
    };

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const args = trimmedCmd.split(' ');
        const command = args[0];
        const arg = args[1];

        if (!trimmedCmd) return;

        // Add to history
        setHistory(prev => [...prev, trimmedCmd]);
        setHistoryIndex(-1);

        // Add input line
        setLines(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

        // Handle commands
        switch (command) {
            case 'help':
                addOutput(`
Available Commands:
═══════════════════════════════════════════════════════════════

  Navigation:
  ───────────────────────────────────────────────────────────
  open <page>    Open a page (about, projects, contact, skills, experience)
  ls             List all available pages
  cd <folder>    Navigate to folder (about, projects, experience, contact)
  
  Actions:
  ───────────────────────────────────────────────────────────
  resume         Download resume / Open resume page
  github         Open GitHub profile in new tab
  linkedin       Open LinkedIn profile in new tab
  email          Copy email to clipboard
  
  View:
  ───────────────────────────────────────────────────────────
  about          View about information
  skills         View skills with progress bars
  projects       View all projects
  contact        View contact information
  extensions     Open extensions panel (skills)
  
  System:
  ───────────────────────────────────────────────────────────
  clear          Clear the terminal
  neofetch       Display system information
  whoami         Display user info
  date           Show current date and time
  echo <text>    Print text to terminal
  history        Show command history

  Shortcuts:
  ───────────────────────────────────────────────────────────
  ↑/↓            Navigate command history
  Tab            Auto-complete commands
  Ctrl+L         Clear terminal
`);
                break;

            case 'clear':
                setLines([]);
                break;

            case 'ls':
                addOutput(`
📁 portfolio/
├── 📁 about/
│   ├── 📄 About.tsx
│   └── 📄 skills.json
├── 📁 projects/
│   ├── 📄 Project1.tsx
│   ├── 📄 Project2.tsx
│   └── 📄 Project3.tsx
├── 📁 experience/
│   ├── 📄 Experience.tsx
│   └── 📄 timeline.json
├── 📁 contact/
│   └── 📄 Contact.tsx
├── 📄 README.md
└── 📄 resume.pdf
`);
                break;

            case 'cd':
                if (!arg) {
                    addOutput('Usage: cd <folder>\nAvailable: about, projects, experience, contact', 'error');
                } else {
                    switch (arg) {
                        case 'about':
                            openFile('about.tsx', 'About.tsx', 'tsx');
                            addOutput('📁 Opened about folder → About.tsx', 'success');
                            break;
                        case 'projects':
                            openFile('project1.tsx', 'Project1.tsx', 'tsx');
                            addOutput('📁 Opened projects folder → Project1.tsx', 'success');
                            break;
                        case 'experience':
                            openFile('experience.tsx', 'Experience.tsx', 'tsx');
                            addOutput('📁 Opened experience folder → Experience.tsx', 'success');
                            break;
                        case 'contact':
                            openFile('contact.tsx', 'Contact.tsx', 'tsx');
                            addOutput('📁 Opened contact folder → Contact.tsx', 'success');
                            break;
                        default:
                            addOutput(`Directory not found: ${arg}`, 'error');
                    }
                }
                break;

            case 'open':
                if (!arg) {
                    addOutput('Usage: open <page>\nAvailable: about, skills, projects, project1, project2, project3, experience, contact, readme', 'error');
                } else {
                    switch (arg) {
                        case 'about':
                            openFile('about.tsx', 'About.tsx', 'tsx');
                            addOutput('📄 Opened About.tsx', 'success');
                            break;
                        case 'skills':
                            openFile('skills.json', 'skills.json', 'json');
                            addOutput('📄 Opened skills.json', 'success');
                            break;
                        case 'projects':
                        case 'project1':
                            openFile('project1.tsx', 'Project1.tsx', 'tsx');
                            addOutput('📄 Opened Project1.tsx', 'success');
                            break;
                        case 'project2':
                            openFile('project2.tsx', 'Project2.tsx', 'tsx');
                            addOutput('📄 Opened Project2.tsx', 'success');
                            break;
                        case 'project3':
                            openFile('project3.tsx', 'Project3.tsx', 'tsx');
                            addOutput('📄 Opened Project3.tsx', 'success');
                            break;
                        case 'experience':
                            openFile('experience.tsx', 'Experience.tsx', 'tsx');
                            addOutput('📄 Opened Experience.tsx', 'success');
                            break;
                        case 'contact':
                            openFile('contact.tsx', 'Contact.tsx', 'tsx');
                            addOutput('📄 Opened Contact.tsx', 'success');
                            break;
                        case 'readme':
                            openFile('readme.md', 'README.md', 'md');
                            addOutput('📄 Opened README.md', 'success');
                            break;
                        default:
                            addOutput(`Page not found: ${arg}\nType 'ls' to see available pages.`, 'error');
                    }
                }
                break;

            case 'about':
                openFile('about.tsx', 'About.tsx', 'tsx');
                addOutput(`
╔══════════════════════════════════════════════════════════════╗
║                         ABOUT ME                              ║
╠══════════════════════════════════════════════════════════════╣
║  Name:     Swaroop KS                                         ║
║  Role:     AI Innovator & Developer                           ║
║  Location: India                                              ║
║                                                               ║
║  I'm a passionate developer with expertise in building        ║
║  modern web applications. I love creating elegant solutions   ║
║  to complex problems and contributing to open source.         ║
╚══════════════════════════════════════════════════════════════╝

✓ Opened About.tsx in editor`, 'success');
                break;

            case 'skills':
                openFile('skills.json', 'skills.json', 'json');
                addOutput(`
Technical Skills:
─────────────────
Languages:    TypeScript ████████████████████ 95%
              JavaScript ████████████████████ 95%
              Python     █████████████████░░░ 85%
              Go         ██████████████░░░░░░ 70%

Frameworks:   React      ████████████████████ 95%
              Next.js    ██████████████████░░ 90%
              Node.js    ██████████████████░░ 90%
              Express    █████████████████░░░ 85%

Databases:    PostgreSQL █████████████████░░░ 85%
              MongoDB    ████████████████░░░░ 80%
              Redis      ███████████████░░░░░ 75%

✓ Opened skills.json in editor`, 'success');
                break;

            case 'projects':
                openFile('project1.tsx', 'Project1.tsx', 'tsx');
                addOutput(`
Featured Projects:
══════════════════

1. 🛒 E-Commerce Platform
   Tech: Next.js, TypeScript, PostgreSQL, Stripe
   A full-stack e-commerce with real-time inventory
   → Type 'open project1' to view details

2. 🤖 AI Code Assistant  
   Tech: TypeScript, OpenAI API, VS Code API
   VS Code extension for AI-powered suggestions
   → Type 'open project2' to view details

3. 🎨 Real-time Collaboration Tool
   Tech: React, Socket.io, Canvas API
   A Figma-like collaborative whiteboard
   → Type 'open project3' to view details

✓ Opened Project1.tsx in editor`, 'success');
                break;

            case 'contact':
                openFile('contact.tsx', 'Contact.tsx', 'tsx');
                addOutput(`
Contact Information:
════════════════════
📧 Email:    swaroopkudlurs@gmail.com      → Type 'email' to copy
🐙 GitHub:   github.com/Swaroop-K-S  → Type 'github' to open
💼 LinkedIn: linkedin.com/in/swaroop-ks → Type 'linkedin' to open
🐦 Twitter:  @SwaroopKS

✓ Opened Contact.tsx in editor`, 'success');
                break;

            case 'experience':
                openFile('experience.tsx', 'Experience.tsx', 'tsx');
                addOutput(`
Work Experience:
════════════════

📍 Senior Software Engineer @ Tech Corp (2022 - Present)
   Leading frontend development, mentoring juniors

📍 Full Stack Developer @ StartupXYZ (2020 - 2022)
   Built microservices, migrated to TypeScript

📍 Junior Developer @ Digital Agency (2019 - 2020)
   Built 10+ client websites using React

✓ Opened Experience.tsx in editor`, 'success');
                break;

            case 'extensions':
                setActiveSidebarPanel('extensions');
                addOutput('📦 Opened Extensions panel (Skills & Technologies)', 'success');
                break;

            case 'resume':
                addOutput(`
📄 Resume Download
══════════════════
Initiating download...

✓ Resume downloaded successfully!
→ File: resume.pdf

💡 Tip: You can also view my resume online at:
   https://swaroop-k-s.github.io/resume`, 'success');
                // Simulate download
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'YourName_Resume.pdf';
                    // link.click(); // Uncomment when you have an actual resume.pdf
                }, 500);
                break;

            case 'github':
                addOutput(`
🐙 Opening GitHub Profile...
══════════════════════════
→ https://github.com/Swaroop-K-S

✓ Opening in new tab...`, 'success');
                window.open('https://github.com/Swaroop-K-S', '_blank');
                break;

            case 'linkedin':
                addOutput(`
💼 Opening LinkedIn Profile...
════════════════════════════
→ https://linkedin.com/in/swaroop-ks

✓ Opening in new tab...`, 'success');
                window.open('https://linkedin.com/in/swaroop-ks', '_blank');
                break;

            case 'email':
                navigator.clipboard.writeText('swaroopkudlurs@gmail.com');
                addOutput(`
📧 Email Copied!
════════════════
✓ Copied to clipboard: swaroopkudlurs@gmail.com

You can now paste it anywhere!`, 'success');
                break;

            case 'whoami':
                addOutput(`
👤 User Profile
═══════════════
Name:     Swaroop KS
Role:     AI Innovator & Developer
Status:   🟢 Available for opportunities
Location: Your City, Country
`);
                break;

            case 'date':
                const now = new Date();
                addOutput(`
📅 Current Date & Time
═══════════════════════
${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
`);
                break;

            case 'history':
                if (history.length === 0) {
                    addOutput('No commands in history yet.');
                } else {
                    addOutput(`
Command History:
════════════════
${history.map((cmd, i) => `  ${i + 1}. ${cmd}`).join('\n')}
`);
                }
                break;

            case 'echo':
                const text = args.slice(1).join(' ');
                addOutput(text || '');
                break;

            case 'neofetch':
                addOutput(`
        ████████████████████████        user@portfolio
     ██                        ██       ──────────────
   ██   ████████████████████   ██       OS: VS Code Portfolio
  ██   █                  █   ██       Host: Next.js 15
 ██   █  ██████████████  █   ██       Kernel: React 19
 █   █  █              █  █   █       Shell: TypeScript 5
 █   █  █   VS CODE    █  █   █       Resolution: Responsive
 █   █  █              █  █   █       Theme: Dark+
 █   █  █              █  █   █       Terminal: Interactive
 ██   █  ██████████████  █   ██       CPU: Node.js v20
  ██   █                  █   ██       Memory: 16GB RAM
   ██   ████████████████████   ██       Uptime: ${Math.floor(Math.random() * 100)} days
     ██                        ██       
        ████████████████████████       
`);
                break;

            case 'install':
                if (!arg) {
                    addOutput('Usage: install <package>\nExample: install react', 'error');
                } else {
                    addOutput(`
📦 Installing ${arg}...
══════════════════════════════════════`, 'output');

                    // Simulate installation with progress
                    setTimeout(() => {
                        addOutput(`
✓ Successfully installed ${arg}!

${arg} has been added to your skillset.
Type 'extensions' to view all installed skills.`, 'success');
                    }, 1000);
                }
                break;

            case 'uninstall':
                addOutput(`
❌ Error: Cannot uninstall skills!
════════════════════════════════════
Once you learn something, you can't unlearn it 😄

Tip: You can always learn NEW skills with 'install <skill>'`, 'error');
                break;

            case 'sudo':
                addOutput(`
🔐 Permission Denied
════════════════════
Nice try! But this portfolio doesn't need sudo powers 😎

Type 'help' to see what you can actually do.`, 'error');
                break;

            case 'rm':
                addOutput(`
🛡️ Protected Operation
═══════════════════════
You cannot delete files from this portfolio!
All content is read-only for your viewing pleasure.

💡 Tip: Type 'ls' to explore the portfolio instead.`, 'error');
                break;

            case 'exit':
            case 'quit':
                setTerminalVisible(false);
                break;

            case 'tree':
                addOutput(`
📁 portfolio
├── 📁 src
│   ├── 📁 about
│   │   ├── 📄 About.tsx
│   │   └── 📄 skills.json
│   ├── 📁 projects
│   │   ├── 📄 Project1.tsx
│   │   ├── 📄 Project2.tsx
│   │   └── 📄 Project3.tsx
│   ├── 📁 experience
│   │   ├── 📄 Experience.tsx
│   │   └── 📄 timeline.json
│   └── 📁 contact
│       └── 📄 Contact.tsx
├── 📄 README.md
├── 📄 package.json
└── 📄 resume.pdf
`);
                break;

            default:
                addOutput(`Command not found: ${command}
Type 'help' to see available commands.`, 'error');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0 && historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            setLines([]);
        }
    };

    return (
        <div className="terminal-container flex flex-col h-full">
            {/* Terminal Header */}
            <div className="terminal-tabs flex items-center justify-between px-2">
                <div className="flex items-center gap-2 py-1">
                    <div className="flex items-center gap-1 px-2 py-1 text-xs" style={{
                        background: 'var(--vscode-tab-active-bg)',
                        borderTop: '1px solid var(--vscode-accent)'
                    }}>
                        <TerminalSquare size={12} />
                        <span>bash</span>
                        <X size={12} className="ml-2 opacity-60 hover:opacity-100 cursor-pointer" />
                    </div>
                    <button className="p-1 hover:bg-[var(--vscode-hover)] rounded">
                        <Plus size={12} />
                    </button>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        className="p-1 hover:bg-[var(--vscode-hover)] rounded"
                        onClick={() => setLines([])}
                        title="Clear Terminal"
                    >
                        <Trash2 size={14} />
                    </button>
                    <button
                        className="p-1 hover:bg-[var(--vscode-hover)] rounded"
                        onClick={() => setTerminalVisible(false)}
                        title="Close Terminal"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={containerRef}
                className="flex-1 p-2 font-mono text-sm overflow-y-auto cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                {lines.map((line, index) => (
                    <div
                        key={index}
                        className="whitespace-pre-wrap"
                        style={{
                            color: line.type === 'error' ? '#f87171' :
                                line.type === 'success' ? '#4ade80' :
                                    line.type === 'input' ? '#22c55e' :
                                        'var(--vscode-text)'
                        }}
                    >
                        {line.content}
                    </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center">
                    <span style={{ color: '#22c55e' }}>$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none ml-1"
                        style={{ color: 'var(--vscode-text)', caretColor: 'var(--vscode-text)' }}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
