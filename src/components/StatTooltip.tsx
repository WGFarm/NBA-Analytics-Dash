'use client';
import { Text } from "@tremor/react";

interface StatTooltipProps {
  label: string;
  value: string | number;
}

export default function StatTooltip({ label, value }: StatTooltipProps) {
  return (
    <div className="flex flex-col gap-1">
      <Text className="text-sm">{label}</Text>
      <Text className="font-medium">{value}</Text>
    </div>
  );
} 