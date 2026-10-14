export type HomeHeroMediaId = "coffee" | "dessert" | "seating" | "together";

export type HomeHeroMediaSource = {
  src: string;
  type: "video/mp4" | "video/webm";
};

export type HomeHeroMedia = {
  id: HomeHeroMediaId;
  label: string;
  word: string | null;
  placement: "left" | "center" | "right" | "full";
  poster: string | null;
  sources: readonly HomeHeroMediaSource[];
};

export const homeHeroTimeline = {
  clipDurationMs: 3000,
  finalClipDurationMs: 7000,
  crossfadeMs: 500,
  loopCrossfadeMs: 500,
  gatherLoopCrossfadeMs: 1000,
  phaseStartsMs: [0, 3000, 6000, 9000] as const,
  finalPhaseIndex: 3,
} as const;

export const homeHeroMedia: readonly HomeHeroMedia[] = [
  {
    id: "coffee",
    label: "Luxe Coffee Bar",
    word: "Sip,",
    placement: "left",
    poster: null,
    sources: [
      {
        src: "/media/home-hero/coffee.mp4",
        type: "video/mp4",
      },
    ],
  },
  {
    id: "dessert",
    label: "Luxe Sweet Cart",
    word: "Indulge,",
    placement: "center",
    poster: null,
    sources: [
      {
        src: "/media/home-hero/dessert.mp4",
        type: "video/mp4",
      },
    ],
  },
  {
    id: "seating",
    label: "Luxe Seating Rentals",
    word: "Gather.",
    placement: "right",
    poster: null,
    sources: [
      {
        src: "/media/home-hero/rentals.mp4",
        type: "video/mp4",
      },
    ],
  },
  {
    id: "together",
    label: "",
    word: null,
    placement: "full",
    poster: null,
    sources: [],
  },
] as const;
