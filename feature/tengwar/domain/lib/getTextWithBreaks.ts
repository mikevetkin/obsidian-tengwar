function getTextWithBreaks(element: HTMLElement | null): string {
  if (!element) return '';

  return Array.from(element.childNodes)
    .map((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return (node as Text).textContent || '';
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === 'BR') {
          return '\n';
        }
        return getTextWithBreaks(el);
      }
      return '';
    })
    .join('');
}
