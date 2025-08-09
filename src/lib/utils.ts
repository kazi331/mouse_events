export default function generateRandomRgbColor(alpha: number = 0.8) {
  const r = Math.floor(Math.random() * 256); // Red value (0-255)
  const g = Math.floor(Math.random() * 256); // Green value (0-255)
  const b = Math.floor(Math.random() * 256); // Blue value (0-255)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
