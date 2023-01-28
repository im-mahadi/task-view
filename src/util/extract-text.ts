/**
 *
 * @param text - The text to be extracted from the pipe character (|).
 * The text should be in the format of "first part|second part"
 * @returns An array of the first and second part of the text.
 */
export default function extractText(text: string) {
  const firstPart = text.split("|")[0];
  const secondPart = text.split("|")[1];

  return [firstPart, secondPart];
}