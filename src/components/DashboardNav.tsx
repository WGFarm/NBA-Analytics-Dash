'use client';

import { TabGroup, TabList, Tab } from "@tremor/react";

interface DashboardNavProps {
  activeView: 'team' | 'players';
  onViewChange: (view: 'team' | 'players') => void;
}

export default function DashboardNav({ activeView, onViewChange }: DashboardNavProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-sm rounded-lg mb-6">
      <TabGroup index={activeView === 'team' ? 0 : 1} onIndexChange={(index) => onViewChange(index === 0 ? 'team' : 'players')}>
        <TabList variant="solid">
          <Tab className="px-8 py-3">Team Analytics</Tab>
          <Tab className="px-8 py-3">Player Stats</Tab>
        </TabList>
      </TabGroup>
    </div>
  );
} 