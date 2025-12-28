export const cacheOptions = {
  cacheTime: 1_000 * 60 * 60,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

export async function getData<T>(path?: string) {
  const response = await fetch(
    `https://dev.codeleap.co.uk/careers${path ?? "/"}`,
  );

  return response.json() as Promise<T>;
}
