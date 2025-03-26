function cn(...classes: (string | undefined | null)[]) {
  return classes.filter((cls): cls is string => cls !== null && cls !== undefined).join(' ');
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function generateUniqueId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

export { cn };
