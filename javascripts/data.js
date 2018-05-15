const domString = require('./dom');

// ----------FIRST VERSION ------------ //

// const getAllPups = () => {
//   let pups = [];
//   $.get('../db/pup1.json')
//     .done((data1) => {
//       pups = [...data1.pup1,];
//       // did data1.pup1 because forEach only works on arrays and pup1 data used in domString function is in an object in pup1 json
//       $.get('../db/pup2.json')
//         .done((data2) => {
//           pups = [...pups, ...data2.pup2,];
//           $.get('../db/pup3.json')
//             .done((data3) => {
//               pups = [...pups, ...data3.pup3,];
//               // pups contains an array of 3 indexes so the ... represents 3 indexes and spreading them out.
//               domString(pups);
//               // did data1.pup1 because forEach only works on arrays and pup1 data used in domString function is in an object in pup1 json
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

// ----------SECOND VERSION ------------ //

const firstPupJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup1.json')
      .done((data) => {
        resolve(data.pup1);
      })
      .fail((err)  => {
        reject(`OUCH error!`, err);
      });
  });
};

const secondPupJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup2.json')
      .done((data) => {
        resolve(data.pup2);
      })
      .fail((err)  => {
        reject(`OUCH error!`, err);
      });
  });
};

const thirdPupJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup3.json')
      .done((data) => {
        resolve(data.pup3);
      })
      .fail((err)  => {
        reject(`OUCH error!`, err);
      });
  });
};

// ----------SECOND VERSION A (CHAINING) ------------ //

// const getAllPups = () => {
//   let dogos = [];
//   return firstPupJSON()
//     .then((result) => {
//       dogos = [...result,];
//       // the .then is an annoynmous function the return takes you out of the .then function but not out of the global scope of the getAllPups
//       return secondPupJSON();
//     }).then((result2) => {
//       dogos = [...dogos, ...result2,];
//       return thirdPupJSON();
//     }).then((result3) => {
//       dogos = [...dogos, ...result3,];
//       return Promise.resolve(dogos);
//       // domString(result); where originally domstring would have been
//     })
//     .catch((errorMsg) => {
//       console.error(errorMsg);
//     });
// };

// ----------SECOND VERSION B (.ALL) ------------ //

const getAllPups = () => {
  return Promise.all([firstPupJSON(), secondPupJSON(), thirdPupJSON(),])
    .then((results) => {
      const dogos = [...results[0], ...results[1], ...results[2],];
      return Promise.resolve(dogos);
    }).catch((error) => {
      console.error(error);
    });
};

// const singlePup = () => {
//   getAllPups.then((pups) => {
//     const foodId = pups[0].favFoodId;
//   });
// };

const initializer = () => {
  getAllPups().then((dogos) => {
    domString(dogos);
    // calling it this way will give you in realtime what the result/data is for this function and the function domString can be called again instead of just calling domString and passing in getAll Pups like this:
    // domString(getAllPups);
    // moved domString here to pass other things into it
  });

};

module.exports = {
  initializer,
};
