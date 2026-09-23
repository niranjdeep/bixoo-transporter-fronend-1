import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Onboarding from "../pages/auth/Onboarding";

// Layout


import TransporterLayout from "../components/layouts/TransporterLayout";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Loads
import AvailableLoads from "../pages/loads/AvailableLoads";
import LoadDetails from "../pages/loads/LoadDetails";

// Trips
import MyTrips from "../pages/trips/MyTrips";
import TripDetails from "../pages/trips/TripDetails";
import LiveTrip from "../pages/trips/LiveTrip";
import TripChat from "../pages/trips/TripChat";
import Delivery from "../pages/trips/Delivery";
import TripDocuments from "../pages/trips/TripDocuments";
import TripComplete from "../pages/trips/TripComplete";

// Wallet
import Wallet from "../pages/wallet/Wallet";

// Profile
import Profile from "../pages/profile/Profile";

// Notifications
import Notifications from "../pages/notifications/Notifications";

// 404
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
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
            path="/loads"
            element={<AvailableLoads />}
          />

          <Route
            path="/loads/:loadId"
            element={<LoadDetails />}
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
    </BrowserRouter>
  );
}

export default AppRoutes;