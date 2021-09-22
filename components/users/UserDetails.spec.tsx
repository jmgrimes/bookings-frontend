/**
 * @jest-environment jsdom
 */
import {
  render
} from "@testing-library/react"

import {
  User
} from "../../features/users"

const user: User = {
  id: 1,
  name: "John Smith",
  title: "Test User in Test",
  notes: "John Smith is a test user in test."
}

import UserDetails from "./UserDetails"

describe("<UserDetails/>", () => {
  it("should render the user details properly", () => {
    const {getByText} = render(<UserDetails user={user}/>)
    expect(getByText(user.name)).toBeInTheDocument()
    expect(getByText(user.title)).toBeInTheDocument()
    expect(getByText(user.notes as string)).toBeInTheDocument()
  })
})