# react-paginator

> paginator component for react application

[![NPM](https://img.shields.io/npm/v/paginate-react.svg)](https://www.npmjs.com/package/paginate-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save paginate-react
```

## Usage

```tsx
import React, { Component } from 'react'

import { Pagination, PageData } from 'paginate-react'
import 'paginate-react/dist/index.css'

class Pagination extends Component {
  constructor() {
    this.state = {
      totalRecords: 100,
      pageLimit: 30,
      pageNeighbours: 1
    }
  }

  onPageChanged = (data: PageData) => {
    const { currentPage, pageLimit } = data
    // logic to fetch data as per the page goes below
  }

  render() {
    return (
      <Pagination
        totalRecords={this.state.totalRecords}
        onPageChanged={this.onPageChanged}
        pageLimit={this.state.pageLimit}
        pageNeighbours={this.state.pageNeighbours}
      />
    )
  }
}
```

The Pagination component can take four special props as specified in the propTypes object.

- onPageChanged is a function called with data of the current pagination state only when the current page changes.
- totalRecords indicates the total number of records to be paginated. It is required.
- pageLimit indicates the number of records to be shown per page. If not specified, it defaults to 30
- pageNeighbours indicates the number of additional page numbers to show on each side of the current page. The minimum value is 0, and the maximum value is 2. If not specified, it defaults to 0 as defined in the constructor().

# Demo

https://sayumani.github.io/react-paginator/

## License

MIT © [sayumani](https://github.com/sayumani)
