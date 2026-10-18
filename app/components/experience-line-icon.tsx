export function ExperienceLineIcon({ type }: { type: string }) {
  const path = type === "coffee"
    ? "M13 27h31v12a14 14 0 0 1-28 0V27Zm31 2h4a7 7 0 0 1 0 14h-5M10 55h42M23 21c-5-5 5-7 0-12m9 12c-5-5 5-7 0-12m9 12c-5-5 5-7 0-12"
    : type === "dessert"
      ? "M17 35h30l-5 22H22l-5-22Zm9 5 2 12m10-12-2 12M16 35a7 7 0 0 1-1-13 9 9 0 0 1 9-11c3-5 11-5 14 0a9 9 0 0 1 11 11 7 7 0 0 1-1 13M30 7c-1-4 2-5 5-5"
      : type === "seating"
        ? "M17 34V12q15-7 30 0v22M18 17h28M23 20v12m9-12v12m9-12v12M14 35h36v7H14Zm5 7-3 16m29-16 3 16M20 51h24"
        : "M16 10h32v34H16Zm6 9h20M22 26h16M22 33h20M27 44l-7 13m17-13 7 13M32 5v5";
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}
