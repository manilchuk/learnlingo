import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import css from "./TeacherCard.module.css";

const TeacherCard = ({
  teacher,
  teacherId,
  isFavorite,
  onToggleFavorite,
  onBookTrial,
  onRequireAuth,
}) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFavoriteClick = () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    onToggleFavorite(teacherId);
  };

  return (
    <div className={css.card}>
      <div className={css.top}>
        <div className={css.avatarWrapper}>
          <img
            src={teacher.avatar_url}
            alt={teacher.name}
            className={css.avatar}
          />
          <span className={css.onlineDot}></span>
        </div>

        <div className={css.info}>
          <div className={css.header}>
            <div>
              <p className={css.label}>Languages</p>
              <h2 className={css.name}>
                {teacher.name} {teacher.surname}
              </h2>
            </div>

            <div className={css.meta}>
              <span className={css.metaItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="#121417"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 21h8M12 18v3"
                    stroke="#121417"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Lessons online
              </span>
              <span className={css.divider}></span>
              <span className={css.metaItem}>
                Lessons done: {teacher.lessons_done}
              </span>
              <span className={css.divider}></span>
              <span className={css.metaItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f4c550">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Rating: {teacher.rating}
              </span>
              <span className={css.divider}></span>
              <span className={css.metaItem}>
                Price / 1 hour:{" "}
                <span className={css.price}>{teacher.price_per_hour}$</span>
              </span>
            </div>

            <button
              className={`${css.favoriteButton} ${isFavorite ? css.favoriteActive : ""}`}
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill={isFavorite ? "#f4c550" : "none"}
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  stroke={isFavorite ? "#f4c550" : "#121417"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={css.details}>
            <p className={css.detailLine}>
              <span className={css.detailLabel}>Speaks:</span>{" "}
              <span className={css.detailValue}>
                {teacher.languages.join(", ")}
              </span>
            </p>
            <p className={css.detailLine}>
              <span className={css.detailLabel}>Lesson Info:</span>{" "}
              <span className={css.detailValue}>{teacher.lesson_info}</span>
            </p>
            <p className={css.detailLine}>
              <span className={css.detailLabel}>Conditions:</span>{" "}
              <span className={css.detailValue}>
                {teacher.conditions.join(" ")}
              </span>
            </p>
          </div>

          {!isExpanded && (
            <button
              className={css.readMoreButton}
              onClick={() => setIsExpanded(true)}
            >
              Read more
            </button>
          )}

          {isExpanded && (
            <>
              <p className={css.experience}>{teacher.experience}</p>

              <div className={css.reviews}>
                {teacher.reviews.map((review, index) => (
                  <div key={index} className={css.review}>
                    <div className={css.reviewHeader}>
                      <span className={css.reviewerAvatar}>
                        {review.reviewer_name.charAt(0)}
                      </span>
                      <div>
                        <p className={css.reviewerName}>
                          {review.reviewer_name}
                        </p>
                        <p className={css.reviewRating}>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="#f4c550"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {review.reviewer_rating}.0
                        </p>
                      </div>
                    </div>
                    <p className={css.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className={css.levels}>
            {teacher.levels.map((level, index) => (
              <span
                key={level}
                className={`${css.levelBadge} ${index === 0 ? css.levelActive : ""}`}
              >
                #{level}
              </span>
            ))}
          </div>

          {isExpanded && (
            <button
              className={css.bookButton}
              onClick={() => onBookTrial(teacher)}
            >
              Book trial lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
