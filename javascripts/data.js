const domString = require('./dom');

// const getAllPups = () => {
//   let pups = [];
//   $.get('../db/pup1.json')
//     .done((data1) => {
//       pups = data1.pup1;
//       $.get('../db/pup2.json')
//         .done((data2) => {
//           pups = [...pups, ...data2.pup2,];
//           $.get('../db/pup3.json')
//             .done((data3) => {
//               pups = [...pups, ...data3.pup3,];
//               domString(pups);
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

const firstPupJSON  = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup1.json')
      .done((data) => {
        resolve(data.pup1);
      })
      .fail((err) => {
        reject(`OI got an Error!`, err);
      });
  });
};

const secondPupJSON  = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup2.json')
      .done((data) => {
        resolve(data.pup2);
      })
      .fail((err) => {
        reject(`OI got an Error!`, err);
      });
  });
};

const thirdPupJSON  = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/pup3.json')
      .done((data) => {
        resolve(data.pup3);
      })
      .fail((err) => {
        reject(`OI got an Error!`, err);
      });
  });
};

// const getAllPups = () => {
//   let dogos = [];
//   return firstPupJSON()
//     .then((result) => {
//       // domString(result);
//       dogos = [...result,];
//       return secondPupJSON();
//     }).then((result2) => {
//       dogos = [...dogos, ...result2,];
//       return thirdPupJSON();
//     }).then((result3) => {
//       dogos = [...dogos, ...result3,];
//       // domString(dogos);
//       return Promise.resolve(dogos);
//     }).catch((errorMsg) => {
//       console.error(errorMsg);
//     });
// };

const getAllPups = () => {
  return Promise.all([firstPupJSON(), secondPupJSON(), thirdPupJSON(),])
    .then((results) => {
      const dogos = [...results[0], ...results[1], ...results[2],];
      return Promise.resolve(dogos);
    })
    .catch((error) => {
      console.error(error);
    });
};

const initializer = () => {
  getAllPups().then((dogos) => {
    domString.domString(dogos);
  });
  // singlePup();
};

// const getAllPups = () => {
//   let dogos = [];
//   firstPupJSON()
//     .then((result) => {
//       // domString(result);
//       dogos = [...result,];
//       return secondPupJSON();
//     }).then((result2) => {
//       dogos = [...dogos, ...result2,];
//       return thirdPupJSON();
//     }).then((result3) => {
//       dogos = [...dogos, ...result3,];
//       domString(dogos);
//     }).catch((errorMsg) => {
//       console.error(errorMsg);
//     });
// };

// const initializer = () => {
//   getAllPups();
// };

const firstFoodJSON  = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/food1.json')
      .done((data) => {
        const foodArray = data.food1;
        foodArray.map(food => food.key = 1);
        resolve(foodArray);
      })
      .fail((err) => {
        reject(`OI got an Error!`, err);
      });
  });
};

const secondFoodJSON  = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/food2.json')
      .done((data) => {
        const foodArray = data.food2;
        foodArray.map(food => food.key = 2);
        resolve(foodArray);
      })
      .fail((err) => {
        reject(`OI got an Error!`, err);
      });
  });
};

const thirdFoodJSON  = () => {
  return new Promise((resolve, reject) => {
    $.get('../db/food3.json')
      .done((data) => {
        const foodArray = data.food3;
        foodArray.map(food => food.key = 3);
        resolve(foodArray);
      })
      .fail((err) => {
        reject(`OI got an Error!`, err);
      });
  });
};

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
