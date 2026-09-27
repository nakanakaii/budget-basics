import PageHero from "../components/PageHero.jsx";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Money skills for everyday choices">
        <p>
          BudgetBasics is an educational product that helps students and
          first-time budgeters understand everyday personal finance.
        </p>
      </PageHero>
      <section className="prose">
        <h2>What is BudgetBasics?</h2>
        <p>
          Money terms can feel abstract. These lessons turn budgeting, needs and
          wants, saving goals, and common spending mistakes into short
          explanations and practical activities using familiar Yemeni examples
          and Yemeni rial (YER), so learners can move from understanding a
          concept to using it in a real monthly plan.
        </p>
        <h2>Who it is for</h2>
        <p>
          Students and beginners who want a clear place to learn and
          practise—not personalised financial advice.
        </p>
        <h2>The team behind it</h2>
        <p>
          BudgetBasics was created by Ctrl+Alt+Defeat team from Al-Nasser
          University in collaboration with Aptech. The project is designed by
          learners for learners: practical, local, and easy to revisit.
        </p>
        <div className="partner-grid" aria-label="Project partners">
          <div className="partner-mark">
            <img src="/images/aptech.jpg" alt="Aptech" />
          </div>
          <div className="partner-mark">
            <img src="/images/techwiz.jpg" alt="Techwiz7" />
          </div>
          <div className="partner-mark">
            <img src="/images/nasser.jpg" alt="Al-Nasser University" />
          </div>
        </div>
        <h3>
          Team <b className="team-name">Ctrl+Alt+Defeat</b>
        </h3>
        <ul>
          <li>Ahmed Abdulaziz Dahan</li>
          <li>Ahmed Mujahed Al-Shabibi</li>
          <li>Mohamed Saleh Al-Duais</li>
          <li>Alaa Aldeen Kamel Anaam</li>
        </ul>
      </section>
    </>
  );
}
