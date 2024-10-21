import { useState } from 'react';
import { Button } from './button';
import { FaCopy } from 'react-icons/fa';

export default function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <Button onClick={handleCopy} variant="ghost" size="sm">
            {copied ? 'Copied!' : <FaCopy />}
        </Button>
    );
}