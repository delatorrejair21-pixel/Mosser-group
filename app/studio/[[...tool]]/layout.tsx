// Prevents the global site layout (fonts, SmoothScroll, etc.) from wrapping the Studio
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
