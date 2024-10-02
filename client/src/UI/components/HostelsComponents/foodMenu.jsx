import React from 'react';

const FoodMenu = ({ hostelData }) => {
  return (
    <>
      <h5 className="text-lg text-black font-semibold">Food Menu:</h5>

      <div className="mt-3 shadow-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg bg-white">
          <thead className="bg-red-500 rounded-t-lg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-blue-300">
                Day
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-blue-300">
                Breakfast
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-blue-300">
                Lunch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-b border-blue-300">
                Dinner
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hostelData?.FoodMenu?.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-blue-100 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-gray-500">
                  {item.Day}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.BreakFast}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Lunch}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Dinner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FoodMenu;
