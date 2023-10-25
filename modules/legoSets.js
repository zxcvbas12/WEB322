const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function Initialize() {
  return new Promise((resolve) => {
    sets = setData.map((set) => {
      const themeMatch = themeData.find((theme) => theme.id === set.theme_id);
      return {
        set_num: set.set_num,
        name: set.name,
        year: set.year,
        theme_id: set.theme_id,
        num_parts: set.num_parts,
        img_url: set.img_url,
        theme: themeMatch ? themeMatch.name : "Unknown",
      };
    });
    resolve();
  });
}

function getAllSets() {
  return new Promise((resolve) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const foundSet = sets.find((set) => set.set_num === setNum);
    if (foundSet) {
      resolve(foundSet);
    } else {
      reject("Unable to find requested set");
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const matchingSets = sets.filter((set) =>
      set.theme.toLowerCase().includes(theme.toLowerCase())
    );
    if (matchingSets.length > 0) {
      resolve(matchingSets);
    } else {
      reject("Unable to find requested sets");
    }
  });
}

module.exports = {
  Initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
};
