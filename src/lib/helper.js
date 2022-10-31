export function formatName(name) {
  let nameArray = name.replaceAll("-", " ").replaceAll("_", " ").split(" ");

  let formattedName = "";
  for (let i = 0; i < nameArray.length; i++) {
    formattedName +=
      nameArray[i][0].toUpperCase() + nameArray[i].slice(1) + " ";
  }
  return formattedName.replaceAll("Ios", "iOS").replaceAll("os", "OS");
}
