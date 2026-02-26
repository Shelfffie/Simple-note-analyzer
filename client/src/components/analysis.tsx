import axios from "axios";
import { useState, useEffect } from "react";
import { Analyzed } from "../types/types";

export function Analysis({ id }: { id: string | undefined }) {
  const [analyzed, setAnalyzed] = useState<Analyzed>();
  //const isAnalyzed = useRef<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get(`http://localhost:3010/note/${id}`, {
      params: { analysis: true },
    });
    if (response.status === 200) {
      setAnalyzed(response.data.note.analyzed);
      console.log(response.data);
    }
  }
  return (
    <main className="analysis-block">
      <button onClick={fetchData}>Analyze again</button>
      {analyzed && (
        <>
          <h1>Analyzed info:</h1>
          <div className="analyzed-info">
            <section>
              <h3>Symbols:</h3>
              <h6>Punctuation marks:</h6>
              <ul>
                {analyzed?.summ?.punctMarks &&
                  Object.entries(analyzed.summ.punctMarks).map(([k, v]) => (
                    <li key={k}>
                      {k}: {v}
                    </li>
                  ))}{" "}
              </ul>
              <h6>The first five most common words:</h6>
              <ul>
                {analyzed?.summ?.words &&
                  Object.entries(analyzed.summ.words)
                    .slice(0, 5)
                    .map(([k, v]) => (
                      <li key={k}>
                        {k}: {v}
                      </li>
                    ))}{" "}
              </ul>
              <h6>Longest word:</h6>
              <p>{analyzed?.summ?.longestWord}</p>
              <h6>Special symbols:</h6>
              <ul>
                {analyzed?.summ?.symbols &&
                  Object.entries(analyzed.summ.symbols).map(([k, v]) => (
                    <li key={k}>
                      {k}: {v}
                    </li>
                  ))}{" "}
              </ul>
              <h6>Numbers:</h6>
              <ul>
                {analyzed?.summ?.numbers &&
                  Object.entries(analyzed.summ.numbers).map(([k, v]) => (
                    <li key={k}>
                      {k}: {v}
                    </li>
                  ))}{" "}
              </ul>
            </section>
            <section>
              <h3>Sentiments:</h3>
              <h6>
                Score: <span>{analyzed.result.score}</span>
              </h6>
              <h6>
                Comparative:<span>{analyzed.result.comparative}</span>
              </h6>
              <h6>Positive words:</h6>{" "}
              <p>
                {analyzed.result.positive.length > 0
                  ? analyzed.result.positive.length
                  : 0}{" "}
              </p>
              <h6>Negative words:</h6>{" "}
              <p>
                {analyzed.result.negative.length > 0
                  ? analyzed.result.negative.length
                  : 0}
              </p>
            </section>
          </div>
        </>
      )}
    </main>
  );
}
