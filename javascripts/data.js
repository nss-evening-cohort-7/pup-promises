const dom = require('./dom');

const getAllPups = () => {
  let pups = [];
  $.get('../db/pup1.json')
    .done((data1) => {
      pups = [...data1.pup1,];
      $.get('../db/pup2.json')
        .done((data2) => {
          pups = [...pups, ...data2.pup2,];
          $.get('../db/pup3.json')
            .done((data3) => {
              pups = [...pups, ...data3.pup3,];
              dom(pups);
            })
            .fail((error3) => {
              console.error(error3);
            });
        })
        .fail((error2) => {
          console.error(error2);
        });
    })
    .fail((error1) => {
      console.error(error1);
    });
};

const initializer = () => {
  getAllPups();
};

module.exports = {
  initializer,
};
