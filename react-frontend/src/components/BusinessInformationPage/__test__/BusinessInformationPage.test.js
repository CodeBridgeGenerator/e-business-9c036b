import React from "react";
import { render, screen } from "@testing-library/react";

import BusinessInformationPage from "../BusinessInformationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders businessInformation page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <BusinessInformationPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("businessInformation-datatable")).toBeInTheDocument();
  expect(
    screen.getByRole("businessInformation-add-button"),
  ).toBeInTheDocument();
});
