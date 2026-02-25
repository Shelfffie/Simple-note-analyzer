import Sentiment from "sentiment";

const noteAnalysis = (note) => {
  const text = note.content;
  const wordMatching = text.match(/\b[A-Za-z0-9]+\b/g) || [];
  const punctMarks = text.match(/\.{3}|[\.?!,:\-\"]/g) || [];
  const symbols = text.match(/[^A-Za-z0-9\.?!,:\-\"]/g) || [];
  const summ = {
    punctMarks: {},
    words: {},
    longestWord: "",
    symbols: {},
    numbers: {},
  };

  wordMatching.forEach((w) => {
    if (!isNaN(Number(w))) {
      summ.numbers[w] = (summ.numbers[w] || 0) + 1;
    } else {
      summ.words[w] = (summ.words[w] || 0) + 1;
      if (w.length > summ.longestWord.length) summ.longestWord = w;
    }
  });

  punctMarks.forEach((p) => {
    summ.punctMarks[p] = (summ.punctMarks[p] || 0) + 1;
  });

  symbols.forEach((s) => {
    summ.symbols[s] = (summ.symbols[s] || 0) + 1;
  });

  let sentiment = new Sentiment();
  const result = sentiment.analyze(text);

  return { summ, result };
};

export default noteAnalysis;
