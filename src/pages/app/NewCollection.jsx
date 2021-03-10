import { ArrowRight } from "@material-ui/icons";
import React from "react";
import Header from "../../components/Header";

export default function NewCollection() {
  return (
    <div>
      <Header title="New Collection" url={["new"]}>
        <button className="green">
          <p>Next</p>
          <ArrowRight />
        </button>
      </Header>
      <section className="NewCollection">
        <form action="">
          <label htmlFor="">Name of Collection</label>
          <input id="collection" placeholder="Enter here . . ." />
          <div className="url">
            <label htmlFor="">url</label>
            <div className="p">
              <p>/</p>
            </div>
            <input id="url" type="text" />
          </div>
          <p className="note">* This cannot be changed later</p>
        </form>
      </section>
    </div>
  );
}
