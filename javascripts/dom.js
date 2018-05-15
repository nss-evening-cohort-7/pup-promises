const outputDiv = $('#pups');

const domString = (pups) => {
  pups.forEach((pup) => {
    let domString = '';
    domString += `<div class="col-sm-6 col-md-4">`;
    domString +=  `<div class="thumbnail">`;
    domString +=  `<div class="caption">`;
    domString +=  `<h3>${pup.name}</h3>`;
    domString +=  `<p>${pup.bio}</p>`;
    domString +=  `</div>`;
    domString +=  `</div>`;
    domString +=  `</div>`;
    printToDom(domString);
  });
};

const printToDom = (pupz) => {
  outputDiv.append(pupz);
};

module.exports = domString;
