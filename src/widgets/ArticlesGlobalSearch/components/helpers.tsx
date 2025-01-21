function splitKeepDelimiter(text: string, delimiter: string | RegExp): string[] {
  const regex =
    typeof delimiter === "string"
      ? new RegExp(`(${delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "g")
      : new RegExp(`(${delimiter.source})`, "g");
  return text
    .toLowerCase()
    .split(regex)
    .filter(part => part.length > 0);
}

function findSubstringPosition(text: string, substring: string, regexOptions: { regex: RegExp; replace: string }) {
  const escapedSubstring = substring.toLowerCase().replace(regexOptions.regex, regexOptions.replace);
  const regex = new RegExp(escapedSubstring);
  const match = regex.exec(text.toLowerCase());
  return match
    ? {
        match,
        regex
      }
    : null;
}

export const selectTextExample = (symbolsLimit: number, text?: string, phrase?: string) => {
  if (!text?.trim() || !phrase?.trim()) return "";
  const regexOptions: Parameters<typeof findSubstringPosition>[2] = { replace: "\\$&", regex: /[.*+?^${}()|[\]\\]/g };
  const regexMatch = findSubstringPosition(text, phrase, regexOptions); // первый раз regex'ом

  let startIndex = Math.max(0, text.length / 2 - symbolsLimit);
  let endIndex = Math.min(text.length, text.length / 2 + phrase.length + symbolsLimit);

  if (!regexMatch) {
    return text.substring(startIndex, endIndex);
  } else {
    startIndex = Math.max(0, regexMatch.match.index - symbolsLimit);
    endIndex = Math.min(text.length, regexMatch.match.index + regexMatch.match[0].length + symbolsLimit);
    text = text.substring(startIndex, endIndex);
  }

  const parts = splitKeepDelimiter(text, regexMatch.regex); //второй раз regex'ом проходимся, не оч
  return parts.map(p => (regexMatch.regex.test(p.toLowerCase()) ? <mark>{p}</mark> : <span>{p}</span>)); // много раз regex'ом
};
