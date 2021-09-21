/**
 * @jest-environment jsdom
 */

import {
  render
} from "@testing-library/react"

import Navigation from "./Navigation"

jest.mock("../users/UserPicker", () => {
  return jest.fn(() => "user picker")
})

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(() => ({
      pathname: "/"
    }))
  }
})


describe("<Navigation/>", () => {
  it("should render", () => {
    const {getByText} = render(<Navigation/>)
    expect(getByText("Home")).toBeInTheDocument()
    expect(getByText("Bookables")).toBeInTheDocument()
    expect(getByText("Bookings")).toBeInTheDocument()
    expect(getByText("Users")).toBeInTheDocument()
    expect(getByText("user picker")).toBeInTheDocument()
  })
})