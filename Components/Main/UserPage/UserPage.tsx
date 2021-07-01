import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    selectIsFetching,
    selectUsers,
    selectTotalUserCount,
    selectPageSize,
    selectPageNumber,
    selectFilter,
    selectFollowingInProgress
} from "../../../Redux/selectors/user-selector";
import { FilterType, getUsers } from "../../../Redux/User-Reducer";
import { Paginator } from "../../Common/Peginator/Paginator";
import { Preloader } from "../../Common/Preloader/Preloader";
import { FilterForm } from "./FilterForm/FilterForm";
import { User } from "./User/User"
import s from './UsersPage.module.scss';
import queryString from 'query-string'
import { selectIsAuth } from "../../../Redux/selectors/auth-selector";



export const UsersPage: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const history = useHistory()
    const isAuth = useSelector(selectIsAuth) 

    const users = useSelector(selectUsers)
    const isFetching = useSelector(selectIsFetching)
    const totalUserCount = useSelector(selectTotalUserCount)
    const pageSize = useSelector(selectPageSize)
    const pageNumber = useSelector(selectPageNumber)
    const filter = useSelector(selectFilter)
    const followingInProgress = useSelector(selectFollowingInProgress)


    type UrlDataType = {
        friend?: string
        term?: string
        page?: string | number
    }

    useEffect(() => {
        const urlData = queryString.parse(history.location.search) as UrlDataType
        let actualPageNumber = pageNumber
        let actualFilter = filter

        if (urlData.page) actualPageNumber = Number(urlData.page);
        if (urlData.term && urlData.term !== '') actualFilter = { ...actualFilter, term: urlData.term }
        if (urlData.friend) actualFilter = { ...actualFilter, friend: urlData.friend === 'true' ? true : false }

        dispatch(getUsers(actualPageNumber, pageSize, actualFilter))
    }, [])

    useEffect(() => {

        let urlData: UrlDataType = {}

        if (pageNumber !== 1) urlData.page = String(pageNumber)
        if (filter.term !== '') urlData.term = filter.term
        if (filter.friend !== null) urlData.friend = String(filter.friend)

        history.push({
            pathname: '/users',
            search: queryString.stringify(urlData)
        })
    }, [filter, pageNumber, history])

    const onPageChangeHandler = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))

    }
    const onFilterHandler = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))

    }

    const usersElements = users.map((u) => <User isAuth={isAuth} followingInProgress={followingInProgress} key={u.id} id={u.id} userName={u.name}
        photos={u.photos} status={u.status} followed={u.followed} />)

    return (
        <div className={s.usersPage}>
            <div className={s.userPageTopBlock}>
                <div className={s.usersHeader}>
                    Users
                </div>
                <div>
                    {isFetching && <Preloader styles={'usersPre'} />}
                </div>
            </div>
            <div>
                <FilterForm onFilterHandler={onFilterHandler} />
            </div>
            <div>
                <Paginator pageSize={pageSize} pageNumber={pageNumber} onPageChangeHandler={onPageChangeHandler} totalItemsCount={totalUserCount} />
            </div>
            {usersElements.length === 0 
            ? <div className={s.notFound}>not Found</div> 
            : usersElements }
        </div>
    )
})