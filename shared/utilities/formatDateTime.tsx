export function formatToEastern(rawTimestamp: string): string {
  if (!rawTimestamp) return "";

  // If no timezone is present, treat it as UTC.
  const utcLike = /Z|[+-]\d{2}:\d{2}$/.test(rawTimestamp)
    ? rawTimestamp
    : `${rawTimestamp}Z`;

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(new Date(utcLike));
}