import { useEffect, useState } from "react"
import axios from 'axios'
import './Main.scss'

interface EventItem {
  coverThumb: string
  name: string
  addr1: string
  addr2: string
  payName: string
  location: string
}

export const Main = () => {

  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [noMessage, setNoMessage] = useState('현재 진행중인 행사가 없습니다.')

  const getList = () => {
    axios.get(`/event/?page=${page}&pageSize=${pageSize}`).then(res => {
      console.log('res:', res)
      setList(res.data.items)
    }).catch(error => {
      const errorMessage = '리스트를 불러오지 못했습니다.'
      console.log('error::', error)
      alert(errorMessage)
      setNoMessage(errorMessage)
    })
  }

  useEffect(() => {
    getList()
  },[])

  return (
    <>
      <h2>제주 특별자치도 전시문화행사정보</h2>
      <ul>
        {list && list.length ? (
          list.map((item: EventItem, index) => {
            return (
              <li key={index}>
                <div>
                  <div className="thumb">
                    <img src={`http://jejunolda.com/files/event/${item.coverThumb}`} alt={item.name} />
                  </div>
                  <p className='name'>{item.name}</p>
                  <p className='address'>{item.addr1} {item.addr2} {item.location}</p>
                  <p className='fee'>요금: {item.payName}</p>
                </div>
              </li>
            )
          })
        ) : (
          <li className='no-data'>{noMessage}</li>
        )}
      </ul>
    </>
  )
}