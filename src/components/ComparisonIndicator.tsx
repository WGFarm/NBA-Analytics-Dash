'use client';

import { Text } from "@tremor/react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface ComparisonIndicatorProps {
  value: number;
  comparisonValue: number;
  label?: string;
  formatValue?: (value: number) => string;
  isGoodWhenHigh?: boolean;
}

export default function ComparisonIndicator({
  value,
  comparisonValue,
  label,
  formatValue = (v) => v.toFixed(1),
  isGoodWhenHigh = true
}: ComparisonIndicatorProps) {
  const difference = value - comparisonValue;
  const isPositive = isGoodWhenHigh ? difference > 0 : difference < 0;

  return (
    <div className="flex items-center gap-2">
      {label && <Text className="text-gray-500">{label}</Text>}
      <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
        <Text>{formatValue(Math.abs(difference))}</Text>
      </div>
    </div>
  );
} 