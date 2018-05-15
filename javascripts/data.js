const dom = require('./dom');

/* ALL PUP DATA FUNCTIONS */

/* How we would have gotten all the data with JQuery AJAX △ */
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
//               dom.domString(pups);
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

/* Promise Constructors */
const firstPupJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup1.json')
      .done((data) => {
        resolve(data.pup1);
      })
      .fail((err) => {
        reject(`Oi got an error!`, err);
      });
  });
};

const secondPupJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup2.json')
      .done((data) => {
        resolve(data.pup2);
      })
      .fail((err) => {
        reject(`Oi got an error!`, err);
      });
  });
};

const thirdPupJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup3.json')
      .done((data) => {
        resolve(data.pup3);
      })
      .fail((err) => {
        reject(`Oi got an error!`, err);
      });
  });
};

/* Promise Pyramid of DOOM △ - works but is still confusing */
// const getAllPups = () => {
//   let pups = [];
//   firstPupJSON().then((results) => {
//     pups = [...results,];
//     secondPupJSON().then((results2) => {
//       pups = [...pups, ...results2,];
//       thirdPupJSON().then((results3) => {
//         pups = [...pups, ...results3,];
//         printToDom(pups);
//       }).catch((error) => {
//         console.error('error', error);
//       });
//     });
//   });
// };

/* Promise Chaining Solution, returning a resolved promise with the data */
// const getAllPups = () => {
//   let dogos = [];
//   return firstPupJSON()
//     .then((result) => {
//       dogos = [...result,];
//       return secondPupJSON();
//     }).then((result2) => {
//       dogos = [...dogos, ...result2,];
//       return thirdPupJSON();
//     }).then((result3) => {
//       dogos = [...dogos, ...result3,];
//       return Promise.resolve(dogos);
//     }).catch((errorMsg) => {
//       console.error(errorMsg);
//     });
// };

/*
Promise.all Solution, returning a resolved promise with the data
Best solution for this problem, because we aim to aggregate the data together quickly
*/
const getAllPups = () => {
  return Promise.all([firstPupJSON(), secondPupJSON(), thirdPupJSON(),])
    .then((results) => {
      const dogos = [...results[0], ...results[1], ...results[2],];
      return Promise.resolve(dogos);
    }).catch((error) => {
      console.error(error);
    });
};

const initializer = () => {
  /* We just called this function at first before we started returning the resolved Promise */
  // getAllPups();
  getAllPups().then((dogos) => {
    dom.domString(dogos);
  });
};

/* SINGLE PUP DATA FUNCTIONS */

/* Promise Constructors */
const firstFoodJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/food1.json')
      .done((data) => {
        const foodArray = data.food1;
        foodArray.map(food => food.key = 1);
        resolve(foodArray);
      })
      .fail((err) => {
        reject(`Oi got an error!`, err);
      });
  });
};

const secondFoodJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/food2.json')
      .done((data) => {
        const foodArray = data.food2;
        foodArray.map(food => food.key = 2);
        resolve(foodArray);
      })
      .fail((err) => {
        reject(`Oi got an error!`, err);
      });
  });
};

const thirdFoodJSON = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/food3.json')
      .done((data) => {
        const foodArray = data.food3;
        foodArray.map(food => food.key = 3);
        resolve(foodArray);
      })
      .fail((err) => {
        reject(`Oi got an error!`, err);
      });
  });
};

/*
Using PROMISE.ALL to get the matching foods for the first Pup
Note: we are exporting this function
*/
const singlePup = () => {
  let pup = {};
  return getAllPups().then((pups) => {
    pup = pups[0];
    return Promise.all([firstFoodJSON(), secondFoodJSON(), thirdFoodJSON(),]);
  }).then((foodz) => {
    const allTheFood = [...foodz[0], ...foodz[1], ...foodz[2],];
    const matching = allTheFood.filter((food) => {
      if (pup.favFoodId === food.key) {
        return true;
      };
      return false;
    });
    pup.favFood = matching;
    return Promise.resolve(pup);
  });
};

module.exports = {
  initializer,
  singlePup,
};