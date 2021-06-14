import { useEffect, useState } from "react"
import axios from 'axios'
import './index.scss'
import moment from 'moment'

interface EventItem {
  coverThumb: string
  name: string
  addr1: string
  addr2: string
  payName: string
  location: string
  start: string
  end: string
}

export const Main = () => {

  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [noMessage, setNoMessage] = useState('현재 진행중인 행사가 없습니다.')

  const getList = () => {
    axios.get(`/event/?page=${page}&pageSize=${pageSize}`).then(res => {
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
    <div className='container'>
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
                  <div className="info">
                    <p className='name'>{item.name}</p>
                    <p className="time time-start">시작일: {moment(item.start).format('YYYY-MM-DD hh:mm')}</p>
                    {item.end && (
                      <p className="time time-end">종료일: {moment(item.end).format('YYYY-MM-DD hh:mm')}</p>
                    )}
                    <p className='address'>{item.addr1} {item.addr2} {item.location}</p>
                    <span className='fee'>요금: {item.payName}</span>
                  </div>
                </div>
              </li>
            )
          })
        ) : (
          <li className='no-data'>{noMessage}</li>
        )}
      </ul>
    </div>
  )
}