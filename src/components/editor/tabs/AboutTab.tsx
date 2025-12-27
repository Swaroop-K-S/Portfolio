'use client';

import React from 'react';

const aboutCode = `import React from 'react';
import { Developer } from '@/types';

export const About: Developer = {
  name: "Swaroop KS",
  title: "AI Innovator & Developer",
  location: "India",
  
  bio: \`
    From student to AI innovator, transforming ideas into 
    intelligent realities, one project at a time 🚀🤖
    2nd-year student at Saptagiri NPS University
  \`,
  
  education: {
    degree: "Bachelor's in Computer Science",
    university: "Saptagiri NPS University",
    year: 2020
  },
  
  interests: [
    "Web Development",
    "Cloud Architecture", 
    "Machine Learning",
    "Open Source"
  ],
  
  contact: {
    email: "swaroopkudlurs@gmail.com",
    github: "github.com/Swaroop-K-S",
    linkedin: "linkedin.com/in/swaroop-ks",
    twitter: "@SwaroopKS"
  }
};

export default function AboutPage() {
  return (
    <section className="about">
      <h1>{About.name}</h1>
      <h2>{About.title}</h2>
      <p>{About.bio}</p>
      
      <div className="contact-links">
        {Object.entries(About.contact).map(([key, value]) => (
          <a key={key} href={value}>
            {key}
          </a>
        ))}
      </div>
    </section>
  );
}`;

export default function AboutTab() {
  const lines = aboutCode.split('\n');

  return (
    <div className="p-4 font-mono text-sm" style={{ background: 'var(--vscode-editor-bg)' }}>
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
  // Simple syntax highlighting
  const highlightPatterns = [
    { pattern: /(import|export|from|const|return|default|function)/g, color: '#C586C0' },
    { pattern: /(".*?"|'.*?'|`[\s\S]*?`)/g, color: '#CE9178' },
    { pattern: /(\{|\}|\(|\)|\[|\]|:)/g, color: '#FFD700' },
    { pattern: /(React|Developer)/g, color: '#4EC9B0' },
    { pattern: /(\/\/.*$)/g, color: '#6A9955' },
  ];

  let highlighted = line;
  highlightPatterns.forEach(({ pattern, color }) => {
    highlighted = highlighted.replace(pattern, `<span style="color:${color}">$1</span>`);
  });

  return <span dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />;
}
