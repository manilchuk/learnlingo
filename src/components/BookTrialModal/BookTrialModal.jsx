import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../Modal/Modal";
import { bookTrialSchema } from "../../utils/validationSchemas";
import css from "./BookTrialModal.module.css";

const REASONS = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const BookTrialModal = ({ teacher, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(bookTrialSchema),
    defaultValues: {
      reason: "",
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Booking data:", { ...data, teacher: teacher.name });
    alert(`Trial lesson booked with ${teacher.name}!`);
    reset();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={css.title}>Book trial lesson</h2>
      <p className={css.subtitle}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={css.teacherInfo}>
        <img
          src={teacher.avatar_url}
          alt={teacher.name}
          className={css.teacherAvatar}
        />
        <div>
          <p className={css.teacherLabel}>Your teacher</p>
          <p className={css.teacherName}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            What is your main reason for learning English?
          </legend>
          <div className={css.radioGroup}>
            {REASONS.map((reason) => (
              <label key={reason} className={css.radioLabel}>
                <input
                  type="radio"
                  value={reason}
                  {...register("reason")}
                  className={css.radioInput}
                />
                <span className={css.radioCustom}></span>
                <span className={css.radioText}>{reason}</span>
              </label>
            ))}
          </div>
          {errors.reason && (
            <span className={css.error}>{errors.reason.message}</span>
          )}
        </fieldset>

        <div className={css.field}>
          <input
            type="text"
            placeholder="Full Name"
            className={`${css.input} ${errors.fullName ? css.inputError : ""}`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className={css.error}>{errors.fullName.message}</span>
          )}
        </div>

        <div className={css.field}>
          <input
            type="email"
            placeholder="Email"
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={css.field}>
          <input
            type="tel"
            placeholder="Phone number"
            className={`${css.input} ${errors.phone ? css.inputError : ""}`}
            {...register("phone")}
          />
          {errors.phone && (
            <span className={css.error}>{errors.phone.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Book"}
        </button>
      </form>
    </Modal>
  );
};

export default BookTrialModal;
