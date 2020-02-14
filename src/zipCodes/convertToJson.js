const fs = require("fs");

const fileContent = fs.readFileSync("./nlZipCodes.txt", "utf8");

const lines = fileContent.split("\n");

const parsedLines = lines.map(lineString => lineString.split("\t"));

const coordinatesByZipCode = parsedLines.reduce((map, line) => {
  if (line[0] === "") {
    return map;
  }

  const zipCodeNumber = Number(line[1].split(" ")[0]);
  if (zipCodeNumber >= 3000) {
    return map;
  }

  const zipCode = line[1].replace(" ", "");
  const latitude = Number(line[9]);
  const longitude = Number(line[10]);

  map[zipCode] = {
    lat: latitude,
    lng: longitude
  };

  return map;
}, {});

const stringified = JSON.stringify(coordinatesByZipCode);

fs.writeFileSync("./nlZipCodesUpTo3000.json", stringified);
