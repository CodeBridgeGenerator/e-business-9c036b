import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingProviderSInformationEditDialogComponent from "../TrainingProviderSInformationEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingProviderSInformation edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TrainingProviderSInformationEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("trainingProviderSInformation-edit-dialog-component"),
  ).toBeInTheDocument();
});
