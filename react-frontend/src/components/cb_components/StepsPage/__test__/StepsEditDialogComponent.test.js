import React from "react";
import { render, screen } from "@testing-library/react";

import StepsEditDialogComponent from "../StepsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders steps edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <StepsEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("steps-edit-dialog-component")).toBeInTheDocument();
});
