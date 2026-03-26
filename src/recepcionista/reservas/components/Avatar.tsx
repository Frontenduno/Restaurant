import { getInitialAvatar } from "../utils/reservasUtils";

export function Avatar({ nombre, size = 36 }: { nombre: string, size?: number }) {
  const { initials, hue } = getInitialAvatar(nombre, size);
  return (
    <div 
        className="rounded-full flex items-center justify-center font-bold shrink-0"
        style={{
      width: size, height: size,
      background: `hsl(${hue}, 65%, 88%)`,
      color: `hsl(${hue}, 55%, 35%)`,
      fontSize: size * 0.35,
      letterSpacing: 0.5,
    }}>{initials}</div>
  );
}
