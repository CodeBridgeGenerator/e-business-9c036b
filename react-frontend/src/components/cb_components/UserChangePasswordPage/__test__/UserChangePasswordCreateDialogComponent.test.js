import React from "react";
import { render, screen } from "@testing-library/react";

import UserChangePasswordCreateDialogComponent from "../UserChangePasswordCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders userChangePassword create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserChangePasswordCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("userChangePassword-create-dialog-component"),
  ).toBeInTheDocument();
});
