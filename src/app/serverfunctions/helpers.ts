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
