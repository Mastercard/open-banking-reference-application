import { Card, CardContent, Typography } from '@mui/material';

import './SandBoxTip.css';
import data from './data';

export default function SandBoxTip() {
    return (
        <Card className='mt-[40px] mb-[40px] rounded-lg !bg-gray-01 !shadow-none'>
            <CardContent className='!p-6 bg-sandbox'>
                <Typography className='!mb-2 text-xl !font-[700] leading-6 tracking-wider !text-gray-500'>
                    SANDBOX TIP:
                </Typography>

                <Typography className='!mb-6 text-gray-700 text-base font-normal leading-5'>
                    {data.text.tip}
                </Typography>

                <div className='flex items-start'>
                    <div className='flex flex-col items-start gap-4 w-1/3'>
                        <Typography className='mb-2 text-base !font-[700]'>
                            Institution
                        </Typography>
                        <div className='w-24 h-12'>
                            <img src='/finbank.svg' alt='' />
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-4 w-1/3'>
                        <Typography className='mb-2 text-base !font-[700]'>
                            {data.text.usernameField}
                        </Typography>
                        <Typography className='text-base'>
                            {data.text.usernameValue}
                        </Typography>
                    </div>

                    <div className='flex flex-col items-start gap-4 w-1/3'>
                        <Typography className='mb-2 text-base !font-[700]'>
                            Banking Password
                        </Typography>
                        <Typography className='text-base'>
                            profile_02
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
