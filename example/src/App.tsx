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
  pageLimit?: number
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      totalRecords: 0,
      currentPage: 0,
      list: [],
      currentList: [],
      pageLimit: 25
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
    const res = await axios.get('https://jsonplaceholder.typicode.com/photos')
    this.setState({
      list: res.data,
      currentList: res.data.slice(0, 30),
      totalRecords: res.data.length
    })
  }

  handleChange = (evt: React.FormEvent<HTMLSelectElement>) => {
    const { value } = evt.currentTarget
    this.setState({
      pageLimit: +value,
      currentList: this.state.list.slice(0, +value)
    })
  }

  render() {
    const tRow = this.state.currentList.map((item: any, index: number) => {
      return (
        <tr key={index}>
          <td>{item.albumId}</td>
          <td>{item.title}</td>
          <td>{item.url}</td>
        </tr>
      )
    })
    return (
      <div>
        <div className='container'>
          <label className='label'>PageLimit</label>
          <select
            className='select'
            value={this.state.pageLimit}
            onChange={this.handleChange}
          >
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>AlbumId</th>
                <th>Title</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>{tRow}</tbody>
          </table>
        </div>
        <Pagination
          totalRecords={this.state.totalRecords}
          onPageChanged={this.onPageChanged}
          pageLimit={this.state.pageLimit}
          pageNeighbours={2}
        />
      </div>
    )
  }
}

export default App
