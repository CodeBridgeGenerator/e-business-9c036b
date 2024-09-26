import React from "react";
import { render, screen } from "@testing-library/react";

import TrainerDetailsEditDialogComponent from "../TrainerDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainerDetails edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TrainerDetailsEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("trainerDetails-edit-dialog-component"),
  ).toBeInTheDocument();
});
