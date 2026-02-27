type AnalyzedSummary = {
  punctMarks: Record<string, number>;
  words: Record<string, number>;
  longestWord: string;
  symbols: Record<string, number>;
  numbers: Record<string, number>;
};

type SentimentResult = {
  score: number;
  comparative: number;
  calculation?: string[] | { [key: string]: number }[];
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
};

export type Analyzed = {
  summ: AnalyzedSummary;
  result: SentimentResult;
};

export type Note = {
  _id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  analyzed?: Analyzed;
};
