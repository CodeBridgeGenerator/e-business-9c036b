import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingProviderSInformationPage from "../TrainingProviderSInformationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingProviderSInformation page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TrainingProviderSInformationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("trainingProviderSInformation-datatable")).toBeInTheDocument();
    expect(screen.getByRole("trainingProviderSInformation-add-button")).toBeInTheDocument();
});
