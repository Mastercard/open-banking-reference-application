import * as yup from 'yup';
import { connectFormModel } from './connectFormModel';

const {
    formField: { userName },
} = connectFormModel;

const connectFormValidation = [
    yup.object().shape({
        [userName.name]: yup.string().required(`${userName.requiredErrorMsg}`),
    }),
];
export default connectFormValidation;
