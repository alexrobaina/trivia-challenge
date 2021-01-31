import { runInAction, makeAutoObservable } from 'mobx';
import QuestionService from 'Services/QuestionService';
import InputStore from './InputStore';

interface IQuestionStore {
  scored: string;
  loading: boolean;
  question: string;
  username?: string;
  badAnswer: number;
  goodAnswer: number;
  nextQuestion: string;
  totalQuestions: number;
  answers: Array<string>;
  questions: Array<string>;
  questionService: QuestionService;
}

class QuestionStore implements IQuestionStore {
  scored;
  answers;
  loading;
  username;
  question;
  questions;
  badAnswer;
  goodAnswer;
  nextQuestion;
  totalQuestions;
  questionService;
  constructor() {
    this.scored = 0;
    this.answers = [];
    this.question = '';
    this.badAnswer = 0;
    this.questions = [];
    this.goodAnswer = 0;
    this.loading = false;
    this.nextQuestion = 0;
    this.totalQuestions = 0;
    this.questionService = null;
    this.username = new InputStore();

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
        this.formatedQuestion();
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
      question: this.formatedQuestion(
        answer.question.replace(/&quot;/g, '"').replace(/&#039;/g, '"'),
      ),
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

  formatedQuestion(question = null) {
    let questionFormatted;
    if (question) {
      questionFormatted = question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&ocirc;/g, 'ô')
        .replace(/&rdquo;/g, '"');
    } else {
      questionFormatted = this.questions[this.nextQuestion - 1]?.question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&ocirc;/g, 'ô')
        .replace(/&rdquo;/g, '"');
    }
    this.question = questionFormatted;
    return questionFormatted;
  }

  setUsername(username) {
    this.username.setValue(username);
  }

  resetUsername() {
    this.username.setValue('');
  }

  calculateScored() {
    this.scored = Math.ceil((this.totalQuestions / 100) * this.goodAnswer);
  }
  // ===================
  // GETTERS
  // ===================

  get questionSelected() {
    return this.nextQuestion - 1;
  }

  get getBadAnswer() {
    return this.badAnswer;
  }

  get getGoodAnswer() {
    return this.goodAnswer;
  }

  // ===================
  // VALIDATIONS
  // ===================

  resetErrors() {
    this.username.setError(false);
  }

  validations() {
    this.resetErrors();
    let isDirty = true;

    if (this.username.value === '') {
      isDirty = false;
      this.username.setError(true, 'The username is requerid');
    }

    if (this.username.value.length > 20) {
      isDirty = false;
      this.username.setError(true, 'Sorry is too long. add only 20 letters');
    }

    return isDirty;
  }
}

export default QuestionStore;
