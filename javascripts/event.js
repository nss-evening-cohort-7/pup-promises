const data = require('./data');
const dom = require('./dom');

$('#single-pup-btn').click((e) => {
  /* data.singlePup is a function that returns a promise */
  data.singlePup().then((pup) => {
    dom.printPup(pup);
  });
});
