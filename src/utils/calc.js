const today = new Date();

function getAge(dob) {
  if (!dob) return { years: 0, months: 0, days: 0 };

  const birthDate = new Date(dob);
  const diff = new Date(today.getTime() - birthDate.getTime());
  const years = diff.getUTCFullYear() - 1970;
  const months = diff.getUTCMonth();
  const days = diff.getUTCDate() - 1;

  return { years, months, days };
}

export { getAge };
