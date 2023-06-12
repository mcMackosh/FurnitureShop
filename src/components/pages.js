import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'


export const PagesAdminFurniture = observer(() => {

    const {shop} = useContext(Context)
    const pageCount = Math.ceil(shop.totalCountAdminFurniture / shop.limitAdminFurniture)
    const pages = []


    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <Pagination className="mt-5 middle"  >
            {pages.map(page => <Pagination.Item
             key={page}
             active={shop.pageAdminFurniture === page}
             onClick={() => shop.setPageAdminFurniture(page)}>{page}</Pagination.Item>)}
        </Pagination>
       
    )
})

export const PagesMain = observer(() => {

    const {shop} = useContext(Context)
    const pageCount = Math.ceil(shop.totalCountMain / shop.limitMain)
    const pages = []


    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <Pagination className="mt-5 middle"  >
            {pages.map(page => <Pagination.Item
             key={page}
             active={shop.pageMain === page}
             onClick={() => shop.setPageMain(page)}>{page}</Pagination.Item>)}
        </Pagination>
       
    )
})