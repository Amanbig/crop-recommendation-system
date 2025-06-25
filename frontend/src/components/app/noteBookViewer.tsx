"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Badge } from '../ui/badge';

SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('python', python);

type Cell = {
  cell_type: string;
  source: string[];
  outputs?: any[];
};

const NotebookViewer: React.FC = () => {
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/notebook')
      .then(res => res.json())
      .then(data => {
        setCells(data.cells || []);
      });
  }, []);

  return (
    <div className="p-4 space-y-4">
      {cells.map((cell, index) => {
        if (cell.cell_type === 'markdown') {
          return (
            <Badge key={index} className="p-2 text-xl rounded-md shadow">
              <ReactMarkdown>
                {Array.isArray(cell.source) ? cell.source.join('') : cell.source}
              </ReactMarkdown>
            </Badge>
          );
        } else if (cell.cell_type === 'code') {
          return (
            <div key={index} className="p-2 rounded-md shadow">
              <SyntaxHighlighter language="python" style={github}>
                {Array.isArray(cell.source) ? cell.source.join('') : cell.source}
              </SyntaxHighlighter>
              {cell.outputs?.map((output, i) => (
                <div key={i} className="p-2 mt-1 rounded">
                  {output.text
                    ? <pre>{Array.isArray(output.text) ? output.text.join('') : output.text}</pre>
                    : output.data?.['text/plain']
                      ? <pre>{output.data['text/plain']}</pre>
                      : null}
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default NotebookViewer;
