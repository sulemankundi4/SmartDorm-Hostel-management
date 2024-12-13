import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useCreateUserPreferencesMutation,
  useGetUserPreferencesQuery,
  useUpdateUserPreferencesMutation,
} from '../../../Redux/api/userPreferencesApi';
import toast from 'react-hot-toast';
import TopBar from './../../components/topBar';
import Navbar from './../../components/navBar';
import SideBar from './components/sideBar';
import { useCombobox } from 'downshift';
import axios from 'axios';
import debounce from 'lodash.debounce';

const UserPreferencesForm = () => {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    universityName: '',
    sleepingHabits: '',
    city: '',
    sharedExpense: false,
    smokingHabits: false,
  });

  const { data: userPreferences, refetch } = useGetUserPreferencesQuery(
    user._id,
  );
  const [createUserPreferences] = useCreateUserPreferencesMutation();
  const [updateUserPreferences] = useUpdateUserPreferencesMutation();

  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');

  useEffect(() => {
    if (userPreferences) {
      setFormData(userPreferences.data);
      setSelectedUniversity(userPreferences.data.universityName);
    }
  }, [userPreferences]);

  const fetchUniversities = async (inputValue) => {
    const response = await axios.get(
      `http://universities.hipolabs.com/search?name=${inputValue}&country=pakistan`,
    );

    if (response.data) {
      setUniversities(response.data.map((uni) => uni.name));
    }
  };

  const debouncedFetchUniversities = useCallback(
    debounce(fetchUniversities, 800),
    [],
  );

  const {
    isOpen,
    getMenuProps,
    getLabelProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    items: universities,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        debouncedFetchUniversities(inputValue);
      } else {
        setUniversities([]);
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      setSelectedUniversity(selectedItem);
      setFormData({ ...formData, universityName: selectedItem });
    },
    itemToString: (item) => (item ? item : ''),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUserPreferences({
        ...formData,
        userId: user._id,
      });
      if (data.success) {
        toast.success('Preferences saved successfully');
        refetch();
      } else {
        toast.error('Failed to save preferences');
      }
    } catch (error) {
      toast.error('An error occurred while saving preferences');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateUserPreferences({
        userId: user._id,
        body: formData,
      });
      if (data.success) {
        toast.success('Preferences updated successfully');
        refetch();
      } else {
        toast.error('Failed to update preferences');
      }
    } catch (error) {
      toast.error('An error occurred while updating preferences');
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="relative w-[94%] mx-auto lg:pb-24 pb-16 md:mt-[84px] mt-[70px] bg-white">
        <div className="container relative md:mt-24 mt-16">
          <div className="md:flex">
            <SideBar />
            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-black">
                  User Preferences
                </h2>
                {userPreferences ? (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">
                      Your Preferences
                    </h3>
                    <p className="mb-2">
                      <strong>University Name:</strong>{' '}
                      {userPreferences.data.universityName}
                    </p>
                    <p className="mb-2">
                      <strong>Sleeping Habits:</strong>{' '}
                      {userPreferences.data.sleepingHabits}
                    </p>
                    <p className="mb-2">
                      <strong>City:</strong> {userPreferences.data.city}
                    </p>
                    <p className="mb-2">
                      <strong>Shared Expense:</strong>{' '}
                      {userPreferences.data.sharedExpense ? 'Yes' : 'No'}
                    </p>
                    <p className="mb-2">
                      <strong>Smoking Habits:</strong>{' '}
                      {userPreferences.data.smokingHabits ? 'Yes' : 'No'}
                    </p>
                    <button
                      onClick={() => setFormData(userPreferences.data)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit Preferences Below
                    </button>
                  </div>
                ) : (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">
                      Preferences Not Added
                    </h3>
                    <button
                      onClick={() =>
                        setFormData({
                          universityName: '',
                          sleepingHabits: '',
                          city: '',
                          sharedExpense: false,
                          smokingHabits: false,
                        })
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Create Preferences below
                    </button>
                  </div>
                )}
                <form
                  onSubmit={userPreferences ? handleUpdate : handleSubmit}
                  className="max-w-4xl mx-auto relative"
                >
                  <div className="mb-4 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="universityName"
                    >
                      University Name
                    </label>
                    <input
                      type="text"
                      name="universityName"
                      placeholder="Select your university"
                      value={selectedUniversity || formData.universityName}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...getInputProps()}
                      disabled={selectedUniversity ? true : false}
                    />
                    {selectedUniversity && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUniversity('');
                          setFormData({ ...formData, universityName: '' });
                        }}
                        className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        Edit
                      </button>
                    )}
                    {isOpen && (
                      <ul
                        {...getMenuProps()}
                        className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto"
                      >
                        {universities.map((item, index) => (
                          <li
                            key={index}
                            {...getItemProps({ item, index })}
                            className={`cursor-pointer py-2 px-4 transition-colors duration-200 ${
                              highlightedIndex === index
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-black'
                            } ${
                              selectedItem === item ? 'font-bold' : ''
                            } hover:bg-red-500 hover:text-white`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="sleepingHabits"
                    >
                      Sleeping Habits
                    </label>
                    <select
                      name="sleepingHabits"
                      value={formData.sleepingHabits}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Usually sleeps before 10 PM">
                        Usually sleeps before 10 PM
                      </option>
                      <option value="Stays up past midnight regularly">
                        Stays up past midnight regularly
                      </option>
                      <option value="Sleeps between 10 PM and midnight">
                        Sleeps between 10 PM and midnight
                      </option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Shared Expense
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="sharedExpense"
                        checked={formData.sharedExpense}
                        onChange={handleChange}
                        className="mr-2 leading-tight"
                      />
                      <span className="text-gray-700">Yes</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Smoking Habits
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="smokingHabits"
                        checked={formData.smokingHabits}
                        onChange={handleChange}
                        className="mr-2 leading-tight"
                      />
                      <span className="text-gray-700">Yes</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {userPreferences
                        ? 'Update Preferences'
                        : 'Save Preferences'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserPreferencesForm;
