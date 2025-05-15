
import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

type AuthRouteProps = {
  children: React.ReactNode;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  
  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }
  
  // Redirect to sign-in if user is not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  // Render children if user is authenticated
  return <>{children}</>;
};

export default AuthRoute;
