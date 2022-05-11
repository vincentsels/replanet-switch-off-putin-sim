export function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function toss() {
  return Math.random() > 0.5;
}

// Source: https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
export function initCase(input: string): string {
  return input
  // Insert a space before all caps
  .replace(/([A-Z])/g, ' $1')
  // Uppercase the first character
  .replace(/^./, s => s.toUpperCase())
  // Trim
  .trim();
}
