'use client';

import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface StatTooltipProps {
  explanation: string;
  metric?: string;
}

export default function StatTooltip({ explanation, metric }: StatTooltipProps) {
  return (
    <div className="group relative inline-block ml-1">
      <InformationCircleIcon className="h-4 w-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 cursor-help" />
      
      <div className="pointer-events-none absolute z-50 w-72 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 transition-all duration-300 group-hover:opacity-100 -translate-x-1/2 left-1/2 bottom-full mb-2">
        {/* Header */}
        {metric && (
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {metric}
            </span>
          </div>
        )}
        
        {/* Content */}
        <div className="px-4 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute h-3 w-3 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
} 