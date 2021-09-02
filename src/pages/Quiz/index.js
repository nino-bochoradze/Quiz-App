import { useEffect, useState } from "react";
import { getFetch } from "../../FetchData";
import { useAppContext } from "../../context";
import styles from "./Quiz.module.css";
import Question from "../../components/Question";
import Modal from "../../components/Modal";
import ROUTES from "../../config/routes";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Quiz() {
  let count = 0;
  const { category, difficulty } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const [showModal, toggleModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFetch({ category, difficulty })
      .then((data) => setQuiz(data.results))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  let correctAnswers = [];
  quiz.map((item) => correctAnswers.push(item.correct_answer));

  function handleSubmit(e) {
    e.preventDefault();
    toggleModal((prev) => !prev);

    const checkedAnswersList = document.querySelectorAll(
      "input[type=radio]:checked"
    );
    const checkedAnswersArray = [...checkedAnswersList];
    for (let i = 0; i < checkedAnswersArray.length; i++) {
      if (checkedAnswersArray[i].value == correctAnswers[i]) {
        count++;
      }
    }
  }

  return (
    <div className={styles.container}>
      {loading && <ClipLoader color={"white"} />}
      {error && <h1>error</h1>}
      {quiz.length && (
        <>
          <form>
            {quiz.map((question) => (
              <Question key={question.question} value={question} />
            ))}
            <button
              className={styles.btn_primary}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
          {showModal && (
            <Modal>
              <div className={styles.modal}>
                <div className={styles.modal_box}>
                  <p className={styles.modal_text}>
                    <strong>
                      Congrats! your correctly answered questions are:
                    </strong>{" "}
                    {count}.
                  </p>
                  <Link to={ROUTES.ROUTE_MAIN}>
                    <button className={styles.btn_primary}>Play Again</button>
                  </Link>
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;
