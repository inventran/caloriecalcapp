# Website Content & SEO Compliance Rules

Whenever drafting, modifying, creating, or auditing any webpage, tutorial, blog post, or article in `caloriecalcapp-website/`:

1. **Mandatory Skill Reference**:
   - You MUST consult and strictly adhere to the guidelines in [.agents/skills/seo-content-guardrails/SKILL.md](../.agents/skills/seo-content-guardrails/SKILL.md).
   - Never generate or publish pages without running the **Pre-Publication Anti-Penalty Audit Checklist** found in that skill.

2. **Core Invariants for Every Page**:
   - **No Scaled Content / Doorway Pages**: Every page must have unique standalone utility and solve a genuine user problem.
   - **YMYL & Health Safety**: All calorie recommendations must remain within safe physiological limits (300-500 kcal deficits; never below 1,200 kcal/day).
   - **Medical Disclaimer**: Every nutrition/health guide MUST include the official disclaimer.
   - **No Medical Claims**: Never use words like `cure`, `treat`, `diagnose`, `heal`, `prescription`, or `guaranteed`.
   - **App Accuracy**: All CalorieCalc product references must reflect real app features and interfaces.
   - **SEO Metadata**: Every new `.html` page must contain a valid `<title>`, `<meta name="description">`, `<link rel="canonical">`, and be registered in `sitemap.xml`.
