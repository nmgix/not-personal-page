export function dateTimeAgo(date: number, english?: boolean) {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((Number(now) - Number(past)) / 1000);

  const units = [
    { label: english ? "y" : "г", seconds: 31536000 },
    { label: english ? "m" : "м", seconds: 2592000 },
    { label: english ? "w" : "н", seconds: 604800 },
    { label: english ? "d" : "д", seconds: 86400 },
    { label: english ? "h" : "ч", seconds: 3600 },
    { label: english ? "m" : "м", seconds: 60 }
  ];

  for (const unit of units) {
    const interval = Math.floor(diff / unit.seconds);
    if (interval >= 1) {
      return `${interval}${unit.label} ${english ? "ago" : "назад"}`;
    }
  }

  return english ? "just now" : "только что";
}
