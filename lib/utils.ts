function cn(...classes: string[]) {
  return classes.filter((cls) => cls !== null && cls !== undefined).join(' ');
}

export { cn };
