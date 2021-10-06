/**
 * @jest-environment jsdom
 */
import {
  render,
} from "@testing-library/react"

import Layout from "./Layout"

describe("Layout", () => {
  it("should render expected sidebar and main content properly", () => {
    const sidebar = "the expected sidebar content"
    const main = "the expected main content"
    const {getByText} = render(<Layout sidebar={sidebar} main={main}/>)
    expect(getByText(sidebar)).toBeInTheDocument()
    expect(getByText(main)).toBeInTheDocument()
  })
})