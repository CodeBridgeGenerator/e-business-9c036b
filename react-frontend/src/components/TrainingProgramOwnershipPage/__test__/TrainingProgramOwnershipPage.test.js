import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingProgramOwnershipPage from "../TrainingProgramOwnershipPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingProgramOwnership page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TrainingProgramOwnershipPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("trainingProgramOwnership-datatable"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("trainingProgramOwnership-add-button"),
  ).toBeInTheDocument();
});
