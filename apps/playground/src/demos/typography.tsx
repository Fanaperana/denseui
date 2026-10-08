import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from '@/components/ui/typography'

export default function TypographyDemo() {
  return (
    <div className="max-w-lg">
      <TypographyH1>The Dense Manifesto</TypographyH1>
      <TypographyLead className="mt-2">Interfaces for people who get work done.</TypographyLead>
      <TypographyH2 className="mt-6">Why density</TypographyH2>
      <TypographyP>
        Productivity tools are used for hours a day. Every pixel of padding is a pixel of content you can't see. Use{' '}
        <TypographyInlineCode>h-6</TypographyInlineCode> controls and let the content breathe instead.
      </TypographyP>
      <TypographyBlockquote>"Whitespace is not a feature. Clarity is."</TypographyBlockquote>
      <TypographyH3 className="mt-6">Principles</TypographyH3>
      <TypographyList>
        <li>Vertical padding is always smaller than horizontal.</li>
        <li>Semantic tokens, never raw colors.</li>
        <li>Text sits optically centered at whole pixels.</li>
      </TypographyList>
      <TypographyMuted className="mt-4">Last edited 2 minutes ago</TypographyMuted>
    </div>
  )
}
