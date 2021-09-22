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

const useRouter = jest.spyOn(require("next/router"), "useRouter")
const useUser = jest.spyOn(require("../../features/users/useUser"), "default")

const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0))

import UsersView from "./UsersView"

describe("<UsersView/>", () => {
  it("should render the completed state properly with no current or path user", async () => {
    useRouter.mockReturnValueOnce({
      pathname: "/users",
      query: {}
    })
    useUser.mockReturnValueOnce([undefined, jest.fn()])
    const mocks = [
      {
        request: { query: UseUsersQuery },
        result: {
          data: { users: [john, jane] }
        }
      }
    ]
    const {getByText, getAllByText} = render(
      <MockedProvider mocks={mocks}>
        <UsersView/>
      </MockedProvider>
    )
    await act(async () => await flushAllPromises())
    expect(getByText(jane.name)).toBeInTheDocument()
    expect(getAllByText(john.name)).toHaveLength(2)
    expect(getByText(john.title)).toBeInTheDocument()
    expect(getByText(john.notes as string)).toBeInTheDocument()
  })

  it("should render the completed state properly with a current user and no path user", async () => {
    useRouter.mockReturnValueOnce({
      pathname: "/users",
      query: {}
    })
    useUser.mockReturnValueOnce([jane, jest.fn()])
    const mocks = [
      {
        request: { query: UseUsersQuery },
        result: {
          data: { users: [john, jane] }
        }
      }
    ]
    const {getByText, getAllByText} = render(
      <MockedProvider mocks={mocks}>
        <UsersView/>
      </MockedProvider>
    )
    await act(async () => await flushAllPromises())
    expect(getAllByText(jane.name)).toHaveLength(2)
    expect(getByText(jane.title)).toBeInTheDocument()
    expect(getByText(jane.notes as string)).toBeInTheDocument()
    expect(getByText(john.name)).toBeInTheDocument()
  })

  it("should render the completed state properly with a path user", async () => {
    useRouter.mockReturnValueOnce({
      pathname: "/users/[id]",
      query: {
        id: "2"
      }
    })
    useUser.mockReturnValueOnce([john, jest.fn()])
    const mocks = [
      {
        request: { query: UseUsersQuery },
        result: {
          data: { users: [john, jane] }
        }
      }
    ]
    const {getByText, getAllByText} = render(
      <MockedProvider mocks={mocks}>
        <UsersView/>
      </MockedProvider>
    )
    await act(async () => await flushAllPromises())
    expect(getAllByText(jane.name)).toHaveLength(2)
    expect(getByText(jane.title)).toBeInTheDocument()
    expect(getByText(jane.notes as string)).toBeInTheDocument()
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
        <UsersView/>
      </MockedProvider>
    )
    await act(async () => await flushAllPromises())
    expect(getByText("An error occurred while loading users.")).toBeInTheDocument()
    expect(getByText(mocks[0].error.message)).toBeInTheDocument()
  })
})