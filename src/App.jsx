import React from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import MapCard from "./components/MapCard";
import "./index.css";

function App() {
  return (
    <Layout>
      <Header />
      <main className="flex-grow">
        <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4">
        <MapCard
        imageUrl="/images/3.jpg"
        title="Paraguay Map"
        description="This is a detailed map of Paraguay showing major cities and natural landmarks."
        extraData="Population: 7 million"
      />
      <MapCard
        imageUrl="/images/1.jpg"
        title="Brazil Map"
        description="A geographical map of Brazil with climate zones."
        extraData="Area: 8.5 million sq km"
      />
        </div>
      </main>
    </Layout>
  );
}

export default App;
