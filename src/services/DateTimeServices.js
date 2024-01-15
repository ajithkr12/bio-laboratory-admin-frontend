
export const dateStringToYear = (_dateString) => {

  const dateObject = new Date(_dateString);
  const year = dateObject.getFullYear();
  return year;
    
}




export const dateStringFormaterToIST = (_dateString) => {

  const inputDate = new Date(_dateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };
  
  const formattedDateString = inputDate.toLocaleDateString('en-US', options);
  return formattedDateString;
    
}

export const dateStringFormaterToUST = (_dateString) => {

  const inputDate = new Date(_dateString);

  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Asia/Kolkata', // 'Asia/Kolkata' is the IANA time zone identifier for India Standard Time
  };
  
  const formattedDateString = new Intl.DateTimeFormat('en-US', options).format(inputDate);
  return formattedDateString;
    
}


// Wed Jan 31 2024 10:52:47 GMT+0530 (India Standard Time) to 31/01/2024
export const dateStringFormaterToNormal = (_dateString) => {

  const inputDate = new Date(_dateString);
  
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const formattedDateString = inputDate.toLocaleDateString('en-IN', options);
  return formattedDateString;
    
}