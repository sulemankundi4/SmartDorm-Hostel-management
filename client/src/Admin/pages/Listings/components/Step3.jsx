// Step3.jsx
import React from 'react';

const Step3 = ({ formData, handleChange, handleFoodMenu }) => {
  return (
    <div>
      <h2>Step 3: Food Menu</h2>
      {formData.FoodMenu.map((menu, index) => (
        <div
          key={index}
          className="mb-4 dark:border-strokedark dark:bg-boxdark"
        >
          <h2 className="font-bold text-lg mb-2 dark:text-white">{menu.Day}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <label className="mb-2.5 block text-black dark:text-white">
                Breakfast
              </label>
              <input
                type="text"
                name={`FoodMenu[${index}].BreakFast`}
                value={menu.BreakFast}
                onChange={(e) =>
                  handleFoodMenu(index, 'BreakFast', e.target.value)
                }
                placeholder={`Enter Breakfast for ${menu.Day}`}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2.5 block text-black dark:text-white">
                Lunch
              </label>
              <input
                type="text"
                name={`FoodMenu[${index}].Lunch`}
                value={menu.Lunch}
                onChange={(e) => handleFoodMenu(index, 'Lunch', e.target.value)}
                placeholder={`Enter Lunch for ${menu.Day}`}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2.5 block text-black dark:text-white">
                Dinner
              </label>
              <input
                type="text"
                name={`FoodMenu[${index}].Dinner`}
                value={menu.Dinner}
                onChange={(e) =>
                  handleFoodMenu(index, 'Dinner', e.target.value)
                }
                placeholder={`Enter Dinner for ${menu.Day}`}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step3;
