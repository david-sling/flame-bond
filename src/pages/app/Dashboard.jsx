import React, { useEffect } from "react";
import Header from "../../components/Header";

export default function Dashboard({ setPage }) {
  useEffect(() => {
    setPage(null);
  }, []);
  return (
    <section>
      <Header title="Dashboard" />
    </section>
  );
}
