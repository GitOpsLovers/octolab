'use client';

import { useMemo } from 'react';
import { Prism as SyntaxHighlighter, createElement } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import YAML from 'yaml';

import '../../styles/yaml-template-block.styles.css';

interface FieldLike {
    key: string;
    value?: unknown;
    yamlPath?: string | string[];
    highlightTarget?: 'value' | 'key';
}

/**
 * Split a YAML path into its components.
 */
function splitPath(path: string): Array<string | number> {
    return path.split('.').flatMap((part) => {
        const m = /^([\w-]+)\[(\d+)]$/.exec(part);
        if (m) return [m[1], Number(m[2])];
        return [part];
    });
}

/**
 * Get a YAML node by its path.
 */
function getNodeByPath(doc: YAML.Document.Parsed, path: string) {
    const parts = splitPath(path);
    let node: any = doc.contents;
    for (const p of parts) {
        if (!node) return null;
        if (typeof p === 'number') {
            const seq = node?.items ?? node;
            node = Array.isArray(seq) ? seq[p] : null;
        } else {
            const items = node?.items;
            if (!Array.isArray(items)) return null;
            const entry = items.find((kv: any) => (kv.key?.value ?? kv.key) === p);
            node = entry?.value ?? null;
        }
    }
    return node ?? null;
}

/** Get the Pair (key/value) for the last segment of a path. */
function getPairByPath(doc: YAML.Document.Parsed, path: string) {
    const parts = splitPath(path);
    let node: any = doc.contents;
    let pair: any = null;

    for (const p of parts) {
        if (!node) return null;

        if (typeof p === 'number') {
            // Índice de secuencia
            const seq = node?.items ?? node;
            node = Array.isArray(seq) ? seq[p] : null;
            pair = null; // en índices no hay 'pair'
        } else {
            // Clave dentro de un Map
            const items = node?.items;
            if (!Array.isArray(items)) return null;
            pair = items.find((kv: any) => (kv.key?.value ?? kv.key) === p) ?? null;
            node = pair ? pair.value : null;
        }
    }
    return pair;
}

/** Reemplaza placeholders ${fieldKey} en rutas con el value actual del campo. */
function resolvePathTemplate(path: string, fields: FieldLike[]) {
    return path.replace(/\${([\w-]+)}/g, (_, k: string) => {
        const f = fields.find((x) => x.key === k);
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        return String(f?.value ?? k); // fallback al nombre si no hay valor
    });
}

/** Une rangos contiguos/solapados para evitar parpadeos. */
function mergeRanges(ranges: Array<[number, number]>): Array<[number, number]> {
    if (ranges.length <= 1) return ranges;
    const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
    const merged: Array<[number, number]> = [];
    let [curStart, curEnd] = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
        const [s, e] = sorted[i];
        if (s <= curEnd + 1) {
            curEnd = Math.max(curEnd, e);
        } else {
            merged.push([curStart, curEnd]);
            [curStart, curEnd] = [s, e];
        }
    }
    merged.push([curStart, curEnd]);
    return merged;
}

function isPrefixPath(a: Array<string | number>, b: Array<string | number>) {
    if (a.length > b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export interface YamlTemplateBlockProps {
    content: string;
    fields: FieldLike[];
    highlightedKey: string | null;
    className?: string;
}

/**
 * YAML preview block form template workflows component.
 */
export default function YamlTemplateBlock({ content, fields, highlightedKey, className }: YamlTemplateBlockProps) {
    /**
     * Get the line range for each field.
     */
    const lineRangeByField = useMemo(() => {
        if (!content || !fields?.length) return {};
        const doc = YAML.parseDocument(content);
        const ranges: Record<string, Array<[number, number]>> = {};

        for (const f of fields) {
            if (!f.yamlPath) continue;

            const rawPaths = Array.isArray(f.yamlPath) ? f.yamlPath : [f.yamlPath];
            const paths = rawPaths.map((p) => resolvePathTemplate(p, fields));

            // 1) Recolecta candidatos existentes con sus "parts" para poder filtrar ancestros
            const candidates: Array<{
                parts: Array<string | number>;
                range: [number, number, number];
            }> = [];

            for (const path of paths) {
                const node: any = getNodeByPath(doc, path);
                const pair: any = getPairByPath(doc, path);

                const rawRange =
                    f.highlightTarget === 'key'
                        ? (pair?.key?.range as [number, number, number] | undefined)
                        : ((node?.range ?? pair?.value?.range) as [number, number, number] | undefined);

                if (!rawRange) continue;

                candidates.push({
                    parts: splitPath(path),
                    range: rawRange,
                });
            }

            if (!candidates.length) continue;

            // 2) Quita rutas que sean prefijo de otra más específica (fallback real)
            const filtered = candidates.filter((c, i, arr) => !arr.some((other, j) => j !== i && isPrefixPath(c.parts, other.parts)));

            // 3) Convierte los rangos a líneas y acumula (luego merge)
            for (const { range } of filtered) {
                const [start, end] = range;
                const beforeStart = content.slice(0, start);
                const within = content.slice(start, end);

                const startLine = beforeStart.split('\n').length; // 1-based
                const endLine = startLine + within.split('\n').length - 1;

                if (!ranges[f.key]) ranges[f.key] = [];
                ranges[f.key].push([startLine, endLine]);
            }

            if (ranges[f.key]?.length > 1) {
                ranges[f.key] = mergeRanges(ranges[f.key]);
            }
        }

        return ranges;
    }, [content, fields]);

    /**
     * Get the line range for the highlighted key.
     */
    const highlightedRanges = useMemo(() => (highlightedKey ? (lineRangeByField[highlightedKey] ?? []) : []), [highlightedKey, lineRangeByField]);

    return (
        <SyntaxHighlighter
            language="yaml"
            style={oneDark}
            wrapLines
            renderer={({ rows, stylesheet, useInlineStyles }) =>
                rows.map((row, i) => {
                    const lineNumber = i + 1;
                    const on = highlightedRanges.some(([a, b]) => lineNumber >= a && lineNumber <= b);

                    const line = createElement({ node: row, stylesheet, useInlineStyles, key: i });

                    return (
                        <span key={i} data-line={lineNumber} className={`yaml-line ${on ? 'yaml-highlight' : ''}`}>
                            {line}
                        </span>
                    );
                })
            }
            customStyle={{
                flex: 1,
                overflow: 'auto',
                margin: '0 0 1rem',
                borderRadius: '0.375rem',
            }}
            className={className}
        >
            {content}
        </SyntaxHighlighter>
    );
}
