import { connectFormModel } from './connectFormModel';
const {
    formField: { userName },
} = connectFormModel;

const connectFormInitialValues = {
    [userName.name]: '',
};

export default connectFormInitialValues;
