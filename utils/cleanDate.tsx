
function cleanDate(datetime: string) {

  const dateObject = new Date(datetime);

  const formattedDate = dateObject.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');
  
  const formattedTime = dateObject.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });    
  
  return `${formattedDate} - ${formattedTime}`
}

export default cleanDate