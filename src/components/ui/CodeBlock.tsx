import { clsx } from 'clsx';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
          {title}
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className={clsx(
            'block text-gray-100',
            language === 'typescript' && 'language-typescript',
            language === 'javascript' && 'language-javascript',
            language === 'json' && 'language-json'
          )}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}