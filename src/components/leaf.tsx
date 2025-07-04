type LeafProps = {
  x: number;
  y: number;
  size: number;
  color: string;
};

export default function Leaf({ x, y, size, color }: LeafProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        zIndex: 10,
      }}
    />
  );
}
