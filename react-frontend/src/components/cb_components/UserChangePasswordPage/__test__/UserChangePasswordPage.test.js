import React from "react";
import { render, screen } from "@testing-library/react";

import UserChangePasswordPage from "../UserChangePasswordPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders userChangePassword page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserChangePasswordPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("userChangePassword-datatable")).toBeInTheDocument();
  expect(screen.getByRole("userChangePassword-add-button")).toBeInTheDocument();
});
