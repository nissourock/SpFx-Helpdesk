/// <reference types="react" />
import * as React from "react";
import './TicketCategory.scss';
export declare class TicketCategory extends React.Component<{
    ticketType: (type: string) => void;
}, {
    isChecked: {
        agence: boolean;
        division: boolean;
        direction: boolean;
    };
}> {
    constructor(props: any);
    render(): JSX.Element;
}
