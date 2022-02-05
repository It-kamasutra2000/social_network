type UrlDataType = {
    friend?: string
    term?: string
    page?: string | number
}


type FilterFormPropsType = {
    onFilterHandler: (filter: FilterType) => void
}
