/**
 * @jest-environment jsdom
 */

import {
  render
} from "@testing-library/react"

import Error from "./Error"

describe("<Error/>", () => {
  it("displays the correct error message", () => {
    const message = "the correct error message"
    const {getByText} = render(<Error message={message}/>)
    expect(getByText(message)).toBeInTheDocument()
  })
})