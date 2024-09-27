import ReactJson from 'react-json-view';

import './JsonViewer.css';

export default function JsonViewer({ jsonData }: any) {
    return (
        <div className='json'>
            <ReactJson
                src={jsonData}
                theme='monokai'
                displayDataTypes={false}
                displayObjectSize={false}
                quotesOnKeys={false}
                name={false}
            />
        </div>
    );
}
