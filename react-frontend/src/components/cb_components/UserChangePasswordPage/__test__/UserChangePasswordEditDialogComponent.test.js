import React from "react";
import { render, screen } from "@testing-library/react";

import UserChangePasswordEditDialogComponent from "../UserChangePasswordEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders userChangePassword edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserChangePasswordEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("userChangePassword-edit-dialog-component"),
  ).toBeInTheDocument();
});
