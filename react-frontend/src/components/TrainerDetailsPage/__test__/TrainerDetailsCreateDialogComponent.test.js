import React from "react";
import { render, screen } from "@testing-library/react";

import TrainerDetailsCreateDialogComponent from "../TrainerDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainerDetails create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TrainerDetailsCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("trainerDetails-create-dialog-component"),
  ).toBeInTheDocument();
});
