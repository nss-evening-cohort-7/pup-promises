const data = require('./data');
const dom = require('./dom');

$('#single-pup-btn').click((e) => {
  data.singlePup().then((pup) => {
    dom.printPup(pup);
  });
});
