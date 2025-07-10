'use client'; // Enables React client-side rendering

// Props for configuring the appearance and positioning of the line
export type LineProps = {
  length: number; // Length (height) of the line in pixels
  angle: number; // Rotation angle in degrees
  width: number; // Width (thickness) of the line
  color?: string; // Optional color of the line
  style?: React.CSSProperties; // Additional CSS styles (e.g., position)
};

// Line component renders a vertical branch rotated by a certain angle
export default function Line({
  length,
  angle,
  width,
  color,
  style,
}: LineProps) {
  return (
    <div
      className="absolute" // Allow free positioning inside a parent container
      style={{
        width: `${width}px`, // Set the visual thickness of the line
        height: `${length}px`, // Set the length (height) of the branch
        backgroundColor: color, // Apply the desired color
        transform: `translateX(-50%) rotate(${angle}deg)`,
        // - Center the line horizontally around its base using translateX(-50%)
        // - Rotate the line from its base by the given angle

        transformOrigin: 'bottom center',
        // - This ensures the line rotates around its bottom (like a growing tree)

        ...style, // Merge in custom positioning (usually top/left)
      }}
    />
  );
}
