const dom = require('./dom');

// old way

// const getAllPups = () => {
//   let pups = [];
//   $.get('../db/pup1.json')
//     .done((data1) => {
//       pups = [...data1.pup1,];
//       $.get('../db/pup2.json')
//         .done((data2) => {
//           pups = [...pups, ...data2.pup2,];
//           $.get('../db/pup3.json')
//             .done((data3) => {
//               pups = [...pups, ...data3.pup3,];
//               dom(pups);
//             })
//             .fail((error3) => {
//               console.error(error3);
//             });
//         })
//         .fail((error2) => {
//           console.error(error2);
//         });
//     })
//     .fail((error1) => {
//       console.error(error1);
//     });
// };

// Promises - Pyramid of Doom

const firstPupJson = () => { // the IOU
  return new Promise((resolve, reject) => {
    $.get('../db/pup1.json')
      .done((data) => {
        resolve(data.pup1);
      })
      .fail((err) => {
        reject('01 got an error', err);
      });
  });
};

const secondPupJson = () => { // the IOU
  return new Promise((resolve, reject) => {
    $.get('../db/pup2.json')
      .done((data) => {
        resolve(data.pup2);
      })
      .fail((err) => {
        reject('01 got an error', err);
      });
  });
};

const thirdPupJson = () => { // the IOU
  return new Promise((resolve, reject) => {
    $.get('../db/pup3.json')
      .done((data) => {
        resolve(data.pup3);
      })
      .fail((err) => {
        reject('01 got an error', err);
      });
  });
};

// const getAllPups = () => {
//   let dogos = [];
//   // firstPupJson();
//   return firstPupJson()
//     .then((results) => {
//       dogos = [...results,];
//       return secondPupJson();
//     }).then((results2) => {
//       dogos = [...dogos, ...results2,];
//       return thirdPupJson();
//     }).then((results3) => {
//       dogos = [...dogos, ...results3,];
//       // dom(dogos);
//       return Promise.resolve(dogos);
//     })
//     .catch((errorMsg) => {
//       console.error(errorMsg);
//     });
// };

const getAllPups = () => {
  return Promise.all([firstPupJson(), secondPupJson(), thirdPupJson(),])
    .then((results) => {
      const dogos = [...results[0], ...results[1], ...results[2],];
      return Promise.resolve(dogos);
    })
    .catch((error) => {
      console.error(error);
    });
};

const initializer = () => {
  // getAllPups();
  getAllPups().then((dogos) => {
    dom(dogos);
  });
};

module.exports = {
  initializer,
};
