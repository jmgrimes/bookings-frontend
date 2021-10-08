/**
 * @jest-environment jsdom
 */
import {
  MockedProvider,
} from "@apollo/client/testing"
import {
  act,
  fireEvent,
  render,
} from "@testing-library/react"
import {
  FunctionComponent,
} from "react"

import {
  Bookable,
  BookableDayEnum,
  BookableSessionEnum,
} from "../../features/bookables"
import {
  UseCreateBookableMutation
} from "../../features/bookables/useCreateBookable"

import BookableNew from "./BookableNew"

const useRouter = jest.spyOn(require("next/router"), "useRouter")
const push = jest.fn()

const bookable: Bookable = {
  id: 1,
  group: "Rooms",
  title: "Test Room",
  notes: "Test Room Notes",
  days: [
    BookableDayEnum.Saturday,
  ],
  sessions: [
    BookableSessionEnum.Evening,
  ],
}

const flushAllPromises = () => new Promise<void>(resolve => setTimeout(resolve, 0))

const mocks = [
  {
    request: {
      query: UseCreateBookableMutation,
      variables: {
        group: bookable.group,
        title: bookable.title,
        notes: bookable.notes,
        days: bookable.days,
        sessions: bookable.sessions,
      },
    },
    result: {
      data: {
        createBookable: bookable,
      },
    },
  },
]

const BookableNewTest: FunctionComponent = () => {
  return (
    <MockedProvider mocks={mocks}>
      <BookableNew/>
    </MockedProvider>
  )
}

describe("<BookableNew/>", () => {
  beforeAll(() => {
    useRouter.mockReturnValue({
      push,
    })
  })

  it("should render the new bookable form state properly", async () => {
    const {getByText} = render(<BookableNewTest/>)
    await act(async () => await flushAllPromises())
    expect(getByText("New Bookable")).toBeInTheDocument()
  })

  it("should redirect to the bookable view on cancel", async () => {
    const {getByRole} = render(<BookableNewTest/>)
    await act(async () => await flushAllPromises())
    act(() => {
      getByRole("button", { name: /cancel/i, }).click()
    })
    await act(async () => await flushAllPromises())
    expect(push).toBeCalledWith(`/bookables`)
  })

  it("should create the a new bookable and redirect to it on save", async () => {
    const {getByRole, getByText} = render(<BookableNewTest/>)
    await act(async () => await flushAllPromises())
    act(() => {
      fireEvent.input(
        getByRole("textbox", { name: /group/i, }),
        { target: { value: bookable.group, }, }
      )
      fireEvent.input(
        getByRole("textbox", { name: /title/i, }),
        { target: { value: bookable.title, }, }
      )
      fireEvent.input(
        getByRole("textbox", { name: /notes/i, }),
        { target: { value: bookable.notes, }, }
      )
    })
    fireEvent.mouseDown(getByRole("button", { name: /days/i, }))
    act(() => {
      // FIXME multiple selections don't seem to be working correctly from the testing library
      bookable.days.forEach(day => getByText(day).click())
    })
    fireEvent.keyDown(getByRole("presentation"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    })
    fireEvent.mouseDown(getByRole("button", { name: /sessions/i, }))
    act(() => {
      // FIXME multiple selections don't seem to be working correctly from the testing library
      bookable.sessions.forEach(session => getByText(session).click())
    })
    fireEvent.keyDown(getByRole("presentation"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    })
    act(() => {
      getByRole("button", { name: /save/i, }).click()
    })
    await act(async () => await flushAllPromises())
    expect(push).toBeCalledWith(`/bookables/${bookable.id}`)
  })
})