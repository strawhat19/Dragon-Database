# Dragon Database Market Research

**Research date:** October 11, 2026  
**Scope:** Competitors, current repository baseline, positioning, product priorities, authority building, and a proposed 90-day roadmap

## Recommended Position

Dragon Database has competitors. Broad dragon indexes exist, and franchise wikis offer substantial detail. A promise to catalog “all dragons” would require considerable editorial work before it became credible.

The strongest initial position is **an illustrated dragon field guide for identifying, exploring, and comparing dragon forms, with clear evidence about cultural context and fictional portrayals**.

The app’s original anatomy illustrations and seven type cards are a useful foundation. Turn them into trustworthy reference pages, then connect them to sourced examples from selected traditions and fictional worlds. Authority should come from accurate explanations, useful discovery, transparent corrections, and independent citations.

This is a strategic hypothesis. Competitor evidence establishes available alternatives, not market size, search demand, or willingness to pay.

## Evidence And Limits

Research combined representative public competitor pages and source institutions with a read-only source review. Some competitor observations use search-indexed content when live extraction was incomplete. Listings and counts can change.

This is not a comprehensive competitor audit or a production/UI verification. Traffic, revenue, market share, search volume, and paid demand were not measured. Proposed features, corpus sizes, and success targets are recommendations, not existing results or forecasts.

## Current Product Baseline

| Area | Observed Current Source | Competitive Implication |
| --- | --- | --- |
| Platform and data | Expo frontend for web, iOS, and Android; localStorage/AsyncStorage data rather than a connected cloud database. [README](../README.md), [Data API](../src/api/dragons.ts) | Local service boundaries are prepared, but this is not a live contributor database. |
| Coverage | Seven seeded type records: Wyvern, Wyrm, Drake, Dragon, Amphiptere, Leviathan, and Dragonoid. [Sample records](../src/shared/models/dragons/sampleDragonTypes.ts) | These are forms/types, not seven named individuals or complete cultural traditions. |
| Model | Fields include kind, traits, description, and search terms; no dedicated citation, culture, canon, edition, or source fields. [DragonType](../src/shared/models/dragons/DragonType.ts) | Establish an evidence-aware model before expanding content. |
| Discovery | Local search of names, descriptions, traits, and terms; persisted query with a 300 ms debounce; landing-page type filtering. [Data API](../src/api/dragons.ts), [Landing logic](../src/components/LandingPage/useLandingPage.ts) | Expand identification tasks beyond a keyword search over seven records. |
| Presentation | Original anatomy graphics, distinct steel identity, and reduced-motion behavior. [README](../README.md) | Retain this visual advantage and apply it to genuinely informative detail pages. |
| Routes and participation | Public About, Contact, and legal routes exist. Collections, Lore, API, Blog, and Sign In remain placeholders; individual dragon-detail routes were not found in reviewed routing. Google sign-in is mocked; contact validates without saving/sending. [README](../README.md), [Routes](../src/shared/routes.ts) | Build public reference value first. Do not advertise operational accounts, submissions, or APIs from placeholders or copied instructions. |

No application runtime, build, backend, or UI tests were run for this research.

## Competitor Landscape

Unmentioned features should not be treated as proven omissions. The final column describes an opportunity to test.

| Competitor | Relationship And Observed Offering | Implication |
| --- | --- | --- |
| [Titus’ Dragon Codex](https://titusdragon.com/dragons) | Direct cross-media competitor. Search-indexed catalog advertises 63 dragons, name/species/origin search, media/size filters, descriptions, and ability tags. Count is vendor-displayed, not an audited completeness measure. | Fictional-dragon search already exists. Differentiate with source evidence, portrayal boundaries, and useful visual identification. |
| [Dragons Wiki](https://dragons.fandom.com/wiki/Category:Dragon_Species) | Broad reference competitor with species from multiple media, alphabetical categories, editing/history, and community navigation. | Breadth and participation are established strengths. A curated field guide can serve a narrower task more consistently. |
| [Wikipedia’s mythology and folklore list](https://en.wikipedia.org/wiki/List_of_dragons_in_mythology_and_folklore) | General-reference substitute organized by regional traditions, with related articles and references. | Add identification, contextual comparison, and visible evidence beyond a free starting list. |
| [A Wiki of Ice and Fire](https://awoiaf.westeros.org/index.php/Dragon) | Franchise specialist with cited lore, named dragons, riders, dates, and related egg records. | Treat specialist depth as a benchmark; connect readers to original works and established references. |
| [Tolkien Gateway](https://tolkiengateway.net/wiki/Smaug) | Smaug’s page contains structured attributes, citations, and separate adaptation/radio/game coverage. | Preserve book and adaptation distinctions instead of flattening every portrayal into one record. |
| [How to Train Your Dragon Wiki](https://howtotrainyourdragon.fandom.com/wiki/Night_Fury_%28Franchise%29) | Species records connect classes, individuals, subspecies/hybrids, appearances, and galleries. A [class guide](https://howtotrainyourdragon.fandom.com/wiki/Dragon_Classes_%28Franchise%29) explains its classification. | Keep franchise-specific vocabulary alongside app-wide anatomy tags. |
| [Wings of Fire Wiki](https://wingsoffire.fandom.com/wiki/Dragons) | Covers tribes, society, geography, and cited lore; [tribe categories](https://wingsoffire.fandom.com/wiki/Category%3ADragon_tribes) support navigation. | Readers need relationships and context, not only powers and body shape. |
| [D&D Beyond](https://www.dndbeyond.com/monsters/16771-adult-red-dragon) | Official rules authority and task-specific substitute. The inspected Adult Red Dragon page has structured mechanics and a Legacy label. | Game facts need edition/version labels; cross-game statistics are not automatically comparable. |

[The Dragons of House Targaryen](https://www.dragonwiki.org/) is another design benchmark: its public page includes Chronicle/Heritage views, riders, dates, and recorded versus rumored descent. Timelines and relationship visualization alone would not be unique.

These products compete for different tasks. A rules reference, a mythology explanation, a fan continuity guide, and a visual-identification tool should not be evaluated as interchangeable catalogs.

## Audiences And Jobs To Validate

| Audience | Recurring Job | Initial Product Value |
| --- | --- | --- |
| Curious fans | Identify a shape, name, ability, or unfamiliar term | Visual identification, aliases, selected examples, and spoiler controls |
| Writers, artists, and game masters | Find examples with specific traits and dependable context | Anatomy filters, comparison, saved research, and credited illustrations |
| Educators and mythology readers | Explain differences without replacing cultural traditions with a game taxonomy | Named sources, original-language terminology, historical context, and clear interpretation |

Interview at least four people from each group. Observe a recent real task with the current app and a competitor. Ask what made an answer trustworthy and why they would return. Positive reactions to artwork do not establish subscription demand.

## Product Priorities

### P0: Turn Type Cards Into Reference Pages

Give every current card a permanent page with anatomy, terminology, illustrated features, selected examples, related forms, sources, and a correction link.

Present the seven types as **the app’s navigation vocabulary**, not a universally accepted mythology classification. Terms such as drake and wyrm can differ across works and communities.

Separate entities for:

- App-defined anatomy categories
- Culturally situated beings or traditions
- Fictional species/groups
- Named individuals
- Particular portrayals in books, films, games, or editions

For a future Smaug record, distinguish the identity from specific book/film portrayals and cite each portrayal’s claims. Do not overwrite a disputed attribute with one convenient universal value.

### P1: Solve Identification And Comparison

Filter by wings, limbs, body form, habitat, abilities, tradition, universe, medium, and evidence status. Support Unknown, Disputed, and Not Applicable.

Search aliases, spelling variants, and transliterations, explaining why a result matched. A “wingless water dragon” query should reveal the relevant traits and source context.

Keep descriptive anatomy independent from interpretive labels. A winged two-legged being can match a shape filter without asserting that every tradition calls it a wyvern.

Compare two to four records using sourced properties and explicit missing values. Avoid a universal power ranking: incompatible stories and game systems do not share a measurement scale. Provide spoiler boundaries by work, installment, or edition.

### P1: Make Context Visible

Store tradition/community, relevant geography, language, and historical period. A modern flag cannot adequately describe a tradition spanning borders or centuries.

Preserve original names and diacritics with accessible transliterations. Explain why a being is considered dragon-related rather than assuming the English category is its original designation. Have knowledgeable reviewers assess unfamiliar traditions.

## Authority Through An Editorial System

Each consequential claim should point to source and location: book edition/chapter/page, episode/time reference, game version, museum accession, or scholarly publication. Show reviewer identity, review date, and correction history.

Separate primary evidence, secondary explanation, and editorial interpretation. Another wiki’s citation is a research lead, not proof that the underlying work has been checked. Credit specialist communities and verify important claims against cited material where possible.

Source institutions offer useful models for provenance:

- [British Museum dragon-object record](https://www.britishmuseum.org/collection/object/A_2022-3034-143): object context, dates, production place, and bibliographic information.
- [The Met’s Panel with dragon](https://www.metmuseum.org/art/collection/search/50497): a depiction tied to a particular object, period, and curatorial explanation.

They are source authorities, not asserted project partners. Seek expert collaboration and permission before claiming endorsement.

Publish inclusion, disputed-claim, adaptation, correction, AI-assistance, and image-provenance policies. Contributions should enter a review queue. Reward accepted evidence and corrections rather than raw submission volume.

Keep original diagrams distinguishable from historic depictions and official franchise art. Citation and permission are separate: record creator, source, license, attribution, and permission status. Licensed game content needs precise source/version boundaries; the [official D&D SRD page](https://www.dndbeyond.com/srd) explains Creative Commons availability and limitations of what the SRD contains.

AI can assist with aliases, draft organization, and duplicate suggestions. It should not create unsupported lore, invent citations, or turn editorial interpretation into verified canon.

## Search And Distribution

Publish a limited set of excellent, internally linked pages before thousands of thin records. Early content should answer identification, terminology, and contextual comparison questions.

Use stable detail URLs, readable titles, crawlable text, category navigation, and a sitemap. Index selected useful collections rather than every arbitrary filter combination.

Show authors, reviewers, references, and substantive updates. Google’s [people-first guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) emphasizes original value and reliability; it does not guarantee rankings.

Offer original, attributable anatomy sheets or classroom references. Seek feedback from artists, teachers, mythology researchers, fan editors, and tabletop creators. Independent educational use and citations are stronger authority signals than self-created promotion.

The six-month moat is a maintained network of sourced claims, aliases, relationships, original illustrations, and visible corrections. Cloud infrastructure enables participation; it does not itself produce authority.

## Monetization Hypotheses

Keep basic discovery, evidence, and corrections public.

Test paid research collections, rights-cleared exports, offline packs, classroom materials, or access to a curated dataset. Sell convenience and editorial work rather than copied franchise artwork.

Book affiliates, disclosed sponsorship, and commissioned educational illustrations are additional hypotheses. Payment should not change factual conclusions. Validate a small paid pilot before billing infrastructure or a large API.

## Proposed 90-Day Roadmap

| Period | Priority | Deliverable |
| --- | --- | --- |
| Days 1–30 | P0: Credible foundation | Seven substantive type pages; source/culture/portrayal fields; editorial/rights policies; clear unfinished-feature labels; 12 audience interviews. |
| Days 31–60 | P1: Useful discovery | Approximately 40–60 sourced examples within deliberately selected traditions and fictional corpora; aliases; anatomy filters; comparison; reviewed imagery. |
| Days 61–90 | P1: Return use and participation | Saved collections if supported by interviews; confirmed corrections/submissions with moderation; contributor credit; two educational resources; a small paid experiment. |

Corpus volume is a workload target, not a completeness claim. Reduce it when verification needs more time. Choose narrowly bounded source corpora instead of treating entire regions as one tradition.

Implement account sync and contributor workflows after the public reference experience is useful. Mock sign-in and inactive contact forms should not be marketed as community infrastructure.

## Proposed Success Measures

Revise targets after gathering a baseline.

| Measure | Proposed Gate |
| --- | --- |
| Editorial completeness | Every published reference page identifies scope, reviewer, review date, sources, and image status. |
| Claim accuracy | At least 95% of a monthly sample traces correctly to the stated source; unresolved claims are labeled. |
| Identification usability | At least 80% of recruited users complete selected identification tasks within 60 seconds. |
| Corrections | Acknowledge substantive reports within seven days; publish resolution or a pending explanation. |
| Repeat usefulness | Establish cohorts, then test a target of 20% of engaged readers returning within 30 days. |
| External authority | Earn ten independent relevant citations/educational uses over six months; exclude paid placements and self-created links. |
| Economics | Several real paid pilot customers before expanding premium features. |

Review unsuccessful searches, useful detail opens, source clicks, saved research, and accepted corrections. Device/country analytics can identify usability issues; they do not establish factual authority.

Open questions: which audience returns, whether identification or lore drives use, how expensive careful cultural coverage is, and which paid research task recurs. Expand as the answer to “What am I looking at, what does this term mean here, and what evidence supports it?” becomes dependable.