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
  FunctionComponent
} from "react"

import UserPicker from "./UserPicker"
import UserProvider from "./UserProvider"
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

const errorMessage = "could not load users"

const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0))

type UserPickerTestProps = {
  users?: User[]
}

const UserPickerTest: FunctionComponent<UserPickerTestProps> = (props) => {
  const {users} = props
  const mocks =
    users ?
    [{
      request: { query: UseUsersQuery },
      result: {
        data: { users }
      }
    }] :
    [{
      request: { query: UseUsersQuery },
      error: new Error(errorMessage)
    }]

  return (
    <MockedProvider mocks={mocks}>
      <UserProvider>
        <UserPicker/>
      </UserProvider>
    </MockedProvider>
  )
}

describe("<UserPicker/>", () => {
  it("should render the completed state properly and select the first user from the list", async () => {
    const {getByText} = render(<UserPickerTest users={[john, jane]}/>)
    await act(async () => await flushAllPromises())
    expect(getByText(john.name)).toBeInTheDocument()
  })

  it("should render the completed state properly and select the first user from the list", async () => {
    const {getByText} = render(<UserPickerTest users={[jane, john]}/>)
    await act(async () => await flushAllPromises())
    expect(getByText(jane.name)).toBeInTheDocument()
  })

  it("should render the error state properly", async () => {
    const mocks = [
      {
        request: { query: UseUsersQuery },
      }
    ]
    const {getByText} = render(<UserPickerTest/>)
    await act(async () => await flushAllPromises())
    expect(getByText(errorMessage)).toBeInTheDocument()
  })
})