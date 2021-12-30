export function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
}

export function convertInvalidIntoValidDate(invalidDate) {
  // 20200921을 '2020-09-21'로 리턴
  return `${invalidDate.slice(0, 4)}-${invalidDate.slice(
    4,
    6
  )}-${invalidDate.slice(6, 8)}`;
}

export function getFormattedDate(date_string, delimeter = "/") {
  let date = new Date(date_string);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  let today = [String(yyyy), String(mm), String(dd)];
  return today.join(delimeter);
}

export function getHour(date) {
  let newDate = new Date(date);
  let hour = newDate.getHours();
  return hour > 9 ? String(hour) : "0" + String(hour);
}
