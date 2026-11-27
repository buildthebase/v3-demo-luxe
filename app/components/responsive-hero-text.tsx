import type { ReactNode } from "react";

export function ResponsiveHeroText({ mobile, children }: { mobile: string; children: ReactNode }) {
  return <><span className="hero-title-desktop">{children}</span><span className="hero-title-mobile">{mobile}</span></>;
}
