export const TailleBadge = (num : number) => {
    if (num < 10) return "w-5 h-5 text-xs -top-1 -right-1";
    if (num < 100) return "w-6 h-6 text-xs -top-2 -right-2"; 
    if (num < 1000) return "min-w-6 h-6 px-1 text-xs -top-2 -right-3";
    return "min-w-7 h-6 px-1 text-xs -top-2 -right-3"; 
  };

 export const FormatCompteur = (num : number) => {
    return num > 999 ? "999+" : num;
  };