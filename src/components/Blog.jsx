import { BLOG_POSTS } from '../constants';

/**
 * Blog / Thoughts section
 * 
 * <!-- Connect to a CMS (Notion API / Hashnode / Dev.to RSS) for live posts -->
 */
export default function Blog() {
  return (
    <section id="blog" className="section">
      <span className="section-number">05</span>
      <span className="section-label">Notes on systems, data, and building things.</span>
      <h2 className="section-title">Thoughts</h2>

      <div className="blog-grid">
        {BLOG_POSTS.map((post, i) => (
          <a
            key={i}
            href={post.link}
            className="blog-card"
            data-cursor="hover"
          >
            <div className="blog-tag">{post.category}</div>
            <h3 className="blog-title">{post.title}</h3>
            <div className="blog-date">{post.date}</div>
            <span className="blog-link">Read →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
