import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/help')

export interface HelpArticle {
  slug: string
  title: string
  description: string
  order: number
  category: string
  content: string
}

/** Get all help article slugs from the content directory */
export function getHelpSlugs(): string[] {
  return fs.readdirSync(contentDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}

/** Get a single help article by slug */
export function getHelpArticle(slug: string): HelpArticle {
  const fullPath = path.join(contentDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title,
    description: data.description,
    order: data.order,
    category: data.category,
    content,
  }
}

/** Get all help articles sorted by order */
export function getAllHelpArticles(): HelpArticle[] {
  return getHelpSlugs()
    .map(slug => getHelpArticle(slug))
    .sort((a, b) => a.order - b.order)
}

/** Category display order */
const CATEGORY_ORDER = [
  'Getting Started',
  'Using HyperPerfect',
  'Enterprise',
  'Resources',
  'Legal',
]

/** Get help articles grouped by category in display order */
export function getHelpArticlesByCategory(): { category: string; articles: HelpArticle[] }[] {
  const articles = getAllHelpArticles()
  const grouped: Record<string, HelpArticle[]> = {}

  for (const article of articles) {
    if (!grouped[article.category]) {
      grouped[article.category] = []
    }
    grouped[article.category].push(article)
  }

  return CATEGORY_ORDER
    .filter(cat => grouped[cat])
    .map(category => ({
      category,
      articles: grouped[category],
    }))
}
