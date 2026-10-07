'use client'

import React from 'react'
import { getCompatibilityColor, getCompatibilityLabel } from '@/lib/utils/compatibility'

interface CompatibilityScoreProps {
  score: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Compatibility score indicator widget.
 * Follows AGENTS.md compatibility thresholds (>=80 Green, >=60 Amber, <60 Gray).
 */
export function CompatibilityScore({
  score,
  showLabel = true,
  size = 'md',
}: CompatibilityScoreProps) {
  const color = getCompatibilityColor(score)
  const label = getCompatibilityLabel(score)

  const radius = size === 'sm' ? 14 : size === 'lg' ? 24 : 18
  const stroke = size === 'sm' ? 3 : size === 'lg' ? 4 : 3.5
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="#E2E8F0"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span
          className={`absolute font-bold text-[#0B1F3A] ${
            size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[11px]'
          }`}
        >
          {score}%
        </span>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#0B1F3A]">{label}</span>
          <span className="text-[9px] text-slate-500">Compatibility</span>
        </div>
      )}
    </div>
  )
}
