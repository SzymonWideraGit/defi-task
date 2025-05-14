import { forwardRef, ReactNode } from 'react';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';

interface IProps extends ScrollbarProps {
    children: ReactNode;
    disabled?: boolean;
};

export const CustomScrollBar = forwardRef<Scrollbars, IProps>((props, ref) => {
    return (
        <Scrollbars
            ref={ref}
            renderThumbVertical={({ style, ...props }) => (
                <div
                    {...props}
                    style={{
                        ...style,
                        backgroundColor: `rgba(255, 255, 255, 0.25)`,
                        borderRadius: '4px',
                    }}
                />
            )}
        >
        {props.children}
        </Scrollbars>
    );
});

