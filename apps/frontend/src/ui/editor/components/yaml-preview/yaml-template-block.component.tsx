'use client';

import { useMemo } from 'react';
import { Prism as SyntaxHighlighter, createElement } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import YAML from 'yaml';

import '../../styles/yaml-template-block.styles.css';

interface FieldLike {
    key: string;
    yamlPath?: string;
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
        const ranges: Record<string, [number, number]> = {};

        for (const f of fields) {
            if (!f.yamlPath) continue;
            const node: any = getNodeByPath(doc, f.yamlPath);
            const range = node?.range as [number, number, number] | undefined;
            if (!range) continue;

            const [start, end] = range;
            const beforeStart = content.slice(0, start);
            const within = content.slice(start, end);

            const startLine = beforeStart.split('\n').length; // 1-based
            const endLine = startLine + within.split('\n').length - 1;

            ranges[f.key] = [startLine, endLine];
        }
        return ranges;
    }, [content, fields]);

    /**
     * Get the line range for the highlighted key.
     */
    const highlightedRange = useMemo(() => (highlightedKey ? (lineRangeByField[highlightedKey] ?? null) : null), [highlightedKey, lineRangeByField]);

    return (
        <SyntaxHighlighter
            language="yaml"
            style={oneDark}
            wrapLines
            renderer={({ rows, stylesheet, useInlineStyles }) =>
                rows.map((row, i) => {
                    const lineNumber = i + 1;
                    const on = !!highlightedRange && lineNumber >= highlightedRange[0] && lineNumber <= highlightedRange[1];

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
