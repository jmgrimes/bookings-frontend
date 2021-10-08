/**
 * @jest-environment jsdom
 */
import {
  act,
  fireEvent,
  render,
  within,
} from "@testing-library/react"

import {
  Bookable,
  BookableDayEnum,
  BookableSessionEnum,
} from "../../features/bookables"

import BookableForm from "./BookableForm"

const bookable: Bookable = {
  id: 1,
  group: "Rooms",
  title: "Test Room",
  notes: "Test Room Notes",
  days: [
    BookableDayEnum.Sunday,
    BookableDayEnum.Saturday,
  ],
  sessions: [
    BookableSessionEnum.Morning,
    BookableSessionEnum.Evening,
  ],
}

const newBookable: Bookable = {
  id: 0,
  group: "",
  title: "",
  notes: "",
  days: [],
  sessions: [],
}

const flushAllPromises = () => new Promise<void>(resolve => setTimeout(resolve, 0))

const escapeKey = {
  key: "Escape",
  code: "Escape",
  keyCode: 27,
  charCode: 27,
}

const onSave = jest.fn()
const onDelete = jest.fn()
const onCancel = jest.fn()

describe("<BookableForm/>", () => {
  beforeEach(() => {
    onSave.mockReset()
    onDelete.mockReset()
    onCancel.mockReset()
  })

  it("should render a new bookable title when no onDelete is specified", async () => {
    const {getByRole, getByText, queryByRole} = render(
      <BookableForm bookable={newBookable} onCancel={onCancel} onSave={onSave}/>
    )
    await act(() => flushAllPromises())

    const title = getByText(/New Bookable/)
    expect(title).toBeInTheDocument()

    const groupField = getByRole("textbox", {name: /group/i})
    expect(groupField).toHaveAttribute("value", newBookable.group)

    const titleField = getByRole("textbox", {name: /title/i})
    expect(titleField).toHaveAttribute("value", newBookable.title)

    const notesField = getByRole("textbox", {name: /notes/i})
    expect(notesField).toHaveTextContent(newBookable.notes as string)

    const daysField = getByRole("button", {name: /days/i})
    expect(daysField).toBeInTheDocument()

    const sessionsField = getByRole("button", {name: /sessions/i})
    expect(sessionsField).toBeInTheDocument()

    const saveButton = getByRole("button", {name: /save/i})
    expect(saveButton).toBeInTheDocument()

    const deleteButton = queryByRole("button", {name: /delete/i})
    expect(deleteButton).not.toBeInTheDocument()

    const cancelButton = getByRole("button", {name: /cancel/i})
    expect(cancelButton).toBeInTheDocument()
  })

  it("should render an edit bookable title when onDelete is specified", async () => {
    const {getByRole, getByText} = render(
      <BookableForm bookable={bookable} onCancel={onCancel} onSave={onSave} onDelete={onDelete}/>
    )
    await act(() => flushAllPromises())

    const title = getByText(/Edit Bookable/)
    expect(title).toBeInTheDocument()

    const groupField = getByRole("textbox", {name: /group/i})
    expect(groupField).toHaveAttribute("value", bookable.group)

    const titleField = getByRole("textbox", {name: /title/i})
    expect(titleField).toHaveAttribute("value", bookable.title)

    const notesField = getByRole("textbox", {name: /notes/i})
    expect(notesField).toHaveTextContent(bookable.notes as string)

    const daysField = getByRole("button", {name: /days/i})
    expect(daysField).toHaveTextContent(bookable.days.join(", "))

    const sessionsField = getByRole("button", {name: /sessions/i})
    expect(sessionsField).toHaveTextContent(bookable.sessions.join(", "))
  })

  it("should call onCancel when the cancel button is clicked", async () => {
    const {getByRole} = render(
      <BookableForm bookable={newBookable} onCancel={onCancel} onSave={onSave}/>
    )
    await act(() => flushAllPromises())

    const cancelButton = getByRole("button", {name: /cancel/i})
    act(() => {
      cancelButton.click()
    })

    await act(() => flushAllPromises())
    expect(onCancel).toHaveBeenCalled()
  })

  it("should call onDelete when the delete button is clicked", async () => {
    const {getByRole} = render(
      <BookableForm bookable={bookable} onCancel={onCancel} onSave={onSave} onDelete={onDelete}/>
    )
    await act(() => flushAllPromises())

    const deleteButton = getByRole("button", {name: /delete/i})
    act(() => {
      deleteButton.click()
    })

    await act(() => flushAllPromises())
    expect(onDelete).toHaveBeenCalled()
  })

  it("should not call onSave if the form is invalid when the save button is clicked", async () => {
    const {getByRole} = render(
      <BookableForm bookable={newBookable} onCancel={onCancel} onSave={onSave}/>
    )
    await act(() => flushAllPromises())

    const saveButton = getByRole("button", {name: /save/i})
    act(() => saveButton.click())

    await act(() => flushAllPromises())
    expect(onSave).not.toHaveBeenCalled()
  })

  it("should call onSave if the form is valid when the save button is clicked", async () => {
    const {getByRole} = render(
      <BookableForm bookable={newBookable} onCancel={onCancel} onSave={onSave}/>
    )
    await act(() => flushAllPromises())

    const groupField = getByRole("textbox", {name: /group/i})
    act(() => {
      fireEvent.input(groupField, {target: {value: bookable.group}})
    })
    expect(groupField).toHaveAttribute("value", bookable.group)

    const titleField = getByRole("textbox", {name: /title/i})
    act(() => {
      fireEvent.input(titleField, {target: {value: bookable.title}})
    })
    expect(titleField).toHaveAttribute("value", bookable.title)

    const notesField = getByRole("textbox", {name: /notes/i})
    act(() => {
      fireEvent.input(notesField, {target: {value: bookable.notes}})
    })
    expect(notesField).toHaveTextContent(bookable.notes as string)

    const daysField = getByRole("button", {name: /days/i})
    act(() => {
      fireEvent.mouseDown(daysField)
    })
    const daysOptions = getByRole("listbox", {name: /days/i})
    expect(daysOptions).toBeInTheDocument()
    bookable.days.forEach(day => act(() => within(daysOptions).getByText(day).click()))
    expect(daysField).toHaveTextContent(bookable.days.join(", "))
    act(() => {
      fireEvent.keyDown(getByRole("presentation"), escapeKey)
    })

    const sessionsField = getByRole("button", {name: /sessions/i})
    act(() => {
      fireEvent.mouseDown(sessionsField)
    })
    const sessionsOptions = getByRole("listbox", {name: /sessions/i})
    expect(sessionsOptions).toBeInTheDocument()
    bookable.sessions.forEach(session => act(() => within(sessionsOptions).getByText(session).click()))
    expect(sessionsField).toHaveTextContent(bookable.sessions.join(", "))
    act(() => {
      fireEvent.keyDown(getByRole("presentation"), escapeKey)
    })
    const saveButton = getByRole("button", {name: /save/i})
    act(() => {
      saveButton.click()
    })

    await act(() => flushAllPromises())
    expect(onSave).toHaveBeenCalled()
  })
})
