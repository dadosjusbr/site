interface HSLColor {
  h: number;
  s: number;
  l: number;
}

/**
 * Converts an HSL color value to RGB.
 *
 * @param param0 - An object containing HSL values
 * @param param0.h - The hue value (0-360)
 * @param param0.s - The saturation value (0-100)
 * @param param0.l - The lightness value (0-100)
 * @returns A tuple of [red, green, blue] values, each in the range 0-255
 *
 * @example
 * ```typescript
 * const rgb = hslToRgb({ h: 240, s: 100, l: 50 });
 * // Returns [0, 0, 255] (pure blue)
 * ```
 */
function hslToRgb({ h, s, l }: HSLColor): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number;
  let g: number;
  let b: number;
  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Calculates the Euclidean distance between two HSL colors in RGB space.
 *
 * @param color1 - First HSL color in string format "hsl(h, s%, l%)"
 * @param color2 - Second HSL color in string format "hsl(h, s%, l%)"
 * @returns The Euclidean distance between the two colors in RGB space
 *
 * The function:
 * 1. Extracts HSL values from color strings
 * 2. Converts HSL to RGB values
 * 3. Calculates Euclidean distance in RGB space
 *
 * @example
 * ```typescript
 * const distance = colorDistance("hsl(0, 100%, 50%)", "hsl(240, 100%, 50%)");
 * // Returns the RGB distance between pure red and pure blue
 * ```
 */
function colorDistance(color1: string, color2: string): number {
  // Extract HSL values from the color strings
  const hsl1 = color1.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const hsl2 = color2.match(/\d+/g)?.map(Number) || [0, 0, 0];

  const [r1, g1, b1] = hslToRgb({ h: hsl1[0], s: hsl1[1], l: hsl1[2] });
  const [r2, g2, b2] = hslToRgb({ h: hsl2[0], s: hsl2[1], l: hsl2[2] });

  // Calculate the Euclidean distance in RGB space
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function ensureColorDistinction(
  colors: string[],
  minDistance = 50,
  maxAttempts = 100,
): string[] {
  const distinctColors: string[] = [];

  for (const color of colors) {
    let isDistinct = true;
    let attempts = 0;

    // Verify distance with already selected colors
    while (attempts < maxAttempts) {
      isDistinct = true;
      for (const existingColor of distinctColors) {
        const distance = colorDistance(color, existingColor);

        if (distance < minDistance) {
          isDistinct = false;
          break;
        }
      }

      if (isDistinct) {
        distinctColors.push(color);
        break;
      }

      attempts += 1;
    }

    if (!isDistinct) {
      // eslint-disable-next-line no-console
      console.warn(`Não foi possível encontrar cor distinta para: ${color}`);
    }
  }

  return distinctColors;
}

/**
 * Custom hook that generates an array of unique HSL colors with sufficient visual distinction between them.
 * Colors are generated using a golden ratio conjugate for better distribution across the color spectrum.
 *
 * @param count - The number of unique colors to generate
 * @returns An array of HSL color strings in the format "hsl(h, s%, l%)"
 *
 * The generated colors have the following characteristics:
 * - Hue: Distributed using golden ratio conjugate (137.508°)
 * - Saturation: Alternates between 65% and 80%
 * - Lightness: Ranges between 45% and 75% in three steps
 *
 * The function ensures that:
 * - Colors are visually distinct (minimum RGB distance of 50)
 * - Colors have appropriate saturation for visibility
 * - Colors maintain readable lightness values
 *
 * @example
 * ```typescript
 * const colors = useUniqueColors(5);
 * // Returns ["hsl(137.5, 65%, 45%)", "hsl(275, 80%, 60%)", ...]
 * ```
 */
export function useUniqueColors(count: number): string[] {
  const colors: string[] = [];
  const minLightness = 45;
  const maxLightness = 75;

  for (let i = 0; i < count * 2; i += 1) {
    // Golden ratio conjugate for better distribution
    const hue = (i * 137.508) % 360;
    const saturation = 65 + (i % 2) * 15;
    const lightness =
      minLightness + ((i % 3) * (maxLightness - minLightness)) / 2;

    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  // Filter distinct colors
  return ensureColorDistinction(colors, 50).slice(0, count);
}
