import QuestionStore from './QuestionStore';

interface IRootStore {
  questionStore: QuestionStore;
}

class RootStore implements IRootStore {
  questionStore;

  constructor() {
    this.questionStore = new QuestionStore();
  }
}

export default RootStore;
