import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "../components/Error404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/fire";
const LazySignin = lazy(() => import("../pages/Signin"));
const LazyLayout = lazy(() => import("../layout/Layout"));
const LazyBudget = lazy(() => import("../pages/Budget"));
const LazyHistory = lazy(() => import("../pages/History"));
const LazyIncome = lazy(() => import("../pages/Income"));
const LazyOverview = lazy(() => import("../pages/Overview"));
const LazyExpense = lazy(() => import("../pages/Expense"));

const Routers = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
      setLoading(false);
    });
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer autoClose={5000} position="top-center" limit={5} />
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="loader">
                    <Loader />
                  </div>
                }
              >
                <LazySignin loggedin={loggedin} setLoggedin={setLoggedin} />
              </Suspense>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Suspense
                fallback={
                  <div className="loader">
                    <Loader />
                  </div>
                }
              >
                <LazyLayout loggedin={loggedin} setLoggedin={setLoggedin} />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense
                  fallback={
                    <div className="loader">
                      <Loader />
                    </div>
                  }
                >
                  <LazyOverview />
                </Suspense>
              }
            />
            <Route
              path="history"
              element={
                <Suspense
                  fallback={
                    <div className="loader">
                      <Loader />
                    </div>
                  }
                >
                  <LazyHistory />
                </Suspense>
              }
            />
            <Route
              path="budget"
              element={
                <Suspense
                  fallback={
                    <div className="loader">
                      <Loader />
                    </div>
                  }
                >
                  <LazyBudget />
                </Suspense>
              }
            />
            <Route
              path="income"
              element={
                <Suspense
                  fallback={
                    <div className="loader">
                      <Loader />
                    </div>
                  }
                >
                  <LazyIncome />
                </Suspense>
              }
            />
            <Route
              path="expense"
              element={
                <Suspense
                  fallback={
                    <div className="loader">
                      <Loader />
                    </div>
                  }
                >
                  <LazyExpense />
                </Suspense>
              }
            />
          </Route>

          {/* </Route> */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Routers;
