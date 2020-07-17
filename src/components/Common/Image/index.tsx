import React, { Component } from 'react';
import {objectWithoutProperties} from '../../../utils/objectWithoutProperties';


interface ImageProps extends React.HTMLAttributes<HTMLOrSVGImageElement> {
    url?: string,
    assetName?: string,
}


export default class Image extends React.Component<ImageProps, {}> {
    public render(): JSX.Element {
        const rest = objectWithoutProperties(this.props, ["url", "assetName"]);
        let assetUrl = '';

        if(this.props.url === undefined){
            let localUrl = `./${this.props.assetName}`;
            assetUrl = require(localUrl);
        }else {
            assetUrl = this.props.url;
        }

        return (
            <img src={assetUrl} {...rest} />
        );
    }
}
