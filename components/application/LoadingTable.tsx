import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core"
import {
  Skeleton
} from "@material-ui/lab"
import {
  FunctionComponent
} from "react"

type LoadingTableProps = {
  showHeader?: boolean
  columns?: number
  rows?: number
}

const LoadingTable: FunctionComponent<LoadingTableProps> = (props) => {
  const {showHeader = true, columns = 5, rows = 4} = props
  return (
    <Table>
      {
        showHeader && (
          <TableHead>
            <TableRow key="header-row">
              { 
                [...Array(columns)].map((_, column) => (
                  <TableCell key={`header-row-column-${column}`} align="center" valign="middle">
                    <Skeleton variant="text" animation="wave"/>
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
        )
      }
      <TableBody>
        {
          [...Array(rows)].map((_, row) => (
            <TableRow key={`body-row-${row}`}>
              {
                [...Array(columns)].map((_, column) => (
                  <TableCell key={`body-row-${row}-column-${column}`} align="center" valign="middle">
                    <Skeleton variant="text" animation="wave"/>
                  </TableCell>
                ))
              }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

export default LoadingTable