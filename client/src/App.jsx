import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './Admin/common/Loader';
import PageTitle from './Admin/components/PageTitle';
import LandinPage from './UI/pages/landingPage';
import SignIn from './UI/pages/signIn';
import SignUp from './UI/pages/signUp';
import VerifyEmail from './UI/pages/verifyEmail';
import EmailVerified from './UI/pages/emailVerified';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getLoggedInUser } from './Redux/api/userApi';
import { userLoggedIn, userLoggedOut } from './Redux/reducers/userReducers';
import ProtectedRoute from './utils/protectedRoute';
import Dashboard from './Admin/pages/Dashboard/dashBoard';
import AllUsers from './Admin/pages/Users/allUsers';
import { auth } from './utils/firebaseAuth';
import ContactUs from './UI/pages/contactUs';
import MyListings from './Admin/pages/Listings/MyListings';
import AddNewListing from './Admin/pages/Listings/AddNewListing';
import AllListings from './Admin/pages/Listings/AllListings';
import VerifyListingDetails from './Admin/pages/Listings/verificationListingDetails';
import ListingDetails from './Admin/pages/Listings/ListingDetails';
import HostelDetails from './UI/pages/hostelDetails';
import SearchListings from './UI/pages/Listings/searchListings';
import ListingTable from './Admin/pages/Listings/ManageListings/viewListingTable';
import ListingsTable from './Admin/pages/Listings/ManageListings/ListingsTable';
import EditListing from './Admin/pages/Listings/ManageListings/editListings';
import CheckOut from './UI/pages/checkOut';
import AllTickets from './Admin/pages/Tickets/AllTickets';
import TicketDetails from './Admin/pages/Tickets/TicketDetails';
import StudentProfile from './UI/pages/Students/studentProfile';
import VerifySingleRoomBookings from './Admin/pages/Bookings/VerifySingleRoomBookings';
import StudentBookings from './UI/pages/Students/studentBookings';
import StudentReviews from './UI/pages/Students/components/studentReviews';

function App() {
  const jwtCookieToken = document.cookie
    .split(';')
    .some((item) => item.includes('jwt'));

  const decodeJWT = (token) => {
    return jwtDecode(token);
  };

  const { pathname } = useLocation();
  const { user, loading } = useSelector((s) => s.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (jwtCookieToken) {
        const tokenPayload = decodeJWT(
          document.cookie
            .split(';')
            .find((item) => item.includes('jwt'))
            .split('=')[1],
        );
        console.log(tokenPayload);
        const data = await getLoggedInUser(tokenPayload.id, tokenPayload.type);
        dispatch(userLoggedIn(data));
      } else {
        dispatch(userLoggedOut());
      }
      // else {
      //   onAuthStateChanged(auth, async (user) => {
      //     if (user) {
      //       const res = await getUserByUid(user.uid);
      //       dispatch(userLoggedIn(res.payLoad.user));
      //     } else {
      //       dispatch(userLoggedOut());
      //       console.log('not logged in');
      //     }
      //   });
      // }
    };

    getCurrentUser();
  }, [jwtCookieToken, auth]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="SmartDorm | Redefining Hostel Living with Ease" />
              <LandinPage />
            </>
          }
        />
        {/* STUDENT ROUTES */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={user?.University !== '' ? true : false}
              isEmailVerified={user?.IsEmailVerified}
            />
          }
        >
          <Route
            path="/student-profile"
            element={
              <>
                <PageTitle title="Student Profile | SmartDorm" />
                <StudentProfile />
              </>
            }
          />

          <Route
            path="/student-bookings"
            element={
              <>
                <PageTitle title="Student Bookings | SmartDorm" />
                <StudentBookings />
              </>
            }
          />

          <Route
            path="/student-reviews"
            element={
              <>
                <PageTitle title="Student Reviews | SmartDorm" />
                <StudentReviews />
              </>
            }
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allListings" element={<AllListings />} />
        </Route>
        {/* ADMIN ROUTES */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
              adminRoute={true}
              isAdmin={user?.Role === 'user' ? false : true}
              isEmailVerified={user?.IsEmailVerified}
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allListings" element={<AllListings />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={user ? false : true}
              isEmailVerified={true}
            />
          }
        >
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route
          path="/verifyEmail"
          element={
            <>
              <PageTitle title="Verify Email | SmartDorm" />
              <VerifyEmail />
            </>
          }
        />
        <Route
          path="/emailVerified"
          element={
            <>
              <PageTitle title="Email Verified | SmartDorm" />
              <EmailVerified />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <PageTitle title="Contact Us | SmartDorm" />
              <ContactUs />
            </>
          }
        />{' '}
        <Route
          path="/search"
          element={
            <>
              <PageTitle title="Search Listings | SmartDorm" />
              <SearchListings />
            </>
          }
        />
        <Route
          path="/pay"
          element={
            <>
              <PageTitle title="Search Listings | SmartDorm" />
              <CheckOut />
            </>
          }
        />
        <Route
          path="/hostelDetails/:hostelId"
          element={
            <>
              <PageTitle title="Details | SmartDorm" />
              <HostelDetails />
            </>
          }
        />
        {/* BELOW ROUTES FOR THE ADMIN */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
              isEmailVerified={user?.IsEmailVerified}
              isAdmin={true}
              adminRoute={true}
            />
          }
        >
          <Route
            path="/verifyListingDetails/:listingId"
            element={<VerifyListingDetails />}
          />
          <Route path="/manage-users" element={<AllUsers />} />
          <Route path="/all-tickets" element={<AllTickets />} />
          <Route path="/ticket-details/:ticketId" element={<TicketDetails />} />
        </Route>
        {/* BELOW ROUTES FOR THE Hostel owners*/}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
              isEmailVerified={user?.IsEmailVerified}
              isOwner={user?.Role === 'owner' ? true : false}
              ownerRoute={true}
            />
          }
        >
          <Route path="/myListings" element={<MyListings />} />
          <Route
            path="/single/bookings"
            element={<VerifySingleRoomBookings />}
          />
          <Route
            path="/listingDetails/:listingId"
            element={<ListingDetails />}
          />
          <Route path="/myListings/new" element={<AddNewListing />} />
          <Route path="/manage/all" element={<ListingsTable />} />
          <Route path="/listing/edit/:id" element={<EditListing />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
