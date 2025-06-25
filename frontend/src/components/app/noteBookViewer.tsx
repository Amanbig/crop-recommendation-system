"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import {
  atomOneDark,
  github,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  FileText,
  Code,
  Play,
  Copy,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  Moon,
  Sun,
  AlertCircle,
  Loader2,
} from "lucide-react";

SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("python", python);

type Cell = {
  cell_type: string;
  source: string[];
  outputs?: any[];
  execution_count?: number;
  metadata?: any;
};

type NotebookData = {
  cells: Cell[];
  metadata?: any;
  nbformat?: number;
  nbformat_minor?: number;
};

const NotebookViewer: React.FC = () => {
  const [notebookData, setNotebookData] = useState<NotebookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsedCells, setCollapsedCells] = useState<Set<number>>(new Set());
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/notebook");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotebookData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load notebook",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotebook();
  }, []);

  const toggleCellCollapse = (index: number) => {
    const newCollapsed = new Set(collapsedCells);
    if (newCollapsed.has(index)) {
      newCollapsed.delete(index);
    } else {
      newCollapsed.add(index);
    }
    setCollapsedCells(newCollapsed);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getSourceText = (source: string | string[]): string => {
    return Array.isArray(source) ? source.join("") : source;
  };

  const renderOutput = (output: any, outputIndex: number) => {
    if (output.output_type === "stream") {
      return (
        <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-400 p-3 font-mono text-sm">
          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
            {output.name || "stdout"}
          </div>
          <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {getSourceText(output.text)}
          </pre>
        </div>
      );
    }

    if (
      output.output_type === "execute_result" ||
      output.output_type === "display_data"
    ) {
      const data = output.data;
      if (data?.["text/html"]) {
        return (
          <div className="bg-white dark:bg-gray-900 border rounded p-3">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
              HTML Output
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: getSourceText(data["text/html"]),
              }}
            />
          </div>
        );
      }
      if (data?.["text/plain"]) {
        return (
          <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-green-400 p-3 font-mono text-sm">
            <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
              Output
            </div>
            <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {getSourceText(data["text/plain"])}
            </pre>
          </div>
        );
      }
      if (data?.["image/png"]) {
        return (
          <div className="bg-white dark:bg-gray-900 border rounded p-3">
            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
              Image Output
            </div>
            <img
              src={`data:image/png;base64,${data["image/png"]}`}
              alt="Output"
              className="max-w-full h-auto"
            />
          </div>
        );
      }
    }

    if (output.output_type === "error") {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-3 font-mono text-sm">
          <div className="text-xs text-red-600 dark:text-red-400 mb-1 uppercase tracking-wide flex items-center gap-1">
            <AlertCircle size={12} />
            {output.ename}: {output.evalue}
          </div>
          <pre className="whitespace-pre-wrap text-red-800 dark:text-red-300 text-xs">
            {output.traceback?.join("\n")}
          </pre>
        </div>
      );
    }

    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-3 text-sm">
        <div className="text-xs text-gray-500 mb-1">
          Unknown output type: {output.output_type}
        </div>
        <pre className="text-xs">{JSON.stringify(output, null, 2)}</pre>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Loading notebook...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Failed to Load Notebook
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cells = notebookData?.cells || [];

  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Jupyter Notebook
            </h1>
            <Badge variant="secondary" className="text-xs">
              {cells.length} cells
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLineNumbers(!showLineNumbers)}
            >
              {showLineNumbers ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {cells.map((cell, index) => {
          const isCollapsed = collapsedCells.has(index);
          const sourceText = getSourceText(cell.source);

          if (cell.cell_type === "markdown") {
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Markdown Cell
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(sourceText)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCellCollapse(index)}
                      >
                        {isCollapsed ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {!isCollapsed && (
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown>{sourceText}</ReactMarkdown>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          }

          if (cell.cell_type === "code") {
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Code Cell
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {index + 1}
                      </Badge>
                      {cell.execution_count && (
                        <Badge variant="secondary" className="text-xs">
                          [{cell.execution_count}]
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(sourceText)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCellCollapse(index)}
                      >
                        {isCollapsed ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {!isCollapsed && (
                  <CardContent className="p-0">
                    <div className="border-t">
                      <SyntaxHighlighter
                        language="python"
                        style={resolvedTheme === "dark" ? atomOneDark : github}
                        showLineNumbers={showLineNumbers}
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          background: "transparent",
                        }}
                      >
                        {sourceText}
                      </SyntaxHighlighter>
                    </div>

                    {cell.outputs && cell.outputs.length > 0 && (
                      <div className="border-t bg-gray-50 dark:bg-gray-800/50">
                        <div className="p-3 space-y-3">
                          {cell.outputs.map((output, outputIndex) => (
                            <div key={outputIndex}>
                              {renderOutput(output, outputIndex)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default NotebookViewer;
