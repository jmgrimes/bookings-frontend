/**
 * @jest-environment jsdom
 */

import {
  render
} from "@testing-library/react"

import UsersList from "./UsersList"
import {
  User
} from "../../features/users"

const john: User = {
  id: 1,
  name: "John Smith",
  title: "Test User in Test",
  notes: "John Smith is a test user in test."
}

const jane: User = {
  id: 2,
  name: "Jane Smith",
  title: "Test User in Test",
  notes: "Jane Smith is a test user in test."
}

describe("<UsersList/>", () => {
  it("should render the user details properly", () => {
    const {getByText} = render(
      <UsersList users={[john, jane]} user={john} getUrl={id => id.toString(10)}/>
    )
    expect(getByText(john.name)).toBeInTheDocument()
    expect(getByText(jane.name)).toBeInTheDocument()
  })
})