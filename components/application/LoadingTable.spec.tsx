/**
 * @jest-environment jsdom
 */
import {
  render
} from "@testing-library/react"

import LoadingTable from "./LoadingTable"

describe("<LoadingTable/>", () => {
  it("should render properly with defaults", () => {
    const {getAllByRole} = render(<LoadingTable/>)
    expect(getAllByRole("columnheader")).toHaveLength(5)
    expect(getAllByRole("cell")).toHaveLength(20)
  })

  it("should render the expected number of rows and columns", () => {
    const rows = 3
    const columns = 3
    const {getAllByRole} = render(<LoadingTable rows={rows} columns={columns}/>)
    expect(getAllByRole("columnheader")).toHaveLength(columns)
    expect(getAllByRole("cell")).toHaveLength(rows * columns)
  })

  it ("should render without a header if specified", () => {
    const {getAllByRole, queryAllByRole} = render(<LoadingTable showHeader={false}/>)
    expect(queryAllByRole("columnheader")).toHaveLength(0)
    expect(getAllByRole("cell")).toHaveLength(20)
  })

  it("should render the expected number of rows and columns without a header if specified", () => {
    const rows = 3
    const columns = 3
    const {getAllByRole, queryAllByRole} = render(<LoadingTable rows={rows} columns={columns} showHeader={false}/>)
    expect(queryAllByRole("columnheader")).toHaveLength(0)
    expect(getAllByRole("cell")).toHaveLength(rows * columns)
  })
})