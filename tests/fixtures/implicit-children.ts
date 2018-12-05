import React from "react";

export interface Props {
    theme: "blue" | "green";
}

const MyComponent: React.SFC<Props> = function(props) {
    return props.children;
};
export default MyComponent;
