import { Note } from "../types/types";

export function UseBlob({ dataToLoad }: { dataToLoad?: Note }) {
  let createDate: Date | null = dataToLoad
    ? new Date(dataToLoad.createdAt)
    : null;
  let updateDate: Date | null = dataToLoad
    ? new Date(dataToLoad.updatedAt)
    : null;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

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

  const text = `Title: \n${dataToLoad?.title}\n\n##########\n\nContent: \n${
    dataToLoad?.content
  }\n\n##########\n\nCreated at: \n${
    createDate
      ? createDate.toLocaleString("en-GB", options)
      : dataToLoad?.createdAt
  }\n\n##########\n\nLast update:\n ${
    updateDate
      ? updateDate.toLocaleString("en-GB", options)
      : dataToLoad?.updatedAt
  }\n\n##########\n\nLongest word:\n ${
    dataToLoad?.analyzed?.summ.longestWord
  }\n\n##########\n\nPunctuation marks: \n${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.punctMarks ?? {}
  )}\n\n##########\n\nThe first five most common words: \n${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.words ?? {},
    5
  )}\n\n##########\n\nSymbols: \n${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.symbols ?? {}
  )}\n\n##########\n\nNumbers:\n ${getKeyAndValue(
    dataToLoad?.analyzed?.summ?.numbers ?? {}
  )}\n\n##########\n\nScore: ${
    dataToLoad?.analyzed?.result.score
  }\n\n##########\n\nComparative:  ${
    dataToLoad?.analyzed?.result.comparative
  }\n\n##########\n\nCalculation:${arrMap(
    dataToLoad?.analyzed?.result?.calculation ?? []
  )}\n\n##########\n\nPositive words: ${arrMap(
    dataToLoad?.analyzed?.result?.positive ?? []
  )}\n\n##########\n\n Negative words: ${arrMap(
    dataToLoad?.analyzed?.result?.negative ?? []
  )}\n\n##########\n\nAll words and their frequency: ${getKeyAndValue(
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
