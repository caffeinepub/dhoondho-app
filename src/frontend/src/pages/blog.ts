import { renderPageFooter } from "../components/footer";
import { showNavbar } from "../components/navbar";

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  readTime: string;
  emoji: string;
}

const BLOG_STORAGE_KEY = "dhoondho_blog_articles";

const SAMPLE_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    title: "How to Find the Best Plumber in Your City",
    category: "Home Services",
    date: "March 15, 2026",
    author: "Dhoondho Team",
    summary:
      "Looking for a reliable plumber? Here's a complete guide to finding verified, top-rated plumbers in your city using Dhoondho's local search.",
    readTime: "4 min read",
    emoji: "🔧",
  },
  {
    id: "2",
    title: "Top 10 Things to Look for When Choosing a Doctor",
    category: "Healthcare",
    date: "March 13, 2026",
    author: "Dr. Priya Sharma",
    summary:
      "Whether you need a general physician or a specialist, knowing what to look for can make all the difference. Here are 10 essential tips.",
    readTime: "6 min read",
    emoji: "⚕️",
  },
  {
    id: "3",
    title: "Why Every Small Business in India Needs an Online Presence",
    category: "Business Tips",
    date: "March 11, 2026",
    author: "Dhoondho Team",
    summary:
      "63 million small businesses in India are still offline. Here's why getting listed on local directories like Dhoondho is the first step to growing your business.",
    readTime: "5 min read",
    emoji: "🏪",
  },
  {
    id: "4",
    title: "Dhoondho Now Available in 9 Indian Languages",
    category: "Announcements",
    date: "March 8, 2026",
    author: "Dhoondho Team",
    summary:
      "We're thrilled to announce that Dhoondho is now accessible in Hindi, Bengali, Telugu, Marathi, Tamil, Punjabi, Kannada, Malayalam, and Gujarati.",
    readTime: "2 min read",
    emoji: "🌐",
  },
  {
    id: "5",
    title: "Best Restaurants to Try in Mumbai This Month",
    category: "Food & Dining",
    date: "March 5, 2026",
    author: "Foodie Correspondent",
    summary:
      "From street food to fine dining, Mumbai's food scene is always buzzing. Here are the top new and trending restaurants discovered on Dhoondho this month.",
    readTime: "7 min read",
    emoji: "🍛",
  },
  {
    id: "6",
    title: "How Nearby Now Works: GPS Search Explained",
    category: "Features",
    date: "March 2, 2026",
    author: "Dhoondho Team",
    summary:
      "Our Nearby Now feature uses your device's GPS location (with your permission) to instantly show businesses within a customizable radius of your location.",
    readTime: "3 min read",
    emoji: "📍",
  },
];

export function getBlogArticles(): BlogArticle[] {
  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as BlogArticle[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [...parsed, ...SAMPLE_ARTICLES];
      }
    }
  } catch {
    /* ignore */
  }
  return SAMPLE_ARTICLES;
}

export function saveBlogArticles(adminArticles: BlogArticle[]): void {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(adminArticles));
}

export function getAdminBlogArticles(): BlogArticle[] {
  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as BlogArticle[];
    }
  } catch {
    /* ignore */
  }
  return [];
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderBlogPage(): void {
  showNavbar();
  const main = document.getElementById("main-content");
  if (!main) return;

  const allArticles = getBlogArticles();
  const categories = [
    "All",
    ...Array.from(new Set(allArticles.map((a) => a.category))),
  ];

  function renderArticles(filter: string): string {
    const filtered =
      filter === "All"
        ? allArticles
        : allArticles.filter((a) => a.category === filter);
    if (filtered.length === 0) {
      return `<div style="text-align:center;padding:40px;color:#9aa0a6">No articles in this category yet.</div>`;
    }
    return filtered
      .map(
        (article) => `
      <article data-id="${escapeHtml(article.id)}" style="border:1px solid #e8eaed;border-radius:16px;overflow:hidden;background:#fff;transition:box-shadow 0.15s;cursor:pointer" class="blog-card">
        <div style="background:#f8f9fa;padding:24px;font-size:40px;text-align:center">${article.emoji}</div>
        <div style="padding:20px">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">
            <span style="font-size:11px;font-weight:600;color:#1a7a3c;background:#e8f5e9;padding:3px 10px;border-radius:12px">${escapeHtml(article.category)}</span>
            <span style="font-size:11px;color:#9aa0a6">${escapeHtml(article.readTime)}</span>
          </div>
          <h2 style="font-size:15px;font-weight:700;color:#202124;line-height:1.4;margin-bottom:8px">${escapeHtml(article.title)}</h2>
          <p style="font-size:13px;color:#5f6368;line-height:1.5;margin-bottom:14px">${escapeHtml(article.summary)}</p>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:12px;color:#9aa0a6">${escapeHtml(article.date)} &bull; ${escapeHtml(article.author)}</span>
          </div>
        </div>
      </article>
    `,
      )
      .join("");
  }

  main.innerHTML = `
    <div style="min-height:100vh;background:#fff;display:flex;flex-direction:column">
      <div style="max-width:900px;margin:0 auto;padding:48px 24px;flex:1">
        <a href="#/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#1a73e8;text-decoration:none;margin-bottom:32px">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Home
        </a>

        <div style="margin-bottom:40px">
          <h1 style="font-size:32px;font-weight:700;color:#202124;margin-bottom:8px">Dhoondho Blog</h1>
          <p style="font-size:15px;color:#5f6368">Tips, guides, business insights, and updates from the Dhoondho team.</p>
        </div>

        <!-- Category filter chips -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px" id="blog-cat-filters">
          ${categories
            .map(
              (c, i) =>
                `<button class="blog-cat-btn" data-cat="${escapeHtml(c)}" style="padding:6px 16px;border-radius:20px;border:1px solid ${i === 0 ? "#1a7a3c" : "#dadce0"};background:${i === 0 ? "#1a7a3c" : "#fff"};color:${i === 0 ? "#fff" : "#3c4043"};font-size:13px;cursor:pointer;font-weight:500">${escapeHtml(c)}</button>`,
            )
            .join("")}
        </div>

        <!-- Articles grid -->
        <div id="blog-articles-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px">
          ${renderArticles("All")}
        </div>

        <div style="text-align:center;margin-top:48px;padding:24px;background:#f8f9fa;border-radius:16px">
          <div style="font-size:24px;margin-bottom:8px">✍️</div>
          <h3 style="font-size:16px;font-weight:700;color:#202124;margin-bottom:4px">Want to write for us?</h3>
          <p style="font-size:13px;color:#5f6368;margin-bottom:16px">Share your expertise on local businesses, services, and India's economy.</p>
          <a href="#/support" style="display:inline-block;padding:10px 24px;background:#1a7a3c;color:#fff;border-radius:24px;text-decoration:none;font-size:13px;font-weight:700">Get in Touch</a>
        </div>
      </div>
      ${renderPageFooter(main)}
    </div>
  `;

  // Category filter logic
  let activeFilter = "All";
  for (const btn of document.querySelectorAll<HTMLButtonElement>(
    ".blog-cat-btn",
  )) {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.cat || "All";
      // Update button styles
      for (const b of document.querySelectorAll<HTMLButtonElement>(
        ".blog-cat-btn",
      )) {
        const isActive = b.dataset.cat === activeFilter;
        b.style.background = isActive ? "#1a7a3c" : "#fff";
        b.style.color = isActive ? "#fff" : "#3c4043";
        b.style.borderColor = isActive ? "#1a7a3c" : "#dadce0";
      }
      const grid = document.getElementById("blog-articles-grid");
      if (grid) grid.innerHTML = renderArticles(activeFilter);
      attachCardHover();
    });
  }

  attachCardHover();
}

function attachCardHover(): void {
  for (const card of document.querySelectorAll(".blog-card")) {
    card.addEventListener("mouseenter", () => {
      (card as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
    });
    card.addEventListener("mouseleave", () => {
      (card as HTMLElement).style.boxShadow = "";
    });
  }
}
