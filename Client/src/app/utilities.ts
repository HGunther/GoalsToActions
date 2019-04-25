
export function convertDate(_date: Date, format: string): number {
    return convertMiliseconds(_date.getTime(), format);
}

export function convertMiliseconds(miliseconds: number, format: string) : number {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds : number;

    total_seconds = Math.floor(miliseconds / 1000);
    total_minutes = Math.floor(total_seconds / 60);
    total_hours = Math.floor(total_minutes / 60);
    days = Math.floor(total_hours / 24);
  
    seconds = total_seconds % 60;
    minutes = total_minutes % 60;
    hours = total_hours % 24;
    
    switch(format) {
    case 's':
      return total_seconds;
      break;
    case 'm':
      return total_minutes;
      break;
    case 'h':
      return total_hours;
      break;
    case 'd':
      return days;
      break;
    default:
      return 0;
    }
  };


