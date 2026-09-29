'use client';

import React from 'react';

interface AircraftModelProps {
  elevonAngle?: number; // degrees, -30 to +30
  afterburner?: number; // 0 to 1
  highlightComponent?: string | null;
  showInternals?: boolean;
  showWireframe?: boolean;
  spinningProp?: boolean;
}

export default function AircraftModel({
  elevonAngle = 0,
  afterburner = 0,
  highlightComponent = null,
  showInternals = false,
  showWireframe = false,
  spinningProp = true,
}: AircraftModelProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      <svg
        viewBox="0 0 1000 700"
        className="w-full h-full max-w-[850px] max-h-[600px] overflow-visible drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
      >
        <defs>
          {/* Stealth Charcoal Matte Gradient */}
          <linearGradient id="stealthSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="40%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* 5mm Depron Core Foam Edge Highlight */}
          <linearGradient id="depronEdge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
          </linearGradient>

          {/* Stealth Facet Shadows */}
          <linearGradient id="facetShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#030712" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#0f172a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.8" />
          </linearGradient>

          {/* Canopy Glass Tint with Iridescent Glare */}
          <linearGradient id="canopyGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#0369a1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#082f49" stopOpacity="0.9" />
          </linearGradient>

          {/* Twin Afterburner Flame Gradient */}
          <linearGradient id="afterburnerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>

          {/* Radial Beacon Glow */}
          <radialGradient id="navGlowGreen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="navGlowRed" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="60%" stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>

          {/* Component Pulse Filter */}
          <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Afterburner Thrust Plumes (Scales with afterburner prop) */}
        {afterburner > 0.05 && (
          <g opacity={Math.min(afterburner * 1.2, 1)}>
            {/* Left Nozzle Plume */}
            <path
              d={`M 458,540 L 468,${540 + afterburner * 240} L 478,540 Z`}
              fill="url(#afterburnerGlow)"
              className="animate-pulse"
            />
            {/* Right Nozzle Plume */}
            <path
              d={`M 522,540 L 532,${540 + afterburner * 240} L 542,540 Z`}
              fill="url(#afterburnerGlow)"
              className="animate-pulse"
            />
            {/* Ambient heat distortion circle */}
            <circle
              cx="500"
              cy="560"
              r={afterburner * 70}
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              opacity="0.3"
              className="animate-ping"
            />
          </g>
        )}

        {/* 2. Main F-22 Stealth Planform (5 mm Depron Monocoque) */}
        {/* Outer Shadow Silhouette */}
        <polygon
          points="
            500,60
            528,110 545,170 590,225
            840,390 830,425 700,410
            680,470 720,540 655,535
            605,510 585,540 500,520
            415,540 395,510 345,535
            280,540 320,470 300,410
            170,425 160,390 410,225
            455,170 472,110
          "
          fill="url(#stealthSkin)"
          stroke="#00f0ff"
          strokeWidth={showWireframe ? 2.5 : 1.2}
          strokeOpacity={showWireframe ? 0.9 : 0.4}
        />

        {/* 3. Depron Foam 5mm Bevel Edge Detail Lines */}
        <polyline
          points="500,60 500,520"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeDasharray={showWireframe ? '4,4' : 'none'}
          opacity="0.5"
        />
        {/* Leading Edge Chines */}
        <line x1="500" y1="60" x2="410" y2="225" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
        <line x1="500" y1="60" x2="590" y2="225" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
        {/* Wing Spar Line (Internal Carbon Fiber Reinforcement) */}
        <line
          x1="300"
          y1="390"
          x2="700"
          y2="390"
          stroke={highlightComponent === 'depron' ? '#00f0ff' : '#64748b'}
          strokeWidth={highlightComponent === 'depron' ? 3.5 : 2}
          strokeDasharray="6,4"
          opacity="0.8"
        />

        {/* 4. Left and Right Air Intakes (Trapezoidal F-22 Stealth Geometry) */}
        <polygon
          points="445,280 475,280 470,360 440,360"
          fill="#060b13"
          stroke="#0284c7"
          strokeWidth="1.2"
        />
        <polygon
          points="525,280 555,280 560,360 530,360"
          fill="#060b13"
          stroke="#0284c7"
          strokeWidth="1.2"
        />

        {/* 5. Canted Twin Vertical Stabilizers (F-22 Twin Tailfins) */}
        {/* Left Cant-Out Fin */}
        <polygon
          points="425,430 380,450 350,530 410,520"
          fill="url(#facetShadow)"
          stroke="#00f0ff"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        {/* Right Cant-Out Fin */}
        <polygon
          points="575,430 620,450 650,530 590,520"
          fill="url(#facetShadow)"
          stroke="#00f0ff"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />

        {/* 6. Dynamic Elevon Control Surfaces (Deflects with elevonAngle) */}
        {/* Left Elevon (Port) */}
        <g
          transform={`translate(280, 460) rotate(${-elevonAngle * 0.7}) translate(-280, -460)`}
          className="transition-transform duration-200"
        >
          <polygon
            points="280,440 330,440 320,470 280,470"
            fill={highlightComponent === 'servo-1' || highlightComponent === 'servos' ? '#e879f9' : '#0c1726'}
            fillOpacity={highlightComponent === 'servo-1' || highlightComponent === 'servos' ? 0.8 : 0.9}
            stroke="#e879f9"
            strokeWidth="1.8"
          />
          {/* Hinge Line */}
          <line x1="280" y1="440" x2="330" y2="440" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2,2" />
        </g>

        {/* Right Elevon (Starboard) */}
        <g
          transform={`translate(720, 460) rotate(${elevonAngle * 0.7}) translate(-720, -460)`}
          className="transition-transform duration-200"
        >
          <polygon
            points="670,440 720,440 720,470 680,470"
            fill={highlightComponent === 'servo-2' || highlightComponent === 'servos' ? '#e879f9' : '#0c1726'}
            fillOpacity={highlightComponent === 'servo-2' || highlightComponent === 'servos' ? 0.8 : 0.9}
            stroke="#e879f9"
            strokeWidth="1.8"
          />
          {/* Hinge Line */}
          <line x1="670" y1="440" x2="720" y2="440" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2,2" />
        </g>

        {/* 7. Stealth Cockpit Canopy with Golden/Cyan Reflective Tint */}
        <polygon
          points="500,140 518,190 518,255 500,280 482,255 482,190"
          fill="url(#canopyGlass)"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        {/* Cockpit Canopy Glare Line */}
        <line x1="492" y1="160" x2="492" y2="260" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* 8. Mid-Fuselage Propeller Slot & Motor Mount */}
        {/* Propeller Slot in Depron fuselage */}
        <rect x="460" y="475" width="80" height="24" rx="4" fill="#030712" stroke="#00f0ff" strokeWidth="1.2" />

        {/* Brushless Motor */}
        <rect
          x="485"
          y="455"
          width="30"
          height="32"
          rx="4"
          fill={highlightComponent === 'motor' ? '#00f0ff' : '#1e293b'}
          stroke="#00f0ff"
          strokeWidth={highlightComponent === 'motor' ? 3 : 1.5}
          filter={highlightComponent === 'motor' ? 'url(#glowCyan)' : undefined}
        />
        <circle cx="500" cy="471" r="6" fill="#f59e0b" />

        {/* Spinning Propeller Disk / Blades */}
        <g transform="translate(500, 487)">
          <ellipse
            cx="0"
            cy="0"
            rx="46"
            ry={spinningProp ? '6' : '10'}
            fill="none"
            stroke={highlightComponent === 'propeller' ? '#38bdf8' : '#00f0ff'}
            strokeWidth={highlightComponent === 'propeller' ? 3 : 1.5}
            strokeDasharray="8,6"
            className={spinningProp ? 'animate-spin' : ''}
            style={{ transformOrigin: '0 0', animationDuration: '0.4s' }}
          />
        </g>

        {/* 9. Internal Electronics & Avionics Architecture (Visible when showInternals or Highlighted) */}
        {/* 3S LiPo Battery (Nose ballast for 28% MAC Center of Gravity) */}
        <rect
          x="485"
          y="295"
          width="30"
          height="48"
          rx="4"
          fill={highlightComponent === 'battery' ? '#f59e0b' : '#0b1524'}
          fillOpacity={showInternals || highlightComponent === 'battery' ? 0.9 : 0.3}
          stroke="#f59e0b"
          strokeWidth={highlightComponent === 'battery' ? 3 : 1.5}
          filter={highlightComponent === 'battery' ? 'url(#glowCyan)' : undefined}
        />
        <text x="500" y="324" fill="#f59e0b" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          LiPo 3S
        </text>

        {/* 2.4 GHz Receiver */}
        <rect
          x="486"
          y="355"
          width="28"
          height="30"
          rx="3"
          fill={highlightComponent === 'receiver' ? '#38bdf8' : '#0b1524'}
          fillOpacity={showInternals || highlightComponent === 'receiver' ? 0.9 : 0.3}
          stroke="#38bdf8"
          strokeWidth={highlightComponent === 'receiver' ? 3 : 1.5}
        />
        <text x="500" y="374" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          RX 6CH
        </text>

        {/* 30A Electronic Speed Controller (ESC) */}
        <rect
          x="486"
          y="400"
          width="28"
          height="38"
          rx="3"
          fill={highlightComponent === 'esc' ? '#10b981' : '#0b1524'}
          fillOpacity={showInternals || highlightComponent === 'esc' ? 0.9 : 0.3}
          stroke="#10b981"
          strokeWidth={highlightComponent === 'esc' ? 3 : 1.5}
        />
        <text x="500" y="423" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          ESC 30A
        </text>

        {/* Port Elevon Servo */}
        <rect
          x="385"
          y="410"
          width="20"
          height="24"
          rx="3"
          fill={highlightComponent === 'servo-1' || highlightComponent === 'servos' ? '#e879f9' : '#0b1524'}
          fillOpacity={showInternals || highlightComponent?.includes('servo') ? 0.9 : 0.3}
          stroke="#e879f9"
          strokeWidth={highlightComponent === 'servo-1' ? 3 : 1.5}
        />
        {/* Starboard Elevon Servo */}
        <rect
          x="595"
          y="410"
          width="20"
          height="24"
          rx="3"
          fill={highlightComponent === 'servo-2' || highlightComponent === 'servos' ? '#e879f9' : '#0b1524'}
          fillOpacity={showInternals || highlightComponent?.includes('servo') ? 0.9 : 0.3}
          stroke="#e879f9"
          strokeWidth={highlightComponent === 'servo-2' ? 3 : 1.5}
        />

        {/* Pushrods to Elevons */}
        <line x1="385" y1="422" x2="310" y2="445" stroke="#e879f9" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="615" y1="422" x2="690" y2="445" stroke="#e879f9" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* 10. Wingtip Navigation Beacons */}
        {/* Starboard (Right) Green */}
        <circle cx="830" cy="405" r="14" fill="url(#navGlowGreen)" />
        <circle cx="830" cy="405" r="4" fill="#10b981" className="animate-ping" />
        {/* Port (Left) Red */}
        <circle cx="170" cy="405" r="14" fill="url(#navGlowRed)" />
        <circle cx="170" cy="405" r="4" fill="#ef4444" className="animate-ping" />

        {/* 11. Center of Gravity (CG) 28% MAC Marker */}
        <g opacity={showInternals ? 1 : 0.5}>
          <circle cx="500" cy="330" r="14" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
          <circle cx="500" cy="330" r="4" fill="#f59e0b" />
          <line x1="480" y1="330" x2="520" y2="330" stroke="#f59e0b" strokeWidth="1" />
          <line x1="500" y1="310" x2="500" y2="350" stroke="#f59e0b" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
