import React from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Card from "./components/Card";
import "./index.css";

function App() {
  return (
    <Layout>
      <Header />
      <main className="flex-grow">
        <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4">
          <Card />
        </div>
      </main>
    </Layout>
  );
}

export default App;
