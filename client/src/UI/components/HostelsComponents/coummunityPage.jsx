import React from 'react';

const CoummunityPage = ({ students }) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Community Page</h1>
      <div className="overflow-hidden shadow-lg rounded-lg">
        <table className="min-w-full  bg-white border p-5 border-gray-200">
          <thead className="bg-red-500">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-white uppercase tracking-wider">
                University
              </th>

              <th className="py-3 px-6 text-left text-sm font-medium text-white uppercase tracking-wider">
                Total No of students
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-transparent">
            {students.map((student, index) => (
              <tr
                key={index}
                className="hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-md mb-2"
              >
                <td className="py-4 px-6 text-sm text-gray-500">
                  {student.university}
                </td>

                <td className="py-4 px-6 text-sm text-gray-500">
                  {student.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CoummunityPage;
