import { QuoteModalTrigger } from "./quote-modal-trigger";

export function ProcessStartAction() {
  return (
    <div className="process-start-action">
      <QuoteModalTrigger className="process-start-button">
        Start Here
      </QuoteModalTrigger>
    </div>
  );
}
