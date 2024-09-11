import { render } from '@testing-library/react';
import { ExternalIcon } from '../components';

describe('Testing ExternalIcon component', () => {
    test('Should render ExternalIcon', () => {
        render(
            (
                <ExternalIcon data={'#FFFFFF'} background={'#FFF'} />
            ) as React.ReactElement
        );
    });

    test('Should render ExternalIcon - 2', () => {
        render((<ExternalIcon background={'#FFF'} />) as React.ReactElement);
    });
});
