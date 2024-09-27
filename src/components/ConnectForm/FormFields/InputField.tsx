import { at } from 'lodash';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';

export default function InputField(props: any) {
    const { ...rest } = props;
    const [field, meta] = useField(props);
    const isError = true;
    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    }

    return (
        <TextField
            inputProps={{ 'data-testid': 'customer-input' }}
            type='text'
            size='small'
            sx={{ width: 'auto' }}
            error={meta.touched && meta.error && isError}
            helperText={_renderHelperText()}
            {...field}
            {...rest}
        />
    );
}
