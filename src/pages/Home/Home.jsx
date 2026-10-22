import { useNavigate } from "react-router-dom";
import css from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className={css.main}>
      <section className={css.hero}>
        <div className={css.heroContent}>
          <h1 className={css.title}>
            Unlock your potential with the best{" "}
            <span className={css.highlight}>language</span> tutors
          </h1>
          <p className={css.subtitle}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button
            className={css.ctaButton}
            onClick={() => navigate("/teachers")}
          >
            Get started
          </button>
        </div>
        <div className={css.heroImage}>
          <img
            src="/hero.webp"
            alt="3D avatar of a red-haired boy winking and sticking out his tongue behind an Apple laptop"
            className={css.image}
          />
        </div>
      </section>

      <section className={css.stats}>
        <div className={css.statItem}>
          <span className={css.statNumber}>32,000 +</span>
          <span className={css.statLabel}>Experienced tutors</span>
        </div>
        <div className={css.statItem}>
          <span className={css.statNumber}>300,000 +</span>
          <span className={css.statLabel}>5-star tutor reviews</span>
        </div>
        <div className={css.statItem}>
          <span className={css.statNumber}>120 +</span>
          <span className={css.statLabel}>Subjects taught</span>
        </div>
        <div className={css.statItem}>
          <span className={css.statNumber}>200 +</span>
          <span className={css.statLabel}>Tutor nationalities</span>
        </div>
      </section>
    </main>
  );
};

export default Home;
