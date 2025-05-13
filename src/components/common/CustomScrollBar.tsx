import { FC, ReactNode } from 'react';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';

interface IProps extends ScrollbarProps {
    children: ReactNode;
    disabled?: boolean;
}

export const CustomScrollBar:FC<IProps> = (props) => {
    return (
        <Scrollbars
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
};

