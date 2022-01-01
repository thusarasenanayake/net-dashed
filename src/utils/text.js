function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatTime(string) {
  if (string)
    return new Date(string).toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
  return new Date().toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getGreeting(name) {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Good morning, ' + name;
  } else if (currentHour < 18) {
    return 'Good afternoon, ' + name;
  } else {
    return 'Good evening, ' + name;
  }
}

function getFirstLetter(word) {
  if (word) return word.charAt(0);
  else return false;
}

export { capitalizeFirstLetter, formatTime, getGreeting, getFirstLetter };
