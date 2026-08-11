export interface FallbackFixture {
  id: string
  route: string
  trigger: string
  userMessage: string
  preservedValue: string
}

export const fallbackFixtures: FallbackFixture[] = [
  { id: 'fallback-empty-intake', route: 'intake', trigger: 'No interests supplied', userMessage: 'Add at least one interest to personalize relevance ranking.', preservedValue: 'The seed field remains available for browsing.' },
  { id: 'fallback-incomplete-item', route: 'itemScout', trigger: 'Project source has missing fields', userMessage: 'Review the available project summary before drawing a strong conclusion.', preservedValue: 'Known fields and a low-confidence summary are retained.' },
  { id: 'fallback-partial-route', route: 'fieldReport', trigger: 'One analysis route fails', userMessage: 'Continue with the completed sections and review the missing step in Activity.', preservedValue: 'Previously generated signals and patterns remain available.' },
]
