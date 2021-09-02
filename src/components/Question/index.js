import Answers from "../Answers";
import styles from "./Question.module.css";

function Question(props) {
  const answers = [];
  answers.push(props.value.correct_answer);
  props.value.incorrect_answers.map((incorrect_answer) =>
    answers.push(incorrect_answer)
  );

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(answers);
  return (
    <div className={styles.question_box}>
      <p>{props.value.question}</p>
      {answers.length &&
        answers.map((answer) => (
          <Answers
            key={answer}
            value={answer}
            name={props.value.question}
            correctAnswer={props.value.correct_answer}
          />
        ))}
    </div>
  );
}

export default Question;
