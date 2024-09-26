import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingProgramOwnershipCreateDialogComponent from "../TrainingProgramOwnershipCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingProgramOwnership create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TrainingProgramOwnershipCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("trainingProgramOwnership-create-dialog-component")).toBeInTheDocument();
});
