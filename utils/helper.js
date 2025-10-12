
export function dateToIST(date) {
  const utcDate = new Date(date);

  // Convert to IST by adding 5 hours 30 minutes in milliseconds
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(utcDate.getTime() + istOffset);

  // Format to 'YYYY-MM-DD HH:mm:ss' for MySQL DATETIME
  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const day = String(istDate.getDate()).padStart(2, "0");
  const hours = String(istDate.getHours()).padStart(2, "0");
  const minutes = String(istDate.getMinutes()).padStart(2, "0");
  const seconds = String(istDate.getSeconds()).padStart(2, "0");

  const formattedIST = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedIST;
}