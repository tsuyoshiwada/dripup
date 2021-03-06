const palette = [
  "#992220",
  "#d2241e",
  "#ec6598",
  "#4b4fa8",
  "#1da6d4",
  "#78d2d2",
  "#87cf3b",
  "#4b7610",
  "#787710",
  "#fffc00",
  "#ffa400",
  "#ff780d",
  "#784b1b",
  "#111111",
  "#808080",
  "#ffffff"
];

export const selectColors = palette.map(color => {
  let obj = { color };

  switch (color) {
    case "#fffc00": obj = { ...obj, checkMarkColor: "#adab35" }; break;
    case "#ffffff": obj = { ...obj, borderColor: "#bebebe", checkMarkColor: "#bebebe" }; break;
  }

  return obj;
});

export default palette;
