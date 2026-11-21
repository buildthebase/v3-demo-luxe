import { QuoteModalTrigger } from "./quote-modal-trigger";

export function ProcessStartAction({ label = "Plan Your Event" }: { label?: string } = {}) {
  return (
    <div className="process-start-action">
      <QuoteModalTrigger className="process-start-button">
        {label}
      </QuoteModalTrigger>
    </div>
  );
}
