import * as yup from 'yup';
import { connectFormModel } from './connectFormModel';

const {
    formField: { userName },
} = connectFormModel;

const connectFormValidation = [
    yup.object().shape({
        [userName.name]: yup
            .string()
            .required(`${userName.requiredErrorMessage}`)
            .matches(/.\w{5,256}$/, userName.requirementMessage),
    }),
];
export default connectFormValidation;
