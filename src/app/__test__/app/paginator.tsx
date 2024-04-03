import { render, screen } from '@testing-library/react';
import Paginator from '@/app/paginator/page';

describe('Paginator', () => {
    beforeEach(() => {
    });

    it('should renders paginator', () => {
        render(<Paginator />);
        expect(screen.getByText("nombre"));
    });
});
