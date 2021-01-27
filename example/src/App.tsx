import React from 'react'
import { Pagination, PageData } from 'react-paginator'
import axios from '../node_modules/axios'
import 'react-paginator/dist/index.css'
interface Props {}
interface State {
  totalRecords: number
  list: any[]
  currentList: any[]
  currentPage: number
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      totalRecords: 0,
      currentPage: 0,
      list: [],
      currentList: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  onPageChanged = (data: PageData) => {
    const { list } = this.state
    const { currentPage, pageLimit } = data
    const offset = (currentPage - 1) * pageLimit
    const currentList = list.slice(offset, offset + pageLimit)
    this.setState({ currentPage, currentList })
  }

  async fetchData() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    this.setState({
      list: res.data,
      currentList: res.data.slice(0, 30),
      totalRecords: res.data.length
    })
  }
  render() {
    const data = this.state.currentList.map((item: any, index: number) => {
      return <pre key={index}>{JSON.stringify(item, null, 2)}</pre>
    })
    return (
      <div>
        <Pagination
          totalRecords={this.state.totalRecords}
          onPageChanged={this.onPageChanged}
        />
        {data}
      </div>
    )
  }
}

export default App
