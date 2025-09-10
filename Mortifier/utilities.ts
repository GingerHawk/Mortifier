/* ════════════════════════════════════════════════════════════════════════════
   utilities.ts — Mortify Multi-Series Chart Utility Functions
   
   Purpose:
     - Provide common utility functions for multi-series chart data processing
     - Support ECharts option manipulation and series-aware data transformation
     - Handle color processing, gradient generation, and geometric calculations
     - Enable module-based chart customization with type safety
   
   Multi-Series Support:
     - mapSeries(): Process chart series with type-based filtering and transformation
     - getSeriesValue patterns in modules use these utilities for per-series data access
     - Linear gradient generation with angle-to-vector conversion for ECharts
     - Color processing utilities for RGBA manipulation and CSS generation
   
   Key Features:
     - Type-safe utility functions with proper fallback handling
     - ECharts-specific option processing and data structure manipulation
     - Cross-browser color format support (rgba, hex, object-based)
     - Mathematical utilities for gradient angles and coordinate transformations
   
   Architecture:
     - Copy-deployed to each generated plugin's plugin/common/ directory
     - Dynamically imported based on module utility requirements
     - Stateless functions enable predictable data transformation
     - Consistent API patterns across all chart generation modules
════════════════════════════════════════════════════════════════════════════ */

// Import getNumberFormatter from Superset core
import { getNumberFormatter } from '@superset-ui/core';
export { getNumberFormatter };

// Core Types for Multi-Series Chart Processing
export type AnyDict = Record<string, any>;
export type Mapper = (obj: any, index: number) => any;
export type SeriesPredicate = ((s: any, i: number) => boolean) | string | null | undefined;

/* ───────────── Token System ───────────── */

export interface TokenDefinition {
  key: string;
  description: string;
  formatter?: (value: any, context?: any) => any;
  requiresContext?: boolean;
}

export interface TokenContext {
  series?: any[];
  options?: AnyDict;
  chartType?: string;
  seriesIndex?: number;
  formatNumber?: (val: any) => string;
  formatDate?: (val: any) => string;
}

// Standard token definitions
export const STANDARD_TOKENS: TokenDefinition[] = [
  { key: '{{name}}', description: 'Data point name/label' },
  { key: '{{seriesName}}', description: 'Series name' },
  { key: '{{value}}', description: 'Primary value', formatter: (v, ctx) => ctx?.formatNumber?.(v) || v },
  { key: '{{x}}', description: 'X-axis value', formatter: (v, ctx) => ctx?.formatDate?.(v) || v },
  { key: '{{y}}', description: 'Y-axis value', formatter: (v, ctx) => ctx?.formatNumber?.(v) || v },
  { key: '{{dataIndex}}', description: 'Data point index' },
  { key: '{{percent}}', description: 'Percentage value' },
  { key: '{{raw}}', description: 'Raw data object' },
];

// Advanced tokens that access other series data
export const MULTI_SERIES_TOKENS: TokenDefinition[] = [
  { key: '{{seriesCount}}', description: 'Total number of series', requiresContext: true },
  { key: '{{seriesIndex}}', description: 'Current series index (0-based)', requiresContext: true },
  { key: '{{seriesIndex1}}', description: 'Current series index (1-based)', requiresContext: true },
  { key: '{{allSeriesNames}}', description: 'All series names as comma-separated list', requiresContext: true },
  { key: '{{otherSeriesAt(0)}}', description: 'Value from series at index 0', requiresContext: true },
  { key: '{{otherSeriesAt(1)}}', description: 'Value from series at index 1', requiresContext: true },
  { key: '{{otherSeriesAt(2)}}', description: 'Value from series at index 2', requiresContext: true },
  { key: '{{sumAllSeries}}', description: 'Sum of all series values at this point', requiresContext: true },
  { key: '{{avgAllSeries}}', description: 'Average of all series values at this point', requiresContext: true },
  { key: '{{minAllSeries}}', description: 'Minimum value across all series at this point', requiresContext: true },
  { key: '{{maxAllSeries}}', description: 'Maximum value across all series at this point', requiresContext: true },
];

export const ALL_TOKENS = [...STANDARD_TOKENS, ...MULTI_SERIES_TOKENS];

// Enhanced token renderer with multi-series support
export function renderTokens(template: string, params: any, context?: TokenContext): string {
  if (!template) return '';
  
  const isArr = Array.isArray(params?.value);
  const xVal = isArr ? params.value[0] : (params?.axisValue);
  const yVal = isArr ? params.value[1] : (params?.value);
  
  // Build standard token map
  const tokenMap: AnyDict = {
    '{{name}}': params?.name,
    '{{seriesName}}': params?.seriesName,
    '{{value}}': isArr ? (params.value || []).join(', ') : (params?.value),
    '{{x}}': xVal,
    '{{y}}': yVal,
    '{{dataIndex}}': params?.dataIndex,
    '{{percent}}': params?.percent,
    '{{raw}}': params?.data,
  };
  
  // Add multi-series tokens if context is available
  if (context) {
    const { series, seriesIndex = 0 } = context;
    
    tokenMap['{{seriesCount}}'] = series?.length || 0;
    tokenMap['{{seriesIndex}}'] = seriesIndex;
    tokenMap['{{seriesIndex1}}'] = seriesIndex + 1;
    tokenMap['{{allSeriesNames}}'] = series?.map(s => s.name || '').join(', ') || '';
    
    // Multi-series value access
    if (series && params?.dataIndex !== undefined) {
      const dataIndex = params.dataIndex;
      
      // Access other series values at same data point
      for (let i = 0; i < Math.min(series.length, 5); i++) {
        const otherSeries = series[i];
        const otherValue = otherSeries?.data?.[dataIndex]?.value || 
                          otherSeries?.data?.[dataIndex]?.[1] ||
                          otherSeries?.data?.[dataIndex] || 0;
        tokenMap[`{{otherSeriesAt(${i})}}`] = otherValue;
      }
      
      // Calculate aggregations across all series at this data point
      const allValuesAtPoint = series.map(s => {
        const value = s?.data?.[dataIndex]?.value || 
                     s?.data?.[dataIndex]?.[1] ||
                     s?.data?.[dataIndex] || 0;
        return typeof value === 'number' ? value : 0;
      });
      
      tokenMap['{{sumAllSeries}}'] = allValuesAtPoint.reduce((a, b) => a + b, 0);
      tokenMap['{{avgAllSeries}}'] = allValuesAtPoint.length > 0 
        ? allValuesAtPoint.reduce((a, b) => a + b, 0) / allValuesAtPoint.length 
        : 0;
      tokenMap['{{minAllSeries}}'] = Math.min(...allValuesAtPoint);
      tokenMap['{{maxAllSeries}}'] = Math.max(...allValuesAtPoint);
    }
  }
  
  // Apply formatting and replace tokens
  let result = template;
  for (const [token, value] of Object.entries(tokenMap)) {
    if (value != null) {
      let formatted = value;
      
      // Apply number formatting to numeric tokens
      if ((token === '{{value}}' || token === '{{y}}' || token.includes('Series') || token.includes('otherSeriesAt')) 
          && typeof value === 'number' && context?.formatNumber) {
        formatted = context.formatNumber(value);
      }
      
      // Apply date formatting to date tokens
      if ((token === '{{x}}' || token === '{{name}}') && context?.formatDate) {
        formatted = context.formatDate(value);
      }
      
      result = result.split(token).join(String(formatted));
    }
  }
  
  return result;
}

// Helper to get series data for context
export function getSeriesContext(options: AnyDict, currentSeriesIndex?: number): TokenContext {
  const series = Array.isArray(options?.series) ? options.series : [];
  return {
    series,
    seriesIndex: currentSeriesIndex,
    options,
  };
}

/* ───────────── Geometry ───────────── */

// Angle in degrees → unit vector (plus x2,y2 aliases used by ECharts gradients)
export function angleToVec(deg?: number) {
  const d = Number.isFinite(deg as number) ? (deg as number) : 0;
  const rad = (d * Math.PI) / 180;
  const x = Math.cos(rad);
  const y = Math.sin(rad);
  return { x, y, x2: x, y2: y }; // x2/y2 convenience
}

/* ───────────── Parsing & Safety ───────────── */

export function asNumber(v: unknown, fallback?: number): number {
  const n = typeof v === 'number' ? v : Number(v as any);
  return Number.isFinite(n) ? n : (Number.isFinite(fallback as number) ? (fallback as number) : Number.NaN);
}

export function asPercent01(v: any, defPct: number) {
  const n = asNumber(v, defPct);
  return clamp01(n > 1 ? n / 100 : n);
}


export function numOr(v: unknown, d: number): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}

export function numOrNull(v: unknown): number | null {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function clamp0(n: number): number {
  return n < 0 ? 0 : n;
}

export function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function pct100(v: unknown): number {
  const n = asNumber(v);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

/* ───────────── Colors / CSS ───────────── */

export function rgba(c: any) {
  if (!c) return undefined as any;
  if (typeof c === 'string') return c;
  const { r, g, b, a } = c as AnyDict;
  const alpha = Number.isFinite(a) ? a : 1;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function withOpacity(c: any, alpha: number) {
  if (!c) return undefined as any;
  if (typeof c === 'string') return c;
  const { r, g, b } = c as AnyDict;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function mergeCssText(a?: string, b?: string) {
  const A = (a || '').trim();
  const B = (b || '').trim();
  if (!A && !B) return undefined;
  if (!A) return B;
  if (!B) return A;
  return `${A}; ${B}`;
}

/* ───────────── ECharts Options Mappers ───────────── */

export function mapArrayProp(options: AnyDict, prop: string, fn: Mapper) {
  const root = options || {};
  const orig = (root as any)[prop];
  const hadMissing = typeof orig === 'undefined';
  const wasArray = Array.isArray(orig);
  const arr: any[] = hadMissing ? [] : (wasArray ? (orig as any[]) : [orig]);

  const mapped = arr.map((o, i) => fn({ ...(o || {}) }, i));

  if (hadMissing && mapped.length === 0) {
    delete (root as any)[prop];
  } else {
    (root as any)[prop] = wasArray ? mapped : mapped[0];
  }
  return root;
}


export function mapSeries(options: AnyDict, predicate: SeriesPredicate, fn: Mapper) {
  const series = Array.isArray((options as any).series) ? (options as any).series : null;
  if (!series) return options;

  const predFn =
    typeof predicate === 'function'
      ? (predicate as (s: any, i: number) => boolean)
      : typeof predicate === 'string'
      ? (s: any) => String(s?.type).toLowerCase() === String(predicate).toLowerCase()
      : () => true;

  series.forEach((s: any, i: number) => {
    if (!predFn(s, i)) return;
    const out = fn(s, i);
    // If the mapper returns a value, replace the series entry; otherwise assume in-place mutation.
    if (typeof out !== 'undefined') series[i] = out;
  });

  return options;
}

// Build an ECharts linear gradient object from an angle (deg) and stops.
// Each stop: { offset: number in [0,1], color: string | {r,g,b,a?} }
export function toLinearGradient(angleDeg: number | undefined, stops: Array<{ offset: number; color: any }>) {
  if (!Array.isArray(stops) || stops.length < 2) return undefined;

  // Normalize stops: clamp offsets and convert colors via existing helpers
  const colorStops = stops
    .map(s => ({
      offset: clamp01(Number.isFinite(s?.offset as number) ? (s!.offset as number) : 0),
      color: rgba(s?.color),
    }))
    .filter(s => typeof s.color === 'string')
    .sort((a, b) => a.offset - b.offset);

  if (colorStops.length < 2) return undefined;

  // Direction from angle (uses existing angleToVec helper)
  const v = angleToVec(angleDeg || 0);

  // Convert direction vector into gradient endpoints in [0..1] space
  // Centered line of length 1: start = center - v/2, end = center + v/2
  const cx = 0.5, cy = 0.5;
  const x = cx - v.x / 2;
  const y = cy - v.y / 2;
  const x2 = cx + v.x / 2;
  const y2 = cy + v.y / 2;

  return {
    type: 'linear' as const,
    x, y, x2, y2,
    colorStops,
    global: false,
  };
}


export function mapSingle(options: AnyDict, prop: string, fn: Mapper) {
  const root = options || {};
  const base = { ...(root as any)[prop] } as AnyDict;
  (root as any)[prop] = fn(base, 0);
  return root;
}