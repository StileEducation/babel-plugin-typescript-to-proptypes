import React from "react";

export interface Props {
    nullable: string | null;
    optional?: string;
    optionalNullable?: string | null;
    required: string;
    literalNullable: "string" | null;
    literalOptional?: "string";
    literalOptionalNullable?: "string" | null;
    literalRequired: "string";
}

export default class NullUndefined extends React.Component<Props> {
    render() {
        return null;
    }
}

