import React from "react";
import { MyType } from "./imported-type";

export interface Props {
    myType: MyType;
    myTypeUnion: string | MyType;
}

export default class ImportedType extends React.Component<Props> {
    render() {
        return null;
    }
}

