import React from "react";
import { render, screen } from "@testing-library/react";

import TrainerDetailsPage from "../TrainerDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainerDetails page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <TrainerDetailsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("trainerDetails-datatable")).toBeInTheDocument();
  expect(screen.getByRole("trainerDetails-add-button")).toBeInTheDocument();
});
