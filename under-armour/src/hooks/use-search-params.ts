export function useSearchParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    get: (key: string) => params.get(key),
  };
}
