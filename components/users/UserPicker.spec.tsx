/**
 * @jest-environment jsdom
 */

import {
  MockedProvider
} from "@apollo/client/testing"
import {
  act, render
} from "@testing-library/react"

import {
  User
} from "../../features/users"
import {
  UseUsersQuery
} from "../../features/users/useUsers"

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

const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0))

import UserPicker from "./UserPicker"
import UserProvider from "./UserProvider"

describe("<UserPicker/>", () => {
  it("should render the completed state properly", async () => {
    const mocks = [
      {
        request: { query: UseUsersQuery },
        result: {
          data: { users: [john, jane] }
        }
      }
    ]
    const {getByText} = render(
      <MockedProvider mocks={mocks}>
        <UserProvider>
          <UserPicker/>
        </UserProvider>
      </MockedProvider>
    )
    await act(async () => await flushAllPromises())
    expect(getByText(john.name)).toBeInTheDocument()
  })

  it("should render the error state properly", async () => {
    const mocks = [
      {
        request: { query: UseUsersQuery },
        error: new Error("could not load users")
      }
    ]
    const {getByText} = render(
      <MockedProvider mocks={mocks}>
        <UserProvider>
          <UserPicker/>
        </UserProvider>
      </MockedProvider>
    )
    await act(async () => await flushAllPromises())
    expect(getByText(mocks[0].error.message)).toBeInTheDocument()
  })
})