import { QuoteModalTrigger } from "./quote-modal-trigger";

const tentUseCases = [
  { size: "20′ × 20′", capacity: "Up to 50 guests*", modules: 1, copy: "A welcoming setting for intimate celebrations, showers and private events." },
  { size: "20′ × 40′", capacity: "Up to 100 guests*", modules: 2, copy: "More room to bring guests together for weddings, milestone birthdays and private celebrations." },
  { size: "20′ × 60′", capacity: "Up to 150 guests*", modules: 3, copy: "An extended configuration for larger gatherings, with room to coordinate seating and selected Luxe services." },
  { size: "15′ × 15′", capacity: "A smaller-scale setting", modules: 1, copy: "Consider this option for an intimate gathering or a dedicated area within your event." },
  { size: "10′ × 10′", capacity: "A compact covered space", modules: 1, copy: "A practical option for a welcome point, service station or smaller event area." },
] as const;

export function RentalTentUseCases() {
  return (
    <section className="rental-tent-use-cases" id="tent-configurations" aria-labelledby="tent-use-cases-title">
      <header>
        <p className="foundation-label">Tent configurations</p>
        <h2 className="foundation-wide-heading" id="tent-use-cases-title">A setting for your guest list.</h2>
        <p>From an intimate private event to a larger outdoor gathering, explore tent configurations around your guest count, setting and the way you want to celebrate.</p>
      </header>
      <div className="rental-tent-use-case-grid">
        {tentUseCases.map(tent => (
          <article key={tent.size}>
            <svg className="rental-tent-use-case-icon" viewBox={`0 0 ${tent.modules * 56 + 8} 64`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {Array.from({ length: tent.modules }, (_, index) => (
                <g transform={`translate(${index * 56},0)`} key={index}>
                  <path d="M4 30 32 8l28 22H4Zm5 0v27m46-27v27M32 8v49M9 53h46M9 30l23 23 23-23" />
                </g>
              ))}
            </svg>
            <h3>{tent.size}</h3>
            <p className="rental-tent-capacity">{tent.capacity}</p>
            <p>{tent.copy}</p>
          </article>
        ))}
      </div>
      <p className="rental-tent-use-case-note">* Guest counts are planning estimates. Suitable capacity depends on seating layout, tables, service areas, site conditions and event requirements. Configuration and availability are confirmed in your proposal.</p>
      <QuoteModalTrigger className="rental-tent-use-case-action">Find Your Configuration</QuoteModalTrigger>
    </section>
  );
}
