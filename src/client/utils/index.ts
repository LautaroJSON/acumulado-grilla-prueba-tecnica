function formatDate(dateParam: string): string {
  const date = new Date(dateParam);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} de ${month} de ${year}`;
}

export { formatDate };
