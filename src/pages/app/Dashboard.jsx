import React, { useEffect } from "react";

export default function Dashboard({ setPage }) {
  useEffect(() => {
    setPage(null);
  }, []);
  return <div>Dashboard</div>;
}
