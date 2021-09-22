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
  FunctionComponent,
  useEffect
} from "react"

import UserProvider from "./UserProvider"
import UsersView from "./UsersView"
import {
  User,
  useUser
} from "../../features/users"
import {
  UseUsersQuery
} from "../../features/users/useUsers"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

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

type UsersViewWithUserProps = {
  user?: User
}

const UsersViewWithUser: FunctionComponent<UsersViewWithUserProps> = (props) => {
  const {user} = props
  const [_, setCurrentUser] = useUser()

  useEffect(
    () => setCurrentUser(user),
    [user, setCurrentUser]
  )

  return <UsersView/>
}

type UsersViewTestProps = {
  user?: User
  users?: User[]
}

const UsersViewTest: FunctionComponent<UsersViewTestProps> = (props) => {
  const {user, users} = props
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
        <UsersViewWithUser user={user}/>
      </UserProvider>
    </MockedProvider>
  )
}

describe("<UsersView/>", () => {
  it("should render the completed state properly with no current or path user", async () => {
    useRouter.mockReturnValueOnce({
      pathname: "/users",
      query: {}
    })
    const {getByText, getAllByText} = render(<UsersViewTest users={[john, jane]}/>)
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
    const {getByText, getAllByText} = render(<UsersViewTest user={jane} users={[john, jane]}/>)
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
    const {getByText, getAllByText} = render(<UsersViewTest user={john} users={[john, jane]}/>)
    await act(async () => await flushAllPromises())
    expect(getAllByText(jane.name)).toHaveLength(2)
    expect(getByText(jane.title)).toBeInTheDocument()
    expect(getByText(jane.notes as string)).toBeInTheDocument()
    expect(getByText(john.name)).toBeInTheDocument()
  })

  it("should render the error state properly", async () => {
    const {getByText} = render(<UsersViewTest/>)
    await act(async () => await flushAllPromises())
    expect(getByText("An error occurred while loading users.")).toBeInTheDocument()
    expect(getByText(errorMessage)).toBeInTheDocument()
  })
})