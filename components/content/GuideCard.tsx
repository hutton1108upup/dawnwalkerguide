import Link from 'next/link';
import type { Article, ArticleImage } from '@/content/types';
import { VerifiedBadge } from './Trust';
export function GuideCard({ article, image }: { article: Article; image?: ArticleImage }) {
  // Only explicitly selected, spoiler-free images appear on cards. Scene/keyword
  // rationale and original sources remain in content/article-images.ts and the guide.
  return <Link href={`/${article.category}/${article.slug}/`} className="guide-card">
    {image && !image.spoiler && <figure className="guide-card-image"><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async"/><figcaption>{image.source.title}</figcaption></figure>}
    <VerifiedBadge status={article.verificationStatus}/><h3>{article.title}</h3><p>{article.description}</p><div className="card-meta">Reviewed {article.updated} <span aria-hidden="true">·</span> {article.category === 'fixes' ? 'Performance' : 'Guide'}</div>
  </Link>;
}
