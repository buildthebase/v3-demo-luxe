import type { ReactNode } from "react";

type ExperienceContextSectionProps = {
  ariaLabelledBy: string;
  artAriaHidden?: boolean;
  artClassName?: string;
  children: ReactNode;
  copy: ReactNode;
  eyebrow?: ReactNode;
  id: string;
  lead: ReactNode;
  legacyClassName: string;
  title: ReactNode;
};

export function ExperienceContextSection({
  ariaLabelledBy,
  artAriaHidden = true,
  artClassName,
  children,
  copy,
  eyebrow,
  id,
  lead,
  legacyClassName,
  title,
}: ExperienceContextSectionProps) {
  return (
    <section
      className={`experience-context ${legacyClassName}`}
      id={id}
      aria-labelledby={ariaLabelledBy}
    >
      <div className={`experience-context-intro ${legacyClassName}-intro`}>
        {eyebrow}
        <h2 id={ariaLabelledBy}>{title}</h2>
        <div
          className={`experience-context-art ${legacyClassName}-art${artClassName ? ` ${artClassName}` : ""}`}
          aria-hidden={artAriaHidden}
        >
          {children}
        </div>
      </div>

      <div className={`experience-context-content ${legacyClassName}-content`}>
        <p className={`experience-context-lead ${legacyClassName}-lead`}>{lead}</p>
        <div className={`experience-context-rule ${legacyClassName}-rule`} aria-hidden="true" />
        <div className={`experience-context-copy ${legacyClassName}-copy`}>{copy}</div>
      </div>
    </section>
  );
}
