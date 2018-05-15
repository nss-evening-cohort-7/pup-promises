const outputDiv = $('#pups');

const domString = (pups) => {
  pups.forEach((pup) => {
    let pupString = '';
    pupString += `<div class="col-sm-6 col-md-4">`;
    pupString += `<div class="thumbnail">`;
    pupString += `<div class="caption">`;
    pupString += `<h3>${pup.name}</h3>`;
    pupString += `<p>${pup.bio}</p>`;
    pupString += `</div>`;
    pupString += `</div>`;
    pupString += `</div>`;
    printToDom(pupString);
  });
};

const printPup = (pup) => {
  let pupString = '';
  pupString += `<div class="col-sm-6 col-md-4">`;
  pupString += `<div class="thumbnail">`;
  pupString += `<div class="caption">`;
  pupString += `<h3>${pup.name}</h3>`;
  pupString += `<p>${pup.bio}</p>`;
  pupString += `<p>Fav foods:</p>`;
  pup.favFood.forEach((food) => {
    pupString += `<p>${food.name}</p>`;
  });
  pupString += `</div>`;
  pupString += `</div>`;
  pupString += `</div>`;
  replaceDom(pupString);
};

const printToDom = (pupz) => {
  outputDiv.append(pupz);
};

const replaceDom = (pup) => {
  outputDiv.html(pup);
};

module.exports = {
  domString,
  printPup,
};
