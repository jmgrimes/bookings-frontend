/**
 * @jest-environment jsdom
 */
import {
  render
} from "@testing-library/react"

import ErrorView from "./ErrorView"

describe("<ErrorView/>", () => {
  it("should display the correct title and message", () => {
    const title = "the correct title"
    const message = "the correct message"
    const {getByText} = render(<ErrorView title={title} message={message}/>)
    expect(getByText(title)).toBeInTheDocument()
    expect(getByText(message)).toBeInTheDocument()
  })
})