import * as React from "react";
import { create, all } from "mathjs";

const math = create(all, {});

const calculateFraction = ({
  measurement,
  measurementAmount,
  showMeasurement,
  showQuantity,
  quantity,
  ingredient,
  id,
}) => {
  if (
    !!measurementAmount &&
    showMeasurement &&
    !math.isInteger(measurementAmount)
  ) {
    const { n, d } = math.Fraction(measurementAmount);
    if (measurementAmount <= 1) {
      measurementAmount = `${n} / ${d}`;
    } else {
      measurementAmount = `${Math.floor(measurementAmount)} ${n % d} / ${d}`;
    }
  }
  if (!!quantity && showQuantity && !math.isInteger(quantity)) {
    const { n, d } = math.Fraction(quantity);
    if (quantity <= 1) {
      quantity = `${n} / ${d}`;
    } else {
      quantity = `${Math.floor(quantity)} ${n % d} / ${d}`;
    }
  }
  if (!!measurementAmount && !!measurement) {
    measurement = `(${[measurementAmount, measurement].join(" ")})`;
  } else if (!!measurementAmount) {
    measurement = measurementAmount;
  }
  return {
    measurement,
    showMeasurement,
    showQuantity,
    quantity,
    ingredient,
    id,
  };
};

export default function Ingredients(props: any) {
  return (
    <section className="ingreidents-sec">
      <div className="container-md container-fluid">
        <div className="row">
          {props.ingredients &&
            props.ingredients.map((v, i) => (
              <div className="col-6" key={"col" + i}>
                <h3>{v.subItem}</h3>
                <ul>
                  {v.ingredientsList.map((ingredientData) => {
                    const {
                      measurement,
                      showMeasurement,
                      showQuantity,
                      quantity,
                      ingredient,
                      id,
                    } = calculateFraction(ingredientData);

                    return (
                      <li key={`${v.subItem}_${ingredient}_${id}`}>
                        <label className="check">
                          {showQuantity && quantity}{" "}
                          {showMeasurement && measurement} {ingredient}
                          <input type="checkbox" name="is_name" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
