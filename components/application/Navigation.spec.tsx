/**
 * @jest-environment jsdom
 */
import {
  render,
} from "@testing-library/react"

import Navigation from "./Navigation"

const useRouter = jest.spyOn(require("next/router"), "useRouter")
const UserPicker = jest.spyOn(require("../users/UserPicker"), "default")

const UserPickerText = "<UserPicker/>"

describe("<Navigation/>", () => {
  it("should render", () => {
    UserPicker.mockReturnValueOnce(UserPickerText)
    useRouter.mockReturnValueOnce({pathname: "/"})
    const {getByText} = render(<Navigation/>)
    expect(getByText("Home")).toBeInTheDocument()
    expect(getByText("Bookables")).toBeInTheDocument()
    expect(getByText("Bookings")).toBeInTheDocument()
    expect(getByText("Users")).toBeInTheDocument()
    expect(getByText(UserPickerText)).toBeInTheDocument()
  })
})