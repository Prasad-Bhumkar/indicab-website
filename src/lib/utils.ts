function cn(..._classes: (string | undefined | null)[]) {
    return _classes.filter((cls): cls is string => cls !== null && cls !== undefined).join(' ');
}

function formatDate(_date: Date): string {
    return _date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function generateUniqueId(_prefix: string = 'id'): string {
    return `${_prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

export { cn };
