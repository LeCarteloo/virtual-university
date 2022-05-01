// Stylesheet
import "./App.css";

// React stuff
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Suspense } from "react";

// Importing Components
import Login from "./components/Login";
import Remind from "./components/Remind";
import Home from "./components/Home";

import en_US from "./languages/en/app.json";
import pl_PL from "./languages/pl/app.json";

// Initializing i18n with tranlsation files
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en_US },
    pl: { translation: pl_PL },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function App() {
  return (
    <Suspense fallback="Loading...">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="remind" exact element={<Remind />} />
            <Route path="home/*" exact element={<Home />} />

            {/* <Route path="*" element={} /> */}
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
