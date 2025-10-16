'use client'; 


export type LineProps = {
  length: number; // Length of the line in pixels
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
        width: `${width}px`,
        height: `${length}px`, 
        backgroundColor: color, 
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
