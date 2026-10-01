import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Onboarding from "../pages/auth/Onboarding";

// Layout
<<<<<<< HEAD
=======


>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import TransporterLayout from "../components/layouts/TransporterLayout";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
<<<<<<< HEAD

// Loads
import AvailableLoads from "../pages/loads/AvailableLoads";
import LoadDetails from "../pages/loads/LoadDetails";
=======
import WeeklySettlement from "../pages/WeeklySettlement";
// Loads
import AvailableLoads from "../pages/loads/AvailableLoads";
import LoadDetails from "../pages/loads/LoadDetails";
import NewOrderAvailable from "../pages/NewOrderAvailable";
import WalletPayment from "../pages/WalletPayment";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

// Trips
import MyTrips from "../pages/trips/MyTrips";
import TripDetails from "../pages/trips/TripDetails";
import LiveTrip from "../pages/trips/LiveTrip";
import TripChat from "../pages/trips/TripChat";
import Delivery from "../pages/trips/Delivery";
import TripDocuments from "../pages/trips/TripDocuments";
import TripComplete from "../pages/trips/TripComplete";
<<<<<<< HEAD

// Wallet
import Wallet from "../pages/wallet/Wallet";
import WeeklySettlement from "../pages/WeeklySettlement";
import WalletPayment from "../pages/WalletPayment";
import SecurePayment from "../pages/SecurePayment";

// Profile
import Profile from "../pages/profile/Profile";
import UpdateProfile from "../pages/profile/UpdateProfile";
=======
import SecurePayment from "../pages/SecurePayment";

// Wallet
import Wallet from "../pages/wallet/Wallet";

// Profile
import Profile from "../pages/profile/Profile";
import DeliveryConfirmation from "../pages/trips/DeliveryConfirmation";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

// Notifications
import Notifications from "../pages/notifications/Notifications";

<<<<<<< HEAD
import Documents from "../pages/profile/Documents";

// Support
import HelpCenter from "../pages/support/HelpCenter";
import ContactSupport from "../pages/support/ContactSupport";
import FAQs from "../pages/support/FAQs";

// 404
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
=======
// 404
import NotFound from "../pages/NotFound";
import UpdateProfile from "../pages/profile/UpdateProfile";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

function AppRoutes() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <AuthProvider>
        <Routes>
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Transporter Application */}
          <Route element={<ProtectedRoute />}>
            <Route element={<TransporterLayout />}>
              
              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Loads */}
              <Route path="/loads" element={<AvailableLoads />} />
              <Route path="/loads/:loadId" element={<LoadDetails />} />
              
              {/* Trips */}
              <Route path="/trips" element={<MyTrips />} />
              <Route path="/trips/:tripId" element={<TripDetails />} />
              <Route path="/trips/:tripId/live" element={<LiveTrip />} />
              <Route path="/trips/:tripId/chat" element={<TripChat />} />
              <Route path="/trips/:tripId/delivery" element={<Delivery />} />
              <Route path="/trips/:tripId/documents" element={<TripDocuments />} />
              <Route path="/trips/:tripId/complete" element={<TripComplete />} />
              
              {/* Wallet & Payments */}
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/wallet/weekly-settlement" element={<WeeklySettlement />} />
              <Route path="/wallet/payment" element={<WalletPayment />} />
              <Route path="/wallet/secure-payment" element={<SecurePayment />} />
              
              {/* Profile */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/update" element={<UpdateProfile />} />
              <Route path="/profile/documents" element={<Documents />} />
              
              {/* Notifications */}
              <Route path="/notifications" element={<Notifications />} />

              {/* Support */}
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/support" element={<ContactSupport />} />
              <Route path="/faqs" element={<FAQs />} />
            </Route>
          </Route>

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
=======
      <Routes>

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/onboarding"
          element={<Onboarding />}
        />

        {/* Transporter Application */}

        <Route element={<TransporterLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
  path="/trips/:tripId/delivery"
  element={<DeliveryConfirmation />}
/>
<Route
  path="/wallet/weekly-settlement"
  element={<WeeklySettlement />}
/>
<Route
  path="/new-order"
  element={<NewOrderAvailable />}
/>
          <Route
            path="/loads"
            element={<AvailableLoads />}
          />

          <Route
            path="/loads/:loadId"
            element={<LoadDetails />}
          />
<Route
  path="/wallet/payment"
  element={<WalletPayment />}
/>
          <Route
            path="/trips"
            element={<MyTrips />}
          />

          <Route
            path="/trips/:tripId"
            element={<TripDetails />}
          />

          <Route
            path="/trips/:tripId/live"
            element={<LiveTrip />}
          />

          <Route
            path="/trips/:tripId/chat"
            element={<TripChat />}
          />

          <Route
            path="/trips/:tripId/delivery"
            element={<Delivery />}
          />
<Route
  path="/profile/update"
  element={<UpdateProfile />}
/>
          <Route
            path="/trips/:tripId/documents"
            element={<TripDocuments />}
          />

          <Route
            path="/trips/:tripId/complete"
            element={<TripComplete />}
          />

          <Route
            path="/wallet"
            element={<Wallet />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
  path="/wallet/secure-payment"
  element={<SecurePayment />}
/>

          <Route
            path="/notifications"
            element={<Notifications />}
          />

        </Route>

        {/* Default */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </BrowserRouter>
  );
}

<<<<<<< HEAD
export default AppRoutes;
=======
export default AppRoutes;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
