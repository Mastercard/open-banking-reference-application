import { render } from '@testing-library/react'; //
import AlertBox from '../components/AlertBox/AlertBox';
describe('Testing AlertBox Component', () => {
    test('Should render AlertBox', () => {
        render((<AlertBox />) as React.ReactElement);
    });
});
