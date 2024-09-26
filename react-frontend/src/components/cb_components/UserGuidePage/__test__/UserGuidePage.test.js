import React from "react";
import { render, screen } from "@testing-library/react";

import UserGuidePage from "../UserGuidePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders userGuide page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserGuidePage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("userGuide-datatable")).toBeInTheDocument();
  expect(screen.getByRole("userGuide-add-button")).toBeInTheDocument();
});
