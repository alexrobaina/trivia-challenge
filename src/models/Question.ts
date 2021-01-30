/* eslint-disable camelcase */
interface IQuestion {
  category: string;
  question: string;
  difficulty: string;
  correctAnswer: Array<string>;
  incorrectAnswers: string;
}

class Question implements IQuestion {
  category;
  question;
  difficulty;
  correctAnswer;
  incorrectAnswers;

  constructor(category, question, difficulty, correct_answer, incorrect_answers) {
    this.category = category;
    this.question = question;
    this.difficulty = difficulty;
    this.incorrectAnswers = correct_answer;
    this.correctAnswer = incorrect_answers;
  }

  static fillJson({ category, question, difficulty, correct_answer, incorrect_answers }) {
    return new Question(
      category,
      question,
      difficulty,
      correct_answer,
      incorrect_answers,
    );
  }
}

export default Question;
