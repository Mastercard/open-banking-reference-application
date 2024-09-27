import { Fragment, useEffect, useState } from 'react';
import { Grid, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import './CurlCommand.css';
import { getCurlCommandParameters } from './helper';

export default function CurlCommand({ product, requestData, body }: any) {
    const [curlCommandParameters, setCurlCommandParameters] = useState<any>({});
    const [curlCopyToolTip, setCurlCopyToolTip] =
        useState<string>('copy to clipboard');
    useEffect(() => {
        setCurlCommandParameters(
            getCurlCommandParameters(product, requestData, body)
        );
    }, [product]);

    /**
     * copy curl command to clipboard
     */
    const copyToClipBoard = async () => {
        setCurlCopyToolTip('copied!');
        navigator.clipboard.writeText(curlCommandParameters.command);
        setTimeout(() => {
            setCurlCopyToolTip('copy to clipboard');
        }, 2000);
    };
    return (
        <Fragment>
            <Grid>
                <Tooltip title={curlCopyToolTip} className='curl-copy'>
                    <ContentCopyIcon
                        className='float-right'
                        fontSize='small'
                        onClick={copyToClipBoard}
                        data-testid={'copyToClipBoard'}
                    ></ContentCopyIcon>
                </Tooltip>
                <div className='curl'>
                    <pre>
                        <code>
                            <span>
                                curl --location --request {product.requestType}{' '}
                                \
                            </span>
                            <br />
                            <span className='curl-value'>
                                {curlCommandParameters.url} \
                            </span>{' '}
                            <br />
                            {curlCommandParameters?.headers?.map(
                                (header: any, index: number, arr: string[]) => (
                                    <Fragment key={index + 0}>
                                        <span>
                                            --header{' '}
                                            <span className='curl-value'>
                                                '{header.key}: {header.value}' \
                                            </span>
                                        </span>
                                        {index < arr.length - 1 && <br />}
                                    </Fragment>
                                )
                            )}
                            {curlCommandParameters.dataRaw &&
                                Object.keys(curlCommandParameters?.dataRaw)
                                    .length > 0 && (
                                    <span>
                                        <br />
                                        --data-raw{' '}
                                        <span className='curl-value'>
                                            {JSON.stringify(
                                                curlCommandParameters.dataRaw,
                                                null,
                                                2
                                            )}
                                        </span>
                                    </span>
                                )}{' '}
                        </code>
                    </pre>
                </div>
            </Grid>

            <br />
        </Fragment>
    );
}
