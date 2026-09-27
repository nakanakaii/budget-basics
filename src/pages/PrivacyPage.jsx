import PageHero from "../components/PageHero.jsx";

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Your information" title="Privacy notice">
        <p>
          BudgetBasics is designed to teach without collecting unnecessary
          personal information.
        </p>
      </PageHero>
      <section className="prose">
        <h2>What this site stores</h2>
        <p>
          The home page stores a demonstration visit count in your browser
          session only. It disappears when the session ends and is not sent to
          us.
        </p>
        <h2>Your choices</h2>
        <p>
          You can clear browser storage at any time. Do not enter sensitive
          financial details into learning activities.
        </p>
      </section>
    </>
  );
}
