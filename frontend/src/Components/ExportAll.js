import React from 'react';
import { CSVLink } from 'react-csv';

function ExportAll(props) {

    const data = props.data;

    return (
        <div className='export-wrapper'>
            <CSVLink
                data={data}
                filename="results.csv"
                target="_blank"
                className='export_all-btn'
            >
                Export All
            </CSVLink>
        </div>
    )
}

export default ExportAll