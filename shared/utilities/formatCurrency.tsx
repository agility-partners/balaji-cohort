export const numberFormatter = new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 2,
});

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});