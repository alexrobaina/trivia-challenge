import { runInAction, makeAutoObservable } from 'mobx';
import QuestionService from 'Services/QuestionService';
import InputStore from './InputStore';

interface IQuestionStore {
  name?: string;
  loading: boolean;
  badAnswer: number;
  goodAnswer: number;
  nextQuestion: string;
  totalQuestions: number;
  answers: Array<string>;
  questions: Array<string>;
  questionService: QuestionService;
}

class QuestionStore implements IQuestionStore {
  name;
  answers;
  loading;
  questions;
  badAnswer;
  goodAnswer;
  nextQuestion;
  totalQuestions;
  questionService;
  constructor() {
    this.answers = [];
    this.badAnswer = 0;
    this.questions = [];
    this.goodAnswer = 0;
    this.loading = false;
    this.nextQuestion = 0;
    this.totalQuestions = 0;
    this.questionService = null;
    this.name = new InputStore();

    makeAutoObservable(this);

    this.questionService = new QuestionService();

    this.setNextQuestion();
    this.loadQuestions();
  }

  // ===================
  // CALL API
  // ===================

  async loadQuestions() {
    this.loading = true;
    try {
      const response = await this.questionService.getQuestions();

      runInAction(() => {
        this.loading = false;
        this.questions = response;
        this.totalQuestions = this.questions.length;
      });
    } catch (e) {
      runInAction(() => {
        this.loading = false;
        console.log(e);
      });
    }
  }

  // ===================
  // SETTERS
  // ===================

  setAnswer(answer, userAnswer) {
    const data = {
      correctAnswer: answer.correctAnswer,
      question: answer.question,
      userAnswer,
      isCorrect: answer.correctAnswer[0].toLowerCase() === userAnswer,
    };

    this.answers.push(data);
  }

  triviaResults() {
    this.answers.forEach((answer) => {
      if (answer.isCorrect === true) {
        this.goodAnswer += 1;
      } else {
        this.badAnswer += 1;
      }
    });
  }

  resetTriviaResults() {
    this.badAnswer = 0;
    this.goodAnswer = 0;
  }

  setNextQuestion() {
    this.nextQuestion += 1;
  }

  resetPositionQuestion() {
    this.nextQuestion = 1;
  }

  resetAnswes() {
    this.answers = [];
  }

  // ===================
  // GETTERS
  // ===================

  get questionSelected() {
    return this.nextQuestion - 1;
  }

  // ===================
  // VALIDATIONS
  // ===================

  resetErrors() {
    this.name.setError(false);
  }

  validateLogin() {
    let isError = false;

    if (this.name.value === '') {
      isError = true;
      this.name.setError(true, 'You username is requerid xD');
    }

    return isError;
  }
}

export default QuestionStore;
