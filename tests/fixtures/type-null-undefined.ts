import React from "react";

export interface Props {
    nullable: string | null;
    optional?: string;
    optionalUnion: string | undefined;
    optionalNullable?: string | null;
    optionalNullableUnion: string | null | undefined;
    required: string;
    literalNullable: "string" | null;
    literalOptional?: "string";
    literalOptionalUnion: "string" | undefined;
    literalOptionalNullable?: "string" | null;
    literalOptionalNullableUnion: "string" | null | undefined;
    literalRequired: "string";
}

export default class NullUndefined extends React.Component<Props> {
    render() {
        return null;
    }
}

