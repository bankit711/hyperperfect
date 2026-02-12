import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getHelpArticle, getHelpSlugs } from "@/lib/help"
import type { Metadata } from "next"

/** Generate all help page paths at build time for static export */
export function generateStaticParams() {
  return getHelpSlugs().map((slug) => ({ slug }))
}

/** Dynamic metadata for each help page */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getHelpArticle(slug)
  return {
    title: `${article.title} - HyperPerfect Help`,
    description: article.description,
  }
}

/** Custom components for MDX rendering */
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-[28px] font-bold text-[#111827] tracking-tight mb-2 mt-0"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-[20px] font-semibold text-[#111827] tracking-tight mt-10 mb-4 pt-0"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-[16px] font-semibold text-[#1f2937] mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-[14px] font-semibold text-[#374151] mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[15px] leading-[1.7] text-[#374151] mb-4" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[#1a7bff] hover:text-[#1562cc] underline decoration-[#1a7bff]/30 hover:decoration-[#1a7bff] underline-offset-2 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="text-[15px] leading-[1.7] text-[#374151] mb-4 pl-5 list-disc marker:text-[#9ca3af] space-y-1" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="text-[15px] leading-[1.7] text-[#374151] mb-4 pl-5 list-decimal marker:text-[#6b7280] space-y-1" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-[3px] border-[#1a7bff] pl-4 my-4 text-[14px] text-[#6b7280] italic bg-[#f8f9fb] py-3 pr-4 rounded-r-md"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = typeof props.children === "string" && props.children.includes("\n")
    if (isBlock) {
      return (
        <code
          className="block bg-[#0f0f14] text-[#e2e8f0] text-[13px] p-4 rounded-lg overflow-x-auto font-mono leading-relaxed"
          {...props}
        />
      )
    }
    return (
      <code
        className="bg-[#f3f4f6] text-[#d946ef] text-[13px] px-1.5 py-0.5 rounded font-mono"
        {...props}
      />
    )
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-[#0f0f14] text-[#e2e8f0] text-[13px] p-4 rounded-lg overflow-x-auto font-mono leading-relaxed mb-4 border border-[#1a1a24]"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-auto mb-4 rounded-lg border border-[#e2e5eb] max-h-[70vh]">
      <table className="w-full text-[13px]" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[#f8f9fb] border-b border-[#e2e5eb] sticky top-0 z-10" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-left px-4 py-2.5 font-semibold text-[#374151] text-[12px] uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2.5 text-[#4b5563] border-t border-[#eceef2]" {...props} />
  ),
  hr: () => <hr className="my-0 py-0 border-transparent h-0" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[#111827]" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg border border-[#e2e5eb] shadow-sm my-4 max-w-full" alt={props.alt || ""} {...props} />
  ),
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getHelpArticle(slug)

  return (
    <article>
      {/* Page header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#1a7bff] mb-2">
          {article.category}
        </p>
        <h1 className="text-[32px] font-bold text-[#111827] tracking-tight leading-tight mb-3">
          {article.title}
        </h1>
        <p className="text-[15px] text-[#6b7280] leading-relaxed">
          {article.description}
        </p>
      </div>

      {/* Divider */}
      <hr className="mb-8 border-[#eceef2]" />

      {/* MDX content */}
      <div className="help-content">
        <MDXRemote
          source={article.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {/* Bottom navigation */}
      <div className="mt-16 pt-8 border-t border-[#eceef2]">
        <div className="flex items-center justify-between">
          <div className="text-[13px] text-[#9ca3af]">
            Still need help?{" "}
            <a
              href="mailto:help@hyperperfect.ai"
              className="text-[#1a7bff] hover:text-[#1562cc] transition-colors"
            >
              Contact us
            </a>
          </div>
          <a
            href="https://calendly.com/di-hyperperfect/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1a7bff] hover:text-[#1562cc] transition-colors"
          >
            Book a demo
          </a>
        </div>
      </div>
    </article>
  )
}
