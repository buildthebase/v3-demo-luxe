# Luxe Journal content

Versioned JSON is the source of truth for Blog editorial content.

## Editorial voice

Before writing or revising any Luxe blog article, read `voice.json`. The standing direction is spoken, warm, personal and authored: a thoughtful Luxe team member talking to one reader, not a corporate report. Use concrete, confirmed details and natural language. Never invent feedback, client feelings or behind-the-scenes interactions to make a story warmer. Read the finished copy aloud in your head and rewrite stiff or repetitive passages.

Clear meaning comes before a conversational effect. Keep event stories proportionate to the available facts. Do not add generic introductions, abstract metaphors or several versions of the same conclusion to make an article longer. The voice examples were revised to 1.2.0 after the client rejected those patterns.

Voice 1.3.0 stores examples from the full revision explicitly approved by the user. This short article records `editorialApproval.shortForm` with a review note, so its approved wording need not be padded to satisfy the usual 250-word gate. Without that explicit approval and a non-empty note, the gate remains blocking; empty articles are always blocked.

Always write **the Luxe Coffee Bar** when mentioning the product, with **The** capitalised at the start of a sentence. This applies to editorial copy, headings and link labels.

Never use em dashes in copy. Use full stops, commas, colons or parentheses instead. This is also a blocking CMS voice rule.

The CMS Voice screen edits this same file. Article Studio includes the current voice rules in brief, outline and draft prompts. Tone and examples guide generation; excluded words and prohibited claims are separately validated. Naturalness still needs editorial review. Voice updates affect future generation; existing articles need an explicit rewrite and are not automatically changed.

- `published/articles.json`: public, indexable articles.
- `drafts/articles.json`: CMS-only drafts; never imported by the public application.
- `archived/articles.json`: retained noindex pages or redirect records.
- `knowledge/`: approved website snapshot and supplemental grounding records.
- `voice.json`: enforceable Luxe editorial rules.
- `media/manifest.json`: approved image metadata and derivatives.
- `studio/jobs.json`: resumable Codex generation provenance and usage.
- `calendar/items.json`: manually approved editorial ideas and scheduled work.
- `calendar/config.json`: cadence, workflow, category mix, blackout dates, and campaigns.
- `calendar/proposals.json`: Codex calendar proposals and their approval state.

Local Trash, revisions, media originals, CMS Help conversations, and runtime state are intentionally ignored by Git. CMS Help keeps Codex read-only: repairs are returned as reviewable proposals, and the CMS applies only an explicitly accepted proposal through validation and recoverable revisions. Calendar proposals do not become planned items until explicitly approved.
