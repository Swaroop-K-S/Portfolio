'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SidebarPanel = 'explorer' | 'search' | 'git' | 'extensions' | 'none';

export interface Tab {
  id: string;
  name: string;
  icon: string;
  type: 'file' | 'welcome' | 'settings';
  path?: string;
  content?: string;
}

interface VSCodeContextType {
  // Sidebar state
  activeSidebarPanel: SidebarPanel;
  setActiveSidebarPanel: (panel: SidebarPanel) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  
  // Tabs state
  openTabs: Tab[];
  activeTabId: string | null;
  openTab: (tab: Tab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  
  // Terminal state
  terminalVisible: boolean;
  setTerminalVisible: (visible: boolean) => void;
  terminalHeight: number;
  setTerminalHeight: (height: number) => void;
  
  // File explorer state
  expandedFolders: Set<string>;
  toggleFolder: (folderId: string) => void;
  selectedFile: string | null;
  setSelectedFile: (fileId: string | null) => void;
}

const VSCodeContext = createContext<VSCodeContextType | undefined>(undefined);

export function VSCodeProvider({ children }: { children: ReactNode }) {
  // Sidebar state
  const [activeSidebarPanel, setActiveSidebarPanel] = useState<SidebarPanel>('explorer');
  const [sidebarWidth, setSidebarWidth] = useState(260);
  
  // Tabs state
  const [openTabs, setOpenTabs] = useState<Tab[]>([
    { id: 'welcome', name: 'Welcome', icon: '👋', type: 'welcome' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string | null>('welcome');
  
  // Terminal state
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(200);
  
  // File explorer state
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'portfolio']));
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  const openTab = (tab: Tab) => {
    const existingTab = openTabs.find(t => t.id === tab.id);
    if (!existingTab) {
      setOpenTabs([...openTabs, tab]);
    }
    setActiveTabId(tab.id);
  };
  
  const closeTab = (tabId: string) => {
    const newTabs = openTabs.filter(t => t.id !== tabId);
    setOpenTabs(newTabs);
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null);
    }
  };
  
  const setActiveTab = (tabId: string) => {
    setActiveTabId(tabId);
  };
  
  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };
  
  return (
    <VSCodeContext.Provider value={{
      activeSidebarPanel,
      setActiveSidebarPanel,
      sidebarWidth,
      setSidebarWidth,
      openTabs,
      activeTabId,
      openTab,
      closeTab,
      setActiveTab,
      terminalVisible,
      setTerminalVisible,
      terminalHeight,
      setTerminalHeight,
      expandedFolders,
      toggleFolder,
      selectedFile,
      setSelectedFile,
    }}>
      {children}
    </VSCodeContext.Provider>
  );
}

export function useVSCode() {
  const context = useContext(VSCodeContext);
  if (context === undefined) {
    throw new Error('useVSCode must be used within a VSCodeProvider');
  }
  return context;
}
