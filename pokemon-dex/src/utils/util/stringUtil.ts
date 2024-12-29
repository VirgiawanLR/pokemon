export function formatNumber(number: number): string {
  // Convert the number to a string and pad it with zeros to ensure a length of 4
  return `#${number.toString().padStart(4, "0")}`;
}

export function hectogramsToLbs(hectograms: number): number {
  const hectogramToPoundsFactor = 0.220462; // 1 hectogram equals approximately 0.220462 lbs
  return parseFloat((hectograms * hectogramToPoundsFactor).toFixed(2)); // Rounds to 2 decimal places
}

export function decimetersToInches(decimeters: number): number {
  const decimeterToInchFactor = 3.93701; // 1 decimeter equals approximately 3.93701 inches
  return parseFloat((decimeters * decimeterToInchFactor).toFixed(2)); // Rounds to 2 decimal places
}