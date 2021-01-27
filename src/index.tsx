import React, { Component, Fragment, MouseEvent } from 'react'
import bootstrapStyle from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
interface Props {
  totalRecords: number
  pageLimit?: number
  pageNeighbours?: number
  onPageChanged: (params: PageData) => void
}

interface PageData {
  currentPage: number
  pageLimit: number
  totalRecords: number
  totalPages: number
}
interface State {
  totalRecords: number
  pageLimit: number
  pageNeighbours: number
  currentPage: number
  totalPages: number
}
const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const range = (from: number, to: number, step = 1): any[] => {
  let i = from
  const range = []
  while (i <= to) {
    range.push(i)
    i += step
  }
  return range
}
class Pagination extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    let { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props
    pageLimit = typeof pageLimit === 'number' ? pageLimit : 30
    totalRecords = typeof totalRecords === 'number' ? totalRecords : 0
    // pageNeighbours can be: 0, 1 or 2
    pageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0
    const totalPages = Math.ceil(totalRecords / pageLimit)
    // const initialState: State = {
    //   currentPage: 1,
    //   pageLimit,
    //   totalRecords,
    //   pageNeighbours,
    //   totalPages
    // }
    const initialState: State = {
      currentPage: 0,
      pageLimit: 30,
      totalRecords: 0,
      pageNeighbours: 0,
      totalPages: 0
    }
    this.state = initialState
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.totalRecords !== this.props.totalRecords ||
      prevProps.pageLimit !== this.props.pageLimit
    ) {
      let {
        totalRecords = null,
        pageLimit = 30,
        pageNeighbours = 0
      } = this.props
      pageLimit = typeof pageLimit === 'number' ? pageLimit : 30
      totalRecords = typeof totalRecords === 'number' ? totalRecords : 0
      // pageNeighbours can be: 0, 1 or 2
      pageNeighbours =
        typeof pageNeighbours === 'number'
          ? Math.max(0, Math.min(pageNeighbours, 2))
          : 0
      const totalPages = Math.ceil(totalRecords / pageLimit)
      const currentPage =
        prevProps.pageLimit !== this.props.pageLimit
          ? 1
          : this.state.currentPage
      this.setState({
        currentPage,
        pageLimit,
        totalRecords,
        pageNeighbours,
        totalPages
      })
    }
  }
  fetchPageNumbers = () => {
    const { totalPages, currentPage, pageNeighbours } = this.state

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let pages = range(startPage, endPage)

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }
    return range(1, totalPages)
  }

  componentDidMount() {
    this.gotoPage(1)
  }

  gotoPage = (page: number) => {
    const { onPageChanged = (f) => f } = this.props
    const currentPage = Math.max(0, Math.min(page, this.state.totalPages))
    const paginationData = {
      currentPage,
      totalPages: this.state.totalPages,
      pageLimit: this.state.pageLimit,
      totalRecords: this.state.totalRecords
    }

    this.setState({ currentPage }, () => onPageChanged(paginationData))
  }

  handleClick = (page: number) => (evt: MouseEvent) => {
    evt.preventDefault()
    this.gotoPage(page)
  }

  handleMoveLeft = (evt: MouseEvent) => {
    evt.preventDefault()
    this.gotoPage(this.state.currentPage - this.state.pageNeighbours * 2 - 1)
  }

  handleMoveRight = (evt: MouseEvent) => {
    evt.preventDefault()
    this.gotoPage(this.state.currentPage + this.state.pageNeighbours * 2 + 1)
  }

  render() {
    if (!this.state.totalRecords || this.state.totalPages === 1) return null
    console.log(this.state)

    const { currentPage } = this.state
    const pages = this.fetchPageNumbers()

    return (
      <Fragment>
        <nav aria-label='Pagination'>
          <ul className={bootstrapStyle.pagination}>
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className={bootstrapStyle['page-item']}>
                    <a
                      className={bootstrapStyle['page-link']}
                      href='#'
                      aria-label='Previous'
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden='true'>&laquo;</span>
                      <span className='sr-only'>Previous</span>
                    </a>
                  </li>
                )

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className={bootstrapStyle['page-item']}>
                    <a
                      className={bootstrapStyle['page-link']}
                      href='#'
                      aria-label='Next'
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden='true'>&raquo;</span>
                      <span className='sr-only'>Next</span>
                    </a>
                  </li>
                )

              return (
                <li
                  key={index}
                  className={
                    currentPage === page
                      ? `${bootstrapStyle['page-item']} ${bootstrapStyle['active']}`
                      : `${bootstrapStyle['page-item']}`
                  }
                >
                  <a
                    className={bootstrapStyle['page-link']}
                    href='#'
                    onClick={this.handleClick(page)}
                  >
                    {page}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </Fragment>
    )
  }
}

export { Pagination, PageData }
