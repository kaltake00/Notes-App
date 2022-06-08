import React from 'react'
import { CSVLink } from 'react-csv';
import {AiOutlineDownload} from 'react-icons/ai'



function SingleExport(props) {
    const singleItem_data = props.data 
    var dataArr = [];
    dataArr.push(singleItem_data)

    //console.log(data)
    return (
        <>
            <CSVLink
                data={dataArr}
                filename={singleItem_data.title}
                target="_blank"
                className='export_item-btn'
            >
                <AiOutlineDownload />
            </CSVLink>
        </>
    )
}

export default SingleExport