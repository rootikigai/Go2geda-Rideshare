export const getRides = async () => {
  const res = await fetch("/api/routes");
  if (!res.ok) throw new Error("Failed to fetch rides");
  return await res.json();
};
