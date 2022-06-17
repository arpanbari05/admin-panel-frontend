export function amount(number = 0) {
  return `₹ ${parseInt(number).toLocaleString("en-In")}`;
}