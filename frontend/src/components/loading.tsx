import { ReactElement } from "react";

export default function Loading(): ReactElement {
  return (
    /* From Uiverse.io by zanina-yassine */
    <section className="flex justify-center items-center">
      <div className="container">
        <div className="cloud front">
          <span className="left-front"></span>
          <span className="right-front"></span>
        </div>
        <span className="sun sunshine"></span>
        <span className="sun"></span>
        <div className="cloud back">
          <span className="left-back"></span>
          <span className="right-back"></span>
        </div>
      </div>
    </section>
  );
}
