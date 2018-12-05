import React from "react";

interface MyType1 {
    foo: "foo1";
    bar: "bar";
}

interface MyType2 {
    foo: "foo2";
    baz: "baz";
}

type Props = MyType1 | MyType2;

export default class InterfaceUnion extends React.Component<Props> {
    render() {
        return null;
    }
}
