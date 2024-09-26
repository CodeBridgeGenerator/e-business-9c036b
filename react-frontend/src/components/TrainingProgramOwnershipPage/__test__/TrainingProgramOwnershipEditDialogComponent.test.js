import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingProgramOwnershipEditDialogComponent from "../TrainingProgramOwnershipEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingProgramOwnership edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TrainingProgramOwnershipEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("trainingProgramOwnership-edit-dialog-component"),
  ).toBeInTheDocument();
});
