const outputDiv = $('#pups');

const domString = (pups) => {
  pups.forEach((pup) => {
    let domStrang = '';
    domStrang += `<div class="col-sm-6 col-md-4">`;
    domStrang += `<div class="thumbnail">`;
    domStrang += `<div class="caption">`;
    domStrang += `<h3>${pup.name}</h3>`;
    domStrang += `<p>${pup.bio}</p>`;
    domStrang += `</div>`;
    domStrang += `</div>`;
    domStrang += `</div>`;
    printToDom(domStrang);
  });
  // return pups;
  // using this as a breakpoint and put a debugger on domString(data1); in getAllPups then hovering over the data and clicking on it to see the pup data (see screenshot)
};

const printToDom = (pupz) => {
  outputDiv.append(pupz);
};

module.exports = domString;
