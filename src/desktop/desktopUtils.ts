export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getAssetUrl(path: string) {
  return `${process.env.PUBLIC_URL}/${path.replace(/^\/+/, "")}`;
}

export function getMenuDateTimeLabel() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
    .format(new Date())
    .replace(/,/g, "");
}
