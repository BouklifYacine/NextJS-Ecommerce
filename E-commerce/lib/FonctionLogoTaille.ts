export const TailleBadge = (num: number) => {
  if (num < 10) return "w-5 h-5 text-xs";
  if (num < 100) return "w-6 h-6 text-xs";
  return "min-w-7 h-6 px-1 text-xs";
};

 export const FormatCompteur = (num : number) => {
    return num > 99 ? "99+" : num;
  };