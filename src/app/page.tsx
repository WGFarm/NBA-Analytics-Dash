'use client';

import { useState } from 'react';
import TeamDashboard from '@/components/TeamDashboard';
import PlayerDashboard from '@/components/PlayerDashboard';
import DashboardNav from '@/components/DashboardNav';
import AnimatedView from '@/components/AnimatedView';

export default function Home() {
  const [activeView, setActiveView] = useState<'team' | 'players'>('team');

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 md:p-10 mx-auto max-w-[1600px]">
        <DashboardNav 
          activeView={activeView}
          onViewChange={setActiveView}
        />
        
        <div className="relative">
          <AnimatedView 
            isVisible={activeView === 'team'}
            direction="left"
          >
            {activeView === 'team' && <TeamDashboard />}
          </AnimatedView>

          <AnimatedView 
            isVisible={activeView === 'players'}
            direction="right"
          >
            {activeView === 'players' && <PlayerDashboard />}
          </AnimatedView>
        </div>
      </div>
    </main>
  );
} 