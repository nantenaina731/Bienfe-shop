// Function to format the date and time
const formatDateTime = (dateString: string) => {
  // Create a Date object from the ISO string
  const date = new Date(dateString);

  // Format the date and time
  const optionsDate: any = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime: any = { hour: "2-digit", minute: "2-digit" };

  const formattedDate = date.toLocaleDateString("fr-FR", optionsDate);
  const formattedTime = date.toLocaleTimeString("fr-FR", optionsTime);

  // Return the formatted string
  return `le ${formattedDate} à ${formattedTime}`;
};

function formatDate(date: Date) {
  const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Jan",
    "Fév",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ];
  date = new Date(date);
  const dayOfWeek = jours[date.getDay()];
  const actualDate = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return dayOfWeek + ", " + actualDate + " " + month + " " + year;
}

function formatMonth(date: string) {
  const months = [
    "Jan",
    "Fév",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ];
  let month = parseInt(date.split("-")[1]) - 1;
  return String(months[month]) + "/" + date.split("-")[0].slice(2, 4);
}
function formatDateMinim(date: Date) {
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  date = new Date(date);
  const actualDate = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return actualDate + "/" + month + "/" + year;
}
const getRole = (role: string) => {
  switch (role) {
    case "admin":
      return "Administrateur";
    default:
      return "Employé";
  }
};

const capitalize = (name: string) => {
  return name[0].toUpperCase() + name.slice(1, name.length);
};

function formatMoney(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export {
  formatDateTime,
  getRole,
  formatDate,
  capitalize,
  formatMoney,
  formatDateMinim,
  formatMonth,
};
