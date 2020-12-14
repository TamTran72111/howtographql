function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = 60 * milliSecondsPerMinute;
  const milliSecondsPerDay = 24 * milliSecondsPerHour;
  const milliSecondsPerMoth = 30 * milliSecondsPerDay;
  const milliSecondsPerYear = 365 * milliSecondsPerDay;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 minute ago';
  }

  if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + ' minutes ago';
  }

  if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + ' hours ago';
  }

  if (elapsed < milliSecondsPerMoth) {
    return Math.round(elapsed / milliSecondsPerDay) + ' days ago';
  }

  if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMoth) + ' months ago';
  }

  return Math.round(elapsed / milliSecondsPerYear) + ' years ago';
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  const previous = new Date(date).getTime();
  return timeDifference(now, previous);
}
