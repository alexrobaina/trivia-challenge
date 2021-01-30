import axios from 'axios';
import API_URL from 'Services/config';
import Question from 'models/Question';

class QuestionService {
  getQuestions = () => {
    return axios
      .get(API_URL)
      .then((response) =>
        response.data.results.map((question) => Question.fillJson(question)),
      );
  };
}

export default QuestionService;
