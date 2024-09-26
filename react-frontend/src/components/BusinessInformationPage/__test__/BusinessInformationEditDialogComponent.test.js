import React from "react";
import { render, screen } from "@testing-library/react";

import BusinessInformationEditDialogComponent from "../BusinessInformationEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders businessInformation edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <BusinessInformationEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("businessInformation-edit-dialog-component"),
  ).toBeInTheDocument();
});
