import { render, screen } from '@testing-library/react';
import CircularProgressWithValue from '../components/CircularProgressWithValue/CircularProgressWithValue';

describe('Testing CircularProgressWithValue  Component', () => {
    test('Should render CircularProgressWithValue', () => {
        render(
            (
                <CircularProgressWithValue
                    sx={{
                        marginLeft: '10px',
                        color: 'inherit',
                    }}
                    value={60}
                />
            ) as React.ReactElement
        );
        const progressBar = screen.getByTestId('progressBar');
        expect(progressBar).toBeInTheDocument();
    });
});
