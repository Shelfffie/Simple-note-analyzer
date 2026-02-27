import { Note } from "../types/types";
import { useMemo } from "react";

export function UseBlob({ dataToLoad }: { dataToLoad?: Note }) {
  const getKeyAndValue = (obj: Record<string, unknown>, limit?: number) => {
    if (!obj || Object.keys(obj).length === 0) {
      return `0`;
    }
    const entries = Object.entries(obj);
    const sliced = limit ? entries.slice(0, limit) : entries;
    const newObj = sliced.map(([k, v]) => `\n'${k}': ${String(v)}`);
    return newObj;
  };

  const arrMap = (arr: string[] | { [key: string]: number }[]) => {
    if (arr.length === 0) {
      return `0`;
    }
    let newArr;
    if (typeof arr[0] === "string") {
      newArr = arr.map((p) => `\n ${p}`);
    } else {
      newArr = arr.map((o) => {
        const [[k, v]] = Object.entries(o);
        return `\n '${k}': ${v}`;
      });
    }

    return newArr;
  };

  const text = `Title: ${dataToLoad?.title}\n\nContent: ${
    dataToLoad?.content
  }\n\nCreated at: ${dataToLoad?.created_at}\n\nLast update: ${
    dataToLoad?.updated_at
  }\n\n\nAnalyze:\n\nLongest word: ${
    dataToLoad?.analyzed?.summ.longestWord
  }\n\nPunctuation marks: ${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.punctMarks ?? {}
  )}\n\nThe first five most common words:: ${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.words ?? {},
    5
  )}\n\nSymbols: ${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.symbols ?? {}
  )}\n\nNumbers: ${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.numbers ?? {}
  )}\n\n\nSentiment result:\nScore: ${
    dataToLoad?.analyzed?.result.score
  }\n\nComparative:  ${
    dataToLoad?.analyzed?.result.comparative
  }\n\nCalculation:${arrMap(
    dataToLoad?.analyzed?.result?.calculation ?? []
  )}\n\nPositive words: ${arrMap(
    dataToLoad?.analyzed?.result?.positive ?? []
  )}\n\n Negative words: ${arrMap(
    dataToLoad?.analyzed?.result?.negative ?? []
  )}\n\n\n\nAll words and their frequency: ${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.words ?? {}
  )}`;

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const handleDownload = () => {
    if (!dataToLoad) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `Note_${dataToLoad?.title}_analysis.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { handleDownload };
}
