type LeafProps = {
  x: number; // X coordinate of the leaf's center
  y: number; // Y coordinate of the leaf's center
  size: number;
  color: string;
};

export default function Leaf({ x, y, size, color }: LeafProps) {
  return (
    <div
      style={{
        position: 'absolute', // Allows free positioning inside parent
        left: x - size / 2, // Center the leaf horizontally
        top: y - size / 2, // Center the leaf vertically
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%', // Make the leaf perfectly circular
        zIndex: 10, // Ensure it appears above lines/branches
      }}
    />
  );
}
