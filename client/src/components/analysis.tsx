import axios from "axios";
import { useState, useEffect } from "react";
import { Analyzed, Note } from "../types/types";
import { UseBlob } from "../hooks/blob";
import { handleAxiosError } from "../utils/handle-axios.errors";

export function Analysis({ id }: { id: string | undefined }) {
  const [analyzed, setAnalyzed] = useState<Analyzed>();
  const [allData, setAllData] = useState<Note>();
  const { handleDownload } = UseBlob({ dataToLoad: allData });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:3010/note/${id}`, {
        params: { analysis: true },
      });
      if (response.status === 200) {
        setAnalyzed(response.data.note.analyzed);
        setAllData(response.data.note);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  const getKeyAndValue = (obj: Record<string, unknown>, limit?: number) => {
    if (!obj || Object.keys(obj).length === 0) {
      return <p>0</p>;
    }

    const entries = Object.entries(obj);
    const sliced = limit ? entries.slice(0, limit) : entries;

    return (
      <ul>
        {sliced.map(([k, v]) => (
          <li key={k}>
            ' {k} ' : {String(v)}
          </li>
        ))}
      </ul>
    );
  };

  const runArrAndGetItems = (arr: string[]) => {
    if (arr.length === 0) {
      return <p>0</p>;
    }
    return (
      <ul>
        {arr.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    );
  };

  return (
    <main className="analysis-block">
      {analyzed && (
        <>
          <h1>Analyzed info:</h1>
          <div className="analyzed-info">
            <div>
              <h2>Symbols and words:</h2>
              <h4>Punctuation marks:</h4>
              {getKeyAndValue(analyzed?.summ?.punctMarks)}
              <h4>The first five most common words:</h4>
              {getKeyAndValue(analyzed?.summ?.words, 5)}
              <h4>Longest word:</h4>
              <p>{analyzed?.summ?.longestWord}</p>
              <h4>Special symbols:</h4>
              {getKeyAndValue(analyzed?.summ?.symbols)}
              <h4>Numbers:</h4>
              {getKeyAndValue(analyzed?.summ?.numbers)}
            </div>
            <div>
              <h2>Sentiments:</h2>
              <h4>
                Score: <span>{analyzed.result.score}</span>
              </h4>
              <h4>
                Comparative: <span>{analyzed.result.comparative}</span>
              </h4>
              <h4>Positive words:</h4>
              {runArrAndGetItems(analyzed?.result?.positive)}
              <h4>Negative words:</h4>
              {runArrAndGetItems(analyzed?.result?.negative)}
            </div>
          </div>
        </>
      )}
      <section className="analysis-buttons">
        <button onClick={fetchData}>Analyze again</button>
        <button onClick={handleDownload}>Download analysis</button>
        <button>Delete note</button>
      </section>
    </main>
  );
}
