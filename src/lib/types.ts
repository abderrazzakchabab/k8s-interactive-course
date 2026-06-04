export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instruction: string;
  hint: string;
  solution: string;
  initialCommand?: string;
  expectedOutput?: string;
  verificationCommand?: string;
}

export interface Diagram {
  id: string;
  title: string;
  type: 'architecture' | 'flow' | 'comparison' | 'timeline';
  svg: string;
  caption: string;
}

export interface ChapterSection {
  title: string;
  content: string;
  codeExample?: string;
  diagramId?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  duration: string;
  sections: ChapterSection[];
  quiz: QuizQuestion[];
  exercises: Exercise[];
  diagrams?: Diagram[];
}
