export const mapCategory = (category: "all" | "visited" | "unvisited") => {
  if (category === "all") return " Всички Обекти";
  else if (category === "visited") return "Посетени";
  else if (category === "unvisited") return "Непосетени";
  else return "";
};
