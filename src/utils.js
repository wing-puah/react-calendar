function timeFns(timeStamp) {
  const month = timeStamp.getUTCMonth();
  const year = timeStamp.getUTCFullYear();
  const shortMth = timeStamp.toLocaleString('en-US', {month: 'short'});
  // const date = timeStamp.getUTCDate();
  const setFirstDateOfMth = new Date(timeStamp.setUTCDate(1));
  const getFirstDayOfMth = setFirstDateOfMth.getUTCDay();
  const getLastDateOfMth = new Date(Date.UTC(year, month+1, 0));
  const getLastDayOfMth = getLastDateOfMth.getUTCDay();
  const parseForDateInput = new Date(timeStamp.getTime())
                              .toISOString().split('T')[0];
  const timeOpts = { hour: 'numeric', minute: 'numeric', hour12: false }
  const parseForTimeInput = timeStamp.toLocaleString('en-US', timeOpts);
  const toLocalStorageString = year.toString().concat(
    month > 9
      ? month
      : '0' + month.toString()
  );

  return {
    shortMth,
    month,
    year,
    setFirstDateOfMth,
    getFirstDayOfMth,
    selectedDay: timeStamp.getUTCDay(),
    getLastDateOfMth,
    getLastDayOfMth,
    toLocalStorageString,
    parseForDateInput,
    parseForTimeInput
  }
}

function getStartOfWeek(timeStamp) {
  const firstDay = timeFns(timeStamp).getFirstDayOfMth;
  const firstDateTimeStamp = timeFns(timeStamp).setFirstDateOfMth;

  const firstDateOfWeek = firstDay === 0 ? firstDateTimeStamp
    : new Date(firstDateTimeStamp.setDate(firstDateTimeStamp.getUTCDate() - firstDay))

  return firstDateOfWeek;
}

function getLastOfWeek(timeStamp) {
  const lastDay = timeFns(timeStamp).getLastDayOfMth;
  const lastDateTimeStamp = timeFns(timeStamp).getLastDateOfMth;

  const lastDateOfWeek = lastDay === 6 ? lastDateTimeStamp
    : new Date(lastDateTimeStamp.setDate(lastDateTimeStamp.getDate() + (7-lastDay)))

  return lastDateOfWeek
}

function sendToLocalStorage(form, func, edit) {
  let submission = {};
  const formData = new FormData(form);
  const LSlength = localStorage.length;
  let idx = LSlength > 0 ? Number(localStorage.key(LSlength-1)) +1 : 0;

  for(let entry of formData.entries()) {
    submission[entry[0]] = entry[1];
  }

  if(edit === true){
    idx = form.getAttribute('idx')
  }
  submission['index'] = idx;

  localStorage.setItem(idx, JSON.stringify(submission));

  if(func) {
    func();
  }
}

export { timeFns, getStartOfWeek, getLastOfWeek, sendToLocalStorage };
