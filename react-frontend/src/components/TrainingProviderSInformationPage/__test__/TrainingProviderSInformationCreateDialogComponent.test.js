import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingProviderSInformationCreateDialogComponent from "../TrainingProviderSInformationCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingProviderSInformation create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TrainingProviderSInformationCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("trainingProviderSInformation-create-dialog-component"),
  ).toBeInTheDocument();
});
