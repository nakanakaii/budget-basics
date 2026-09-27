import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { navigationItems } from "../data/navigation.js";

export default function SitemapPage() {
  const supportLinks = [
    ["Sitemap", "/sitemap"],
    ["Privacy notice", "/privacy"],
  ];
  return (
    <>
      <PageHero eyebrow="Find your way" title="Sitemap">
        <p>Every BudgetBasics learning destination in one place.</p>
      </PageHero>
      <div className="sitemap-groups">
        {navigationItems.map((item) => (
          <section
            key={item.label}
            aria-labelledby={`sitemap-${item.label.toLowerCase().replaceAll(" ", "-")}`}
          >
            <h2 id={`sitemap-${item.label.toLowerCase().replaceAll(" ", "-")}`}>
              {item.label}
            </h2>
            <ul className="link-list">
              {(item.children ?? [item]).map(({ label, path }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section aria-labelledby="sitemap-support">
        <h2 id="sitemap-support">Support</h2>
        <ul className="link-list">
          {supportLinks.map(([label, path]) => (
            <li key={path}>
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
