import { marked } from 'marked';
import DOMPurify from 'dompurify';
import 'github-markdown-css/github-markdown-dark.css';

export function Markdown({ content }: { content: string }) {
    const markdownHtml = marked(content, { async: false });

    return (
        <span
            className="markdown-body leading-7!"
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(markdownHtml),
            }}
        />
    );
}
