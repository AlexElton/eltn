"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  BikeHiPath,
  BikeLoPath,
  BikeMidPath,
  RunHiPath,
  RunLoPath,
  RunMidPath,
  SwimHiPath,
  SwimLoPath,
  SwimMidPath,
} from "./course-paths";

type Leg = {
  id: "swim" | "bike" | "run";
  label: string;
  distance: string;
  time: string;
  pace: string;
  divRank: string;
  color: string;
  // Detail levels by zoom: lo (zoomed out), mid, hi (zoomed in)
  paths: { lo: string; mid: string; hi: string };
};

const legs: Leg[] = [
  {
    id: "swim",
    label: "Swim",
    distance: "3.8 km",
    time: "1:12:57",
    pace: "1:55 /100m",
    divRank: "Div. rank 51",
    color: "#38bdf8",
    paths: { lo: SwimLoPath, mid: SwimMidPath, hi: SwimHiPath },
  },
  {
    id: "bike",
    label: "Bike",
    distance: "125 km",
    time: "3:43:23",
    pace: "33.6 km/h",
    divRank: "Div. rank 64",
    color: "#f59e0b",
    paths: { lo: BikeLoPath, mid: BikeMidPath, hi: BikeHiPath },
  },
  {
    id: "run",
    label: "Run",
    distance: "21.1 km · half marathon",
    time: "1:47:15",
    pace: "5:05 /km",
    divRank: "Div. rank 43",
    color: "#f43f5e",
    paths: { lo: RunLoPath, mid: RunMidPath, hi: RunHiPath },
  },
];

const VB_W = 800;
const VB_H = 640;
const MIN_SCALE = 1;
const MAX_SCALE = 6;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function CourseMap() {
  const [active, setActive] = useState<Leg["id"] | null>(null);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);

  const clampView = useCallback(
    (v: { scale: number; x: number; y: number }) => ({
      scale: v.scale,
      x: clamp(v.x, VB_W * (1 - v.scale), 0),
      y: clamp(v.y, VB_H * (1 - v.scale), 0),
    }),
    [],
  );

  // Wheel zoom (non-passive so we can preventDefault)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * VB_W;
      const cy = ((e.clientY - rect.top) / rect.height) * VB_H;
      setView((v) => {
        const scale = clamp(v.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), MIN_SCALE, MAX_SCALE);
        const k = scale / v.scale;
        return clampView({ scale, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
      });
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      svg.removeEventListener("wheel", onWheel);
    };
  }, [clampView]);

  const zoomBy = (factor: number) => {
    setView((v) => {
      const scale = clamp(v.scale * factor, MIN_SCALE, MAX_SCALE);
      const k = scale / v.scale;
      const cx = VB_W / 2;
      const cy = VB_H / 2;
      return clampView({ scale, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
    });
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, x: view.x, y: view.y };
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    const svg = svgRef.current;
    if (!d || !svg) return;
    const rect = svg.getBoundingClientRect();
    const ux = (VB_W / rect.width) * (e.clientX - d.px);
    const uy = (VB_H / rect.height) * (e.clientY - d.py);
    setView((v) => clampView({ ...v, x: d.x + ux, y: d.y + uy }));
  };

  const endDrag = () => {
    drag.current = null;
  };

  const selected = legs.find((l) => l.id === active) ?? null;

  // Markers/labels keep constant screen size: counter-scale around their own anchor
  const fixed = (x: number, y: number) => `translate(${x} ${y}) scale(${1 / view.scale})`;

  return (
    <div className="overflow-hidden rounded-lg border border-primary/20 bg-secondary/40">
      {/* Leg selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-primary/10 p-3">
        <button
          type="button"
          onClick={() => {
            setActive(null);
          }}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            active === null
              ? "bg-primary text-secondary"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          Full course
        </button>
        {legs.map((leg) => (
          <button
            key={leg.id}
            type="button"
            onClick={() => {
              setActive(leg.id);
            }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors"
            style={
              active === leg.id
                ? { backgroundColor: leg.color, color: "#1c1208" }
                : { backgroundColor: `${leg.color}22`, color: leg.color }
            }
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: leg.color }} />
            {leg.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              zoomBy(1 / 1.4);
            }}
            aria-label="Zoom out"
            className="h-7 w-7 rounded-md bg-primary/10 text-sm text-primary hover:bg-primary/20"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => {
              zoomBy(1.4);
            }}
            aria-label="Zoom in"
            className="h-7 w-7 rounded-md bg-primary/10 text-sm text-primary hover:bg-primary/20"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              setView({ scale: 1, x: 0, y: 0 });
            }}
            className="ml-1 rounded-md bg-primary/10 px-2 py-1 text-xs text-primary hover:bg-primary/20"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="relative aspect-800/640 w-full touch-none select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-full w-full cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          role="img"
          aria-label="Interactive IRONMAN Frankfurt course map"
        >
          <g transform={`translate(${view.x} ${view.y}) scale(${view.scale})`}>
            {/* Lake (Langener Waldsee) — swim bbox center */}
            <ellipse cx="180" cy="590" rx="18" ry="14" fill="#38bdf8" opacity="0.12" />

            {/* Courses — geometry scales with zoom, non-scaling-stroke keeps lines thin */}
            {legs.map((leg) => {
              const dim = active !== null && active !== leg.id;
              return (
                <path
                  key={leg.id}
                  d={detailFor(view.scale, leg)}
                  fill="none"
                  stroke={leg.color}
                  strokeWidth={active === leg.id ? 7 : 4}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={dim ? 0.2 : 1}
                  className="cursor-pointer transition-all"
                  onClick={() => {
                    setActive(active === leg.id ? null : leg.id);
                  }}
                >
                  <title>{`${leg.label} — ${leg.distance}`}</title>
                </path>
              );
            })}

            {/* Markers — each counter-scaled around its anchor so size stays constant */}
            <g pointerEvents="none">
              {/* Swim start (lake) */}
              <g transform={fixed(187, 579)}>
                <circle r="5" fill="#38bdf8" stroke="#1c1208" strokeWidth="2" />
              </g>
              <g transform={fixed(180, 614)}>
                <text textAnchor="middle" fontSize="12" fill="#f3e8d8" opacity="0.8">
                  Langener Waldsee
                </text>
              </g>
              {/* Transition (T1/T2) + Start / Finish (transition area) */}
              <g transform={fixed(285, 360)}>
                <rect x="-5" y="-5" width="10" height="10" fill="#bb935c" transform="rotate(45)" />
                <text x="16" y="5" fontSize="11" fill="#bb935c">
                  T1/T2
                </text>
                <circle r="7" fill="#f43f5e" stroke="#1c1208" strokeWidth="2" />
              </g>
              <g transform={fixed(285, 344)}>
                <text textAnchor="middle" fontSize="13" fill="#f3e8d8" fontWeight="600">
                  Start / Finish
                </text>
              </g>
              {/* Place labels */}
              <g transform={fixed(292, 375)}>
                <text
                  textAnchor="middle"
                  fontSize="14"
                  fill="#f3e8d8"
                  opacity="0.5"
                  fontWeight="600"
                >
                  FRANKFURT
                </text>
              </g>
              <g transform={fixed(500, 80)}>
                <text
                  textAnchor="middle"
                  fontSize="12"
                  fill="#f3e8d8"
                  opacity="0.4"
                  fontWeight="600"
                >
                  BAD HOMBURG
                </text>
              </g>
            </g>
          </g>
        </svg>

        {/* Selected leg info */}
        {selected ? (
          <div className="absolute bottom-3 right-3 rounded-lg border border-primary/20 bg-secondary/90 px-4 py-3 backdrop-blur">
            <p className="text-sm font-semibold" style={{ color: selected.color }}>
              {selected.label} · {selected.distance}
            </p>
            <p className="mt-0.5 font-mono text-lg text-foreground">{selected.time}</p>
            <p className="text-xs text-foreground/60">
              {selected.pace} · {selected.divRank}
            </p>
          </div>
        ) : (
          <div className="absolute bottom-3 right-3 rounded-lg bg-secondary/70 px-3 py-1.5 text-xs text-foreground/60 backdrop-blur">
            Click a course to focus · scroll to zoom · drag to pan
          </div>
        )}
      </div>
    </div>
  );
}

// Pick path detail level from current zoom
const detailFor = (scale: number, leg: Leg) =>
  scale >= 3 ? leg.paths.hi : scale >= 1.8 ? leg.paths.mid : leg.paths.lo;
