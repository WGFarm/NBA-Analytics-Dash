'use client';

import { Text } from "@tremor/react";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface ComparisonIndicatorProps {
  value: number;
  comparisonValue: number;
  label?: string;
  isGoodWhenHigh?: boolean;
  formatValue?: (value: number) => string;
}

export default function ComparisonIndicator({
  value,
  comparisonValue,
  label,
  isGoodWhenHigh = true,
  formatValue = (v) => v.toFixed(1)
}: ComparisonIndicatorProps) {
  const difference = value - comparisonValue;
  const percentChange = (difference / comparisonValue) * 100;
  const isPositive = isGoodWhenHigh ? difference > 0 : difference < 0;

  return (
    <div className="flex items-center gap-2">
      {label && <Text className="dark:text-gray-400">{label}</Text>}
      <div className="flex items-center gap-1">
        {isPositive ? (
          <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-500" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
        )}
        <Text className={isPositive ? "text-emerald-500" : "text-red-500"}>
          {formatValue(Math.abs(difference))} ({Math.abs(percentChange).toFixed(1)}%)
        </Text>
      </div>
    </div>
  );
} 