import React from "react";
import { render, screen } from "@testing-library/react";

import OfficerInChargeEditDialogComponent from "../OfficerInChargeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders officerInCharge edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OfficerInChargeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("officerInCharge-edit-dialog-component")).toBeInTheDocument();
});
