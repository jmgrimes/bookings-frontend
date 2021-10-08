/**
 * @jest-environment jsdom
 */
import {
  MockedProvider
} from "@apollo/client/testing"
import {
  render,
} from "@testing-library/react"

import BookableNew from "./BookableNew"

describe("<BookableNew/>", () => {
  it("should render the new bookable form state properly", async () => {
    const {getByRole, getByText} = render(
      <MockedProvider>
        <BookableNew/>
      </MockedProvider>
    )

    const title = getByText(/New Bookable/)
    expect(title).toBeInTheDocument()

    const groupField = getByRole("textbox", {name: /group/i})
    expect(groupField).toHaveAttribute("value", "")

    const titleField = getByRole("textbox", {name: /title/i})
    expect(titleField).toHaveAttribute("value", "")

    const notesField = getByRole("textbox", {name: /notes/i})
    expect(notesField).toHaveTextContent("")

    const daysField = getByRole("button", {name: /days/i})
    expect(daysField).toBeInTheDocument()

    const sessionsField = getByRole("button", {name: /sessions/i})
    expect(sessionsField).toBeInTheDocument()

    const saveButton = getByRole("button", {name: /save/i})
    expect(saveButton).toBeInTheDocument()

    const cancelButton = getByRole("button", {name: /cancel/i})
    expect(cancelButton).toBeInTheDocument()
  })
})