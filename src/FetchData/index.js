import axios from "axios";

const QUIZ_URL = "https://opentdb.com/api.php?amount=10";

let url = axios
  .get("https://opentdb.com/api_token.php?command=request")
  .then((response) => response.data)
  .then((data) => (url = data.url));

async function getFetch(props) {
  const response = await axios.get(
    `${QUIZ_URL}&category=${props.category}&difficulty=${props.difficulty}&url=${url}`
  );

  return response.data;
}

export { getFetch };
