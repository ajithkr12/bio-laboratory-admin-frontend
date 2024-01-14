
export const dateStringToYear = (_dateString) => {

  const dateObject = new Date(_dateString);
  const year = dateObject.getFullYear();
  return year;
    
}




export const dateStringFormater = (_dateString) => {

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