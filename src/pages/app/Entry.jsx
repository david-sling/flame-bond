import { capitalize } from "@material-ui/core";
import React from "react";
import FormInput from "./FormInput";

export default function Entry({ entry, schema, setEntry }) {
  return (
    <section>
      <form action="">
        {entry &&
          schema?.fields.map((item) => {
            if (item.key[0] == "_") return;
            return (
              <div className="field">
                <label htmlFor="">{capitalize(item.key)}</label>
                <FormInput
                  setValue={(v) => {
                    setEntry({ ...entry, [item.key]: v });
                  }}
                  value={entry[item.key]}
                  type={schema.fields.find((k) => k.key == item.key).type}
                />
              </div>
            );
          })}
      </form>
    </section>
  );
}
