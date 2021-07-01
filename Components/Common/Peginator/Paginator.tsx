import { Pagination } from "antd";
import React from "react";
import s from './Paginator.module.scss';

type PropsType = {
  totalItemsCount: number
  pageSize?: number
  onPageChangeHandler: (pageNumber: number) => void
  pageNumber: number
}

export const Paginator: React.FC<PropsType> = React.memo(({
  totalItemsCount,
  pageSize = 10,
  onPageChangeHandler,
  pageNumber
}) => {

  const pagesCount = totalItemsCount / pageSize

  const onChange = (currentPageNumber: number) => {
    onPageChangeHandler(currentPageNumber)
  }
  return (
    <div className={s.paginator}>
      <Pagination defaultCurrent={pageNumber} size={'small'} current={pageNumber} total={pagesCount * 10} onChange={onChange} />
    </div>
  )
})



