export function splitQuery(url: string) {
  const query: { [queryParam: string]: string } = {};
  url
    .split("?")[1]
    .split("&")
    .forEach(p => {
      const [t, v] = p.split("=");
      query[t] = v;
    });

  return query;
}

// https://stackoverflow.com/a/2450976/14889638
export function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}
